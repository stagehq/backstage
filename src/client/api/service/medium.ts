import { OAuth } from "../connector";

const medium = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "Medium",
  providerIcon: "medium-logo.png",
  providerId: "medium",
  description: "Medium OAuth",
});

export const authorize = async () => {
  const tokenSet = await medium.getTokens();
  if (tokenSet?.accessToken) {
    if (tokenSet.refreshToken && tokenSet.isExpired()) {
      await medium.setTokens(await refreshTokens(tokenSet.refreshToken));
    }
    return;
  }

  const authRequest = await medium.authorizationRequest({
    endpoint: "https://medium.com/m/oauth/authorize",
    clientId: process.env.NEXT_PUBLIC_MEDIUM_CLIENT_ID as string,
    scope: "basicProfile,listPublications",
  });
  const { authorizationCode } = await medium.authorize(authRequest);
  await medium.setTokens(await fetchTokens(authRequest, authorizationCode));
};

async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string
): Promise<OAuth.TokenResponse> {
  const response = await fetch("/api/oauth/medium/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      codeVerifier: authRequest.codeVerifier,
      redirectURI: "https://getstage.app",
      authCode,
    }),
  });
  return await response.json();
}

async function refreshTokens(
  refreshToken: string
): Promise<OAuth.TokenResponse> {
  const response = await fetch("/api/oauth/medium/refresh_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: process.env.NEXT_PUBLIC_MEDIUM_CLIENT_ID,
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

export default medium;
