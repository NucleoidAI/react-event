import { WebSocketServer } from "ws";

const clients = new Set();

export class EventServer {
  constructor({ port }) {
    this.wss = new WebSocketServer({ port });
    this.wss.on("connection", (ws) => {
      clients.add(ws);
      ws.on("message", (message) => {
        try {
          const { event, data } = JSON.parse(message);
          console.log("event", event);
          console.log("data", data);  
          this.broadcast(event, data, ws);
        } catch {}
      });
      ws.on("close", () => {
        clients.delete(ws);
      });
    });
  }
  broadcast(event, data, sender) {
    const msg = JSON.stringify({ event, data });
    this.wss.clients.forEach((client) => {
      if (client.readyState === 1 && client !== sender) {
        client.send(msg);
      }
    });
  }
}
