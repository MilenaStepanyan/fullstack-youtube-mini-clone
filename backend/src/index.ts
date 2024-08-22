import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userAuth from "./route/authRouter";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.json());
app.use("/api/user", userAuth);
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

const PORT = 3010 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
