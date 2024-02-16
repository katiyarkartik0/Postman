const History = require("../models/history");

const getHistory = async (req, res) => {
    try {
        const history = await History.find()
        return res.status(200).json({ history });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "some error" });
    }
}

module.exports = { getHistory }