const { postDao } = require("../models");

const getHouseById = async (postsId) => {
    return await postDao.getHouseById(postsId);
}

module.exports = {
    getHouseById,
};