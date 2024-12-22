const finance = require("../Models/FinanceModel");

const addTransaction = async (req, res) => {
  try {
    const { type, Amount, Category, Description, Date } = req.body;
    if (!type || !Amount || !Category || !Description || !Date) {
      return res.status(404).json({
        success: false,
        message: "Fulfill every credentials",
      });
    }

    const newTransaction = new finance({
      type,
      Amount,
      Category,
      Description,
      Date,
    });

    newTransaction.save();
    return res.status(200).json({
      success: true,
      message: "Transaction added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const getTransaction = await finance.findByIdAndDelete(id);
    if (!getTransaction) {
      return res.status(501).json({
        success: false,
        message: "Unable to delete the transaction",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  addTransaction,
  deleteTransaction,
};
