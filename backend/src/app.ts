import express from "express";
import cors from "cors";
import path from "path";
import healthRoutes from "./routes/health.routes";
import dbRoutes from "./routes/db.routes";
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";
import serviceRoutes from "./routes/service.routes";
import leadRoutes from "./routes/lead.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import uploadRoutes from "./routes/upload.routes";
import { errorHandler, notFound } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", healthRoutes);
app.use("/api", dbRoutes);
app.use("/api", authRoutes);
app.use("/api", blogRoutes);
app.use("/api", serviceRoutes);
app.use("/api", leadRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", uploadRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;