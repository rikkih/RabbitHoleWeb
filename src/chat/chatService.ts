import { Client, type IFrame, type IMessage } from "@stomp/stompjs";
import type { Message } from "./chat";

let client: Client | null = null;

export function createStompClient({
  token,
  onMessage,
  onError,
}: {
  token: string;
  onMessage: (body: Message) => void;
  onError?: (frame: IFrame) => void;
}) {
  client = new Client({
    brokerURL: `ws://localhost:8080/ws?token=${token}`,
    reconnectDelay: 5000,
    debug: (str) => console.log("STOMP debug:", str),
    onConnect: () => {
      client?.subscribe("/topic/chat", (msg: IMessage) => {
        try {
          const body = JSON.parse(msg.body);
          onMessage(body);
        } catch (err) {
          console.error("Failed to parse STOMP message", err);
        }
      });
    },
    onStompError:
      onError ||
      ((frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      }),
  });

  client.activate();
}

export function sendStompMessage(destination: string, body: Message) {
  if (client?.connected) {
    client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}

export function disconnectStompClient() {
  client?.deactivate();
}
