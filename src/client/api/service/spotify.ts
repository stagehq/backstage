import wretch from "wretch";
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
    if (tokenSet.refreshToken && tokenSet.isExpired()) {
      await spotify.setTokens(await refreshTokens(tokenSet.refreshToken));
    }
    return;
  }

  const request: OAuth.AuthorizationRequestOptions = {
    endpoint: "https://accounts.spotify.com/authorize",
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
    scope:
      "user-top-read user-read-recently-played user-read-currently-playing",
  };
  const authRequest = await spotify.authorizationRequest(request);
  const { authorizationCode } = await spotify.authorize(
    request,
    authRequest.codeVerifier
  );
  await spotify.setTokens(await fetchTokens(authRequest, authorizationCode));
};

async function fetchTokens(
  authRequest: OAuth.AuthorizationRequest,
  authCode: string
): Promise<OAuth.TokenResponse> {
  const response = await wretch("/api/oauth/spotify/access_token")
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
  const response = await wretch("/api/oauth/spotify/refresh_token")
    .post({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
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
  return spotify.getTokens();
}

export async function route(route: string) {
  const tokenSet = await spotify.getTokens();
  if (!tokenSet) {
    throw new Error("no token set");
  }
  const response = await wretch("/api/oauth/spotify/update")
    .headers({ Authorization: `Bearer ${tokenSet.accessToken}` })
    .post({
      route,
      token: tokenSet.accessToken,
    })
    .json((json) => {
      return json;
    });
  if (!response.ok) {
    console.error("route error:", await response.text());
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default spotify;
