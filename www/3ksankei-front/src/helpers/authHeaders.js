import Cookies from "js-cookie";

  
export const authHeaders = () => ({
  Authorization: `Bearer ${Cookies.get("access_token")}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});