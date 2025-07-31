import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
