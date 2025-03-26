import http from "http";
import { WebSocketServer } from "ws";
import { handleConnection } from "./connectionManager";
import { getPort } from "../config";

export const initServer = (
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) => {
  const port = getPort();
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    handleConnection(ws);
  });

  console.log(`Websocket server started on port ${port}`);
};
