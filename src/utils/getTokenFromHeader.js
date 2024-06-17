exports.getTokenFromHeader = (req) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return "No token, authorization denied";
  }
  return token;
};
