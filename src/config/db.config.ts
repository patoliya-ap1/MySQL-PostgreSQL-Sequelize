import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// postgresql database URL
const DATABASE_URL = process.env.DATABASE_URL as string;

// create sequelize instance
export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// connect to db function
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database Connected Successfully.");
  } catch (error) {
    console.log("Failed to Connect With Database.", error);
  }
}
