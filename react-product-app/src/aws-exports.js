
export const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_iAPY05OPO',         // Replace with your actual user pool ID
      userPoolClientId: 'gfc31vaoa7p0bd66cj9a6dh0v', // Replace with your actual app client ID
     
      loginWith: {
        // This tells Amplify to use username or email as login field
        username: true,
        email: true,
      },
    },
  },
};

export default awsconfig;
