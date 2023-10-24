const getGoogleOAuthURL = () => {
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL as string,
    client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const queryString = new URLSearchParams(options);
  return `${baseUrl}?${queryString.toString()}`;
};

export default getGoogleOAuthURL;
