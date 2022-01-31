import axios from "axios";
import fs from "fs";

const URL = "https://api.dev.greetbox.io";
const PATH_SIGNIN = "/v1/authentication/signin";
const PATH_ART = "/v1/card-management/arts";
const PATH_GET_CARDTYPES =
  "/v1/card-type-management/card-types/?limit=10&offset=0&arts=df";

const DATA_USER = {
  email: "esteban@onlinecmail.com",
  password: "Test-1234",
  device_id: "midevice1",
  device_os: "IOS",
};

const DATA_ART = {
  featured: true,
  card: {
    author: "c4e5e5c6-d73c-4b76-bdbb-2d9c460f5f4f",
    card_background_color: false,
    card_background_image: {
      path: "public/cards_temp/cb36a2eb-6739-48a2-8a8c-b347f9db6d3c/background_image_06avaspc8c3akl10b3wn.jpg?greetboxVersionId=8uqsfi1ftx7kl10b5ff",
    },
    card_audio: false,
    original_screenshot:
      "public/cards_temp/cb36a2eb-6739-48a2-8a8c-b347f9db6d3c/background_image_06avaspc8c3akl10b3wn.jpg?greetboxVersionId=8uqsfi1ftx7kl10b5ff",
    card_images: [],
    card_texts: [],
    card_types: [
      "9099a176-3167-49ab-872c-1699ac9a4869",
      "8569a176-3167-49ab-872c-1699ac9a4869",
    ],
  },
};

class GreetApi {
  constructor() {
    this.url = URL;
    this.jwt = null;
    this.refresh_token = null;
    this.user = null;
    this.card_types = [];
  }

  setAuthorizationData(payload) {
    this.jwt = payload.jwt;
    this.refresh_token = payload.refresh_token;
    this.user = payload.user;
  }

  getToken() {
    return `Bearer ${this.jwt}`;
  }

  async signIn() {
    try {
      const response = await axios.post(this.url + PATH_SIGNIN, DATA_USER);

      this.setAuthorizationData(response.data);

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async getCardTypes() {
    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };

    try {
      const response = await axios.get(this.url + PATH_GET_CARDTYPES, config);

      this.card_types = response.data.card_types;

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async uploadArt(filepath, cardType) {
    const config = {
      headers: {
        Authorization: this.getToken(),
      },
    };

    const data = {
      featured: true,
      card: {
        author: this.user.uuid,
        card_background_color: false,
        card_background_image: {
          path: filepath,
        },
        card_audio: false,
        original_screenshot: filepath,
        card_images: [],
        card_texts: [],
        card_types: [cardType],
      },
    };

    try {
      const response = await axios.post(this.url + PATH_ART, data, config);
    } catch (err) {
      console.log(err);
    }
  }
}

export default GreetApi;
