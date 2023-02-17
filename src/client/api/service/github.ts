import wretch from "wretch";
import { OAuth } from "../connector";

const github = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "GitHub",
  providerIcon: "github-logo.png",
  providerId: "github",
  description: "GitHub OAuth",
});

export const authorize = async () => {
  const tokenSet = await github.getTokens();
  console.log(tokenSet?.isExpired());
  if (tokenSet?.accessToken) {
    if (tokenSet.refreshToken && tokenSet.isExpired()) {
      await github.setTokens(await refreshTokens(tokenSet.refreshToken));
    }
    return;
  }

  const request: OAuth.AuthorizationRequestOptions = {
    endpoint: "https://github.com/login/oauth/authorize",
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
    scope: "read:user,repo",
  };
  const authRequest = await github.authorizationRequest(request);
  const { authorizationCode } = await github.authorize(
    request,
    authRequest.codeVerifier
  );
  await github.setTokens(await fetchTokens(authRequest, authorizationCode));
};

async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string
): Promise<OAuth.TokenResponse> {
  const response = await wretch("/api/oauth/github/access_token")
    .post({
      codeVerifier: authRequest.codeVerifier,
      redirectURI: authRequest.redirectURI,
      authCode,
    })
    .json();
  return (await response) as OAuth.TokenResponse;
}

async function refreshTokens(
  refreshToken: string
): Promise<OAuth.TokenResponse> {
  const response = await wretch("/api/oauth/github/refresh_token")
    .post({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      refreshToken: refreshToken,
      grantType: "refresh_token",
    })
    .json((json) => {
      return json;
    });
  if (!response.ok) {
    console.error("refresh tokens error:", await response.text());
    throw new Error(response.statusText);
  }
  const tokenResponse = (await response.json()) as OAuth.TokenResponse;
  tokenResponse.refresh_token = tokenResponse.refresh_token ?? refreshToken;
  return tokenResponse;
}

export function getTokens() {
  return github.getTokens();
}

export default github;
