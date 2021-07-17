import { CognitoUserPool as CognitoPool } from "amazon-cognito-identity-js";

const UserPool = new CognitoPool({
  UserPoolId: "us-east-1_X43BKHLC9",
  ClientId: "36hd2394u2lu7892qss27fb9r",
});

export default UserPool;
