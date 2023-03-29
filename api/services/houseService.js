const { houseDao } = require("../models");

const getHouseById = async (postsId) => {
    return await houseDao.getHouseById(postsId);
}

module.exports = {
    getHouseById,
};