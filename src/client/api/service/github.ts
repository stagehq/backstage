import { OAuth } from "../connector";

const github = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "GitHub",
  providerIcon: "https://github.githubassets.com/favicon.ico",
  providerId: "github",
  description: "GitHub OAuth",
});

export const authorize = async () => {
  const tokenSet = await github.getTokens();
  if (tokenSet?.accessToken) {
    if (tokenSet.refreshToken && tokenSet.isExpired()) {
      await github.setTokens(await refreshTokens(tokenSet.refreshToken));
    }
    return;
  }

  const authRequest = await github.authorizationRequest({
    endpoint: "https://github.com/login/oauth/authorize",
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
    scope: "read:user,repo",
  });
  const { authorizationCode } = await github.authorize(authRequest);
  await github.setTokens(await fetchTokens(authRequest, authorizationCode));
};

async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string
): Promise<OAuth.TokenResponse> {
  const response = await fetch("/api/github/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      codeVerifier: authRequest.codeVerifier,
      redirectURI: authRequest.redirectURI,
      authCode,
    }),
  });
  return await response.json();
}

async function refreshTokens(
  refreshToken: string
): Promise<OAuth.TokenResponse> {
  const response = await fetch("/api/github/refresh_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!response.ok) {
    console.error("refresh tokens error:", await response.text());
    throw new Error(response.statusText);
  }
  const tokenResponse = (await response.json()) as OAuth.TokenResponse;
  tokenResponse.refresh_token = tokenResponse.refresh_token ?? refreshToken;
  return tokenResponse;
}

export default github;
