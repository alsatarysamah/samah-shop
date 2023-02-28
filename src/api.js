import axios from "axios";
import { toast } from "react-toastify";
import base64 from "base-64";

export const api = async (url, method, token, body, username, password) => {
  try {
    let authorization = "";

    authorization = `"Bearer " + ${token}`;

    const options = {
      url: url,
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: authorization,
      },

      data: body,
    };

    const response = await axios(options);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
