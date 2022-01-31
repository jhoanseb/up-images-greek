import { Auth, Storage } from "aws-amplify";
import fs from "fs";
import awsConfig from "../config/aws.config.js";
import { generateUUID } from "./images.services.js";

class AwsAmplifyApi {
  constructor() {
    this.user = null;
  }

  async signIn() {
    const { username, password } = awsConfig;
    try {
      const user = await Auth.signIn(username, password);
      return user;
    } catch (error) {
      console.log("error signing in", error);
      return null;
    }
  }
  async uploadFile(dataImage, user) {
    // const file = fs.readFileSync(dataImage.path);

    const filepath = `/public/cards_temp/${
      user.uuid
    }/background_image_${generateUUID()}.jpg`;

    try {
      const result = await Storage.put("/public/cards_temp/test.txt", "Hello");
      //  const result = Storage.put(filepath, file, { contentType: "image/jpeg" });

      return { filepath, ...result };
    } catch (err) {
      console.log(err);
    }
  }
}

export default AwsAmplifyApi;
