import { OAuth } from "../connector";

const gitlab = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "GitLab",
  providerIcon: "gitlab-logo.png",
  providerId: "gitlab",
  description: "GitLab OAuth",
});

export const authorize = async () => {
  const tokenSet = await gitlab.getTokens();
  if (tokenSet?.accessToken) {
    if (tokenSet.refreshToken && tokenSet.isExpired()) {
      await gitlab.setTokens(await refreshTokens(tokenSet.refreshToken));
    }
    return;
  }

  const options: OAuth.AuthorizationRequestOptions = {
    endpoint: "https://gitlab.com/oauth/authorize",
    clientId: process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID as string,
    scope: "read_api read_user read_repository profile",
  };
  const authRequest = await gitlab.authorizationRequest(options);
  const { authorizationCode } = await gitlab.authorize(
    options,
    authRequest.codeVerifier
  );
  await gitlab.setTokens(await fetchTokens(authRequest, authorizationCode));
};

async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string
): Promise<OAuth.TokenResponse> {
  const response = await fetch("/api/oauth/gitlab/access_token", {
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
  const response = await fetch("/api/oauth/gitlab/refresh_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID,
      refreshToken: refreshToken,
      grantType: "refresh_token",
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

export function getTokens() {
  return gitlab.getTokens();
}

export default gitlab;
