import express from "express";
import cors from "cors";
import morgan from "morgan";
import healthRoutes from "./routes/health.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import artisansRoutes from "./routes/artisans.routes.js"; // <-- ajout

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

app.use("/api", healthRoutes);
app.use("/api", categoriesRoutes);
app.use("/api", artisansRoutes); // <-- ajout

export default app;
