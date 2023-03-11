import { OAuth } from "../connector";

const stackoverflow = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "Stackoverflow",
  providerIcon: "gitlab-logo.png", // TODO: Add icon
  providerId: "stackoverflow",
  description: "Stackoverflow OAuth",
});

export const authorize = async () => {
  const tokenSet = await stackoverflow.getTokens();
  // if (tokenSet?.accessToken) {
  //   if (tokenSet.refreshToken && tokenSet.isExpired()) {
  //     await stackoverflow.setTokens(await refreshTokens(tokenSet.refreshToken));
  //   }
  //   return;
  // }

  const options: OAuth.AuthorizationRequestOptions = {
    endpoint: "https://stackoverflow.com/oauth/dialog",
    clientId: process.env.NEXT_PUBLIC_STACKOVERFLOW_CLIENT_ID as string,
    scope: "no_expiry private_info",
  };
  const authRequest = await stackoverflow.authorizationRequest(options);
  const { authorizationCode } = await stackoverflow.authorize(
    options,
    authRequest.codeVerifier
  );
  await stackoverflow.setTokens(
    await fetchTokens(authRequest, authorizationCode)
  );
};

async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string
): Promise<OAuth.TokenResponse> {
  // console.log("moin");
  const response = await fetch("/api/oauth/stackoverflow/access_token/json", {
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
  const response = await fetch("/api/oauth/stackoverflow/refresh_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: process.env.NEXT_PUBLIC_STACKOVERFLOW_CLIENT_ID,
      refreshToken: refreshToken,
      grantType: "refresh_token",
    }),
  });
  if (!response.ok) {
    // console.error("refresh tokens error:", await response.text());
    throw new Error(response.statusText);
  }
  const tokenResponse = (await response.json()) as OAuth.TokenResponse;
  tokenResponse.refresh_token = tokenResponse.refresh_token ?? refreshToken;
  return tokenResponse;
}

export function getTokens() {
  return stackoverflow.getTokens();
}

export default stackoverflow;
