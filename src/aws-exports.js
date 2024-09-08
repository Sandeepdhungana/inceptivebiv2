export const awsConfig = {
  Auth: {
    Cognito: {
      region: "us-east-1",
      userPoolId: "us-east-1_koFA1ckBa",
      userPoolClientId: "46a24s5i84rogfpop4ok6kcr8e",
      loginWith: {
        oauth: {
          domain: "test-poolsa.auth.us-east-1.amazoncognito.com",
          scopes: ["email", "openid", "profile"],
          redirectSignIn: ["https://inceptivebi.com/"],
          redirectSignOut: ["https://inceptivebi.com/"],
          responseType: "code",       
        },
      },
    },
  },
};
