const searchController = require("../../controller/user/searchController");

const router = require("express").Router();

router.get("/search", searchController.search);

module.exports = router;
