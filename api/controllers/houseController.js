const { houseService } = require("../services");
const { catchAsync } = require("../utils/error");

const getHouseById = catchAsync(async (req, res) => {
    const { postsId }= req.params;

    if (!postsId) {
        const error = new Error("KEY_ERROR");
            error.status = 400;

            throw error;
    }

    const data = await houseService.getHouseById(postsId);

    return res.status(200).json({ data });
})

module.exports = {
    getHouseById,
}