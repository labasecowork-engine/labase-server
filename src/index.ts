import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger";
import routes from "./routes";
import http from "http";
import { initSocket } from "./config/socket";
import { redisClient } from "./config/redis";
import { APP_URL, PORT } from "./config/env";
import { displayWelcomeMessage } from "./utils";
import { customMorganFormat } from "./utils/cli";
import { buildHttpResponse } from "./utils/";
import { HttpStatusCodes } from "./constants/http_status_codes";

const app = express();
const server = http.createServer(app);

// App URL fallback
const appUrl = `${APP_URL}` || `http://localhost:${PORT}`;

// Initialize sockets
initSocket(server);

// Middlewares
app.use(morgan(customMorganFormat));
// TODO: Improve CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use(routes);

// Test route
app.get("/ping", (_, res) => res.send("pong"));

// 404
app.use((req, res) => {
  return res
    .status(HttpStatusCodes.NOT_FOUND.code)
    .json(
      buildHttpResponse(
        HttpStatusCodes.NOT_FOUND.code,
        "Route not found",
        req.path
      )
    );
});

// Start server
const main = async () => {
  // Redis
  try {
    await redisClient.connect();
  } catch (e) {
    console.error("[Redis] No conectó:", e);
  }

  server.listen(PORT, () => {
    displayWelcomeMessage(appUrl);
    console.log(`[HTTP] Server on :${PORT}`);
  });
};

main();
