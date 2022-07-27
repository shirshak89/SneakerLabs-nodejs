const CustomError = require("../errors");
const { verifyJWT } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userId, role } = verifyJWT(token);
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthroized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
