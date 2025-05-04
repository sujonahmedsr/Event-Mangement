import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
    dotenv: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
}