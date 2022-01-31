import dotenv from "dotenv";

dotenv.config();

export default {
  username: "esteban@onlinecmail.com",
  password: "Test-1234",
  REGION: process.env.AWS_REGION,
  HOST: process.env.BUCKET_HOST,
  POOL_ID: process.env.AWS_POOL_ID,
  IDENTITY_POOL_ID: process.env.AWS_IDENTITY_POOL_ID,
  USER_POOL_WEBCLIENT_ID: process.env.AWS_USER_POOL_WEBCLIENT_ID,
};
