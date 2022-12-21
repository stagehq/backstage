import { OAuth } from "../connector";

const spotify = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "Spotify",
  providerIcon: "spotify-logo.png",
  providerId: "spotify",
  description: "Spotify OAuth",
});

export const authorize = async () => {
  const tokenSet = await spotify.getTokens();
  if (tokenSet?.accessToken) {
    console.log(tokenSet.isExpired());

    if (tokenSet.refreshToken && tokenSet.isExpired()) {
      await spotify.setTokens(await refreshTokens(tokenSet.refreshToken));
    }
    return;
  }

  const authRequest = await spotify.authorizationRequest({
    endpoint: "https://accounts.spotify.com/authorize",
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
    scope:
      "user-read-currently-playing user-top-read user-read-recently-played",
  });
  const { authorizationCode } = await spotify.authorize(authRequest);
  await spotify.setTokens(await fetchTokens(authRequest, authorizationCode));
};

async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string
): Promise<OAuth.TokenResponse> {
  const response = await fetch("/api/oauth/spotify/access_token", {
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
  const response = await fetch("/api/oauth/spotify/refresh_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
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
  const tokenSet = await spotify.getTokens();
  if (!tokenSet) {
    throw new Error("no token set");
  }

  const response = await fetch("/api/oauth/spotify/update", {
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

export default spotify;
