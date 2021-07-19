import UserPool from "./UserPool";

// Reference: https://github.com/DevAscend/YT-AWS-Cognito-React-Tutorials/blob/master/3-Sessions-Logging-Out/src/components/Account.js
export const getSessionData = async () => {
  return await new Promise((resolve, reject) => {
    const authUser = UserPool.getCurrentUser();
    authUser
      ? authUser.getSession((e, sesData) => {
          if (e) {
            reject();
          } else {
            resolve(sesData);
          }
        })
      : reject();
  });
};

export const MFA_KEY = "mfa";
export const EMAIL_KEY = "email";
export const PROFILE_KEY = "profile";
export const RESTRAUNT_PROFILE = "restraunt";
export const USER_PROFILE = "user";
export const ID_TOKEN = "idtoken";
