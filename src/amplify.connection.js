import { Amplify } from "aws-amplify";
import Config from "./config/index.js";

const config = {
  Storage: {
    AWSS3: {
      region: Config.aws.REGION,
      bucket: Config.aws.HOST,
      identityPoolId: Config.aws.IDENTITY_POOL_ID,
    },
  },
  Auth: {
    identityPoolId: Config.aws.IDENTITY_POOL_ID,
    region: Config.aws.REGION,
    userPoolWebClientId: Config.aws.USER_POOL_WEBCLIENT_ID,
    userPoolId: Config.aws.POOL_ID,
  },
};

export default () => {
  Amplify.configure(config);
};
