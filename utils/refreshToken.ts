import axios from "axios";
import { urls } from "./endpoint";
import Cookies from "js-cookie";

const refreshTokens = async () => {
  const refresh = Cookies.get("refreshToken");
  try {
    const response = await axios.post(urls.refreshToken, { refresh });
    if (response.status === 201) {
      Cookies.set("authToken", response.data.access, {
        sameSite: "None",
        secure: true,
      });
      Cookies.set("refreshToken", response.data.refresh, {
        sameSite: "None",
        secure: true,
      });
      return true;
    }
  } catch {
    return false;
  }
  return false;
};

export default refreshTokens;