import axios from "axios";

const base_url = "https://pn-household-jamie-accepts.trycloudflare.com";

export function getUserId() {
  try {
    return axios.get(`${base_url}/api/v1/user`);
  } catch (error) {
    console.log(error);
  }
}
