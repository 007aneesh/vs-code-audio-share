import axios from "axios";

const base_url = "http://localhost:4000";

export function getUserId() {
  try {
    return axios.get(`${base_url}/api/v1/user`);
  } catch (error) {
    console.log(error);
  }
}
