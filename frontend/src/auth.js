import Cookies from "js-cookie";
const jwt = require("jsonwebtoken");

export const isAuthenticated = () => {
  const token = Cookies.get("token");

  const authenticated = jwt.verify(token, "secret", function(err, decoded) {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
  return authenticated;
};
