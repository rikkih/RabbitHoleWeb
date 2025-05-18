import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Container } from "@mui/material";
import { Client, over } from "stompjs";

const WebSocketPage: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [messages, setMessages] = useState<string[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      const token = await getAccessTokenSilently();

      // Use token in query param (since native WebSocket doesn't support custom headers in browsers)
      const ws = new WebSocket(`ws://localhost:8080/ws?token=${token}`);
      const stomp = over(ws);

      stomp.connect({}, () => {
        stomp.subscribe("/topic/greetings", (message) => {
          if (message.body) {
            setMessages((prev) => [...prev, message.body]);
          }
        });

        // Optionally send a message
        stomp.send("/app/hello", {}, "Hello from React client");
      });

      setStompClient(stomp);
    };

    connectWebSocket();

    return () => {
      stompClient?.disconnect(() => console.log("Disconnected"));
    };
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        WebSocket Page
      </Typography>
      <Typography variant="body1">
        Listening for messages on <code>/topic/greetings</code>...
      </Typography>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </Container>
  );
};

export default WebSocketPage;