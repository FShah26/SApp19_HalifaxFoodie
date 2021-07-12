import { CognitoUserPool as CognitoPool } from "amazon-cognito-identity-js";

const UserPool = new CognitoPool({
    UserPoolId: "us-east-1_vW20AFfxl",
    ClientId: "5tdbc8hn7tph3514j5oa28qsob"
});

export default UserPool;