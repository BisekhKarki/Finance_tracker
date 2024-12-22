const express = require("express");
const { addTransaction, deleteTransaction } = require("../Controller/Finance");
const router = express.Router();

router.post("/add", addTransaction);
router.delete("/delete/:id", deleteTransaction);

module.exports = router;
