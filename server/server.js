const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const connection = require("./db/Connection");
const userRoute = require("./routes/UserRoute");
const financeRoute = require("./routes/FinanceRoute");

const errorHandlerMiddleware = require("./Middleware/ErrorHandler");
const notFoundMiddleWare = require("./Middleware/NotFoundMiddleWare");

app.use(express.json());
app.use(cors());

// Routers
app.use("/api/user", userRoute);
app.use("/api/finance", financeRoute);

// Middleware
// app.use(errorHandlerMiddleware);
// app.use(notFoundMiddleWare);

// Database connection
connection();

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
