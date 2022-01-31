import { S3Client } from "@aws-sdk/client-s3";
import Config from "./config/index.js";

const config = {
  region: Config.aws.REGION,
};

const s3client = new S3Client(config);
