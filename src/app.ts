import express from "express";
import { connectDB, sequelize } from "./config/db.config";
import dotenv from "dotenv";
import { mainRouter } from "./routes/index-route";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

// welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to MySQL + PostgreSQL + Sequelize Training Program",
  });
});

// main router
app.use(mainRouter);

// start server initialize
async function startServer() {
  try {
    await connectDB();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  } catch (error) {
    console.log("failed to start server");
  }
}

// start server run
startServer();
