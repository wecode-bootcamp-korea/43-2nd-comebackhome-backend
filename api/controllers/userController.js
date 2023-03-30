const { userService } = require("../services");
const { catchAsync } = require("../utils/error");

const loginSocial = catchAsync(async (req, res) => {
  const kakaoToken = req.headers.authorization;

  if (!kakaoToken) {
    const error = new Error("NEED_KAKAOTOKEN");
    error.statusCode = 401;

    throw error;
  }
  const { accessToken, nickname, profileImage } = await userService.loginSocial(
    kakaoToken
  );

  return res.status(200).json({ accessToken, nickname, profileImage });
});

module.exports = {
  loginSocial,
};
