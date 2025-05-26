import { Client, type IFrame, type IMessage } from "@stomp/stompjs";
import type { MessageDto } from "./types/MessageDto";

let client: Client | null = null;

export function createStompClient({
  token,
  destination,
  onMessage,
  onError,
}: {
  token: Promise<string | undefined>;
  destination: string;
  onMessage: (body: MessageDto) => void;
  onError?: (frame: IFrame) => void;
}) {
  client = new Client({
    brokerURL: `ws://localhost:8080/ws?token=${token}`,
    reconnectDelay: 5000,
    debug: (str) => console.log("STOMP debug:", str),
    onConnect: () => {
      client?.subscribe(destination, (msg: IMessage) => {
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

export function sendStompMessage(destination: string, body: MessageDto) {
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
