import path from "path";
import amplifyConnection from "./amplify.connection.js";
import AwsAmplifyApi from "./services/amplify.services.js";
import GreetApi from "./services/greek.services.js";
import imgServices from "./services/images.services.js";

// Init variables
const greetApi = new GreetApi();
const awsAmplifyApi = new AwsAmplifyApi();
const __dirname = path.resolve();

// Amplify connection to AWS Services
amplifyConnection();

awsAmplifyApi.signIn();

async function initGreetConfig() {
  await greetApi.signIn();
  await greetApi.getCardTypes();
}

await initGreetConfig();

const images = imgServices.getAllImagePaths(
  path.join(__dirname, "/public/media"),
  greetApi.card_types
);

function uploadImages() {
  awsAmplifyApi.uploadFile(images[0], greetApi.user);
}

uploadImages();
