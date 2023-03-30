const jwt = require("jsonwebtoken");
const axios = require("axios");

const { socialTypeEnum } = require("../utils/enum");
const { userDao } = require("../models");

const loginSocial = async (kakaoToken) => {
  const getKakaoToken = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${kakaoToken}` },
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  });

  const {
    id: kakaoId,
    properties: { thumbnail_image: profileImage, nickname: nickname },
    kakao_account: { email },
  } = getKakaoToken.data;

  const checkUserDuplicacy = await userDao.checkUserDuplicacy(kakaoId);
  const socialType = socialTypeEnum.KAKAO;
  const DEFAULT_POINT = 0;

  if (!checkUserDuplicacy) {
    await userDao.createUser(
      kakaoId,
      nickname,
      profileImage,
      email,
      DEFAULT_POINT,
      socialType
    );
  }
  const getCreatedUser = await userDao.getUserBySocialId(kakaoId);
  const user = await userDao.getUserById(getCreatedUser.id);
  const accessToken = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return {
    accessToken,
    nickname: user.nickname,
    profileImage: user.profileImage,
  };
};

module.exports = {
  loginSocial,
};
