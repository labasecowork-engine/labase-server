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
import { startWhatsAppBot } from "./modules/bot-whatsapp/application/bot/whatsapp.bot";
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
app.use(cors());
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

  // Whatsapp bot
  /* 
  try {
    await startWhatsAppBot();
    console.log(
      "[WhatsApp] Bot inicializado (si es primera vez, revisa el QR en logs)"
    );
  } catch (e) {
    console.error("[WhatsApp] No inició:", e);
  }
    */

  server.listen(PORT, () => {
    displayWelcomeMessage(appUrl);
    console.log(`[HTTP] Server on :${PORT}`);
    console.log(
      "[WhatsApp] Mirar los logs para ver el QR: pm2 logs labase-server"
    );
  });
};

main();
