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

  const authRequest = await gitlab.authorizationRequest({
    endpoint: "https://gitlab.com/oauth/authorize",
    clientId: process.env.NEXT_PUBLIC_GITLAB_CLIENT_ID as string,
    scope: "read_api read_user read_repository profile",
  });
  const { authorizationCode } = await gitlab.authorize(authRequest);
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

export async function route(route: string) {
  const tokenSet = await gitlab.getTokens();
  if (!tokenSet) {
    throw new Error("no token set");
  }

  const response = await fetch("/api/oauth/gitlab/update", {
    headers: {
      Authorization: `Bearer ${tokenSet.accessToken}`,
    },
    body: JSON.stringify({
      route,
      token: tokenSet.accessToken,
    }),
  });

  if (!response.ok) {
    console.error("route error:", await response.text());
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default gitlab;
