import dotenv from "dotenv";
import path from "path";
import { cwd } from "process";

dotenv.config({ path: path.join(cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASS,
};
