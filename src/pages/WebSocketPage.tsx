import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Client, type IMessage } from "@stomp/stompjs";
import { Box, Button, TextField, Typography, List, ListItem } from "@mui/material";

// Create and type the client
let stompClient: Client | null = null;

function WebSocketPage() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  useEffect(() => {
    const connectWebSocket = async () => {
      const token = await getAccessTokenSilently();

      stompClient = new Client({
        brokerURL: `ws://localhost:8080/ws?token=${token}`,
        reconnectDelay: 5000,
        debug: (str) => {
          console.log("STOMP debug:", str);
        },
        onConnect: () => {
          stompClient?.subscribe("/topic/chat", (msg: IMessage) => {
            const body = JSON.parse(msg.body);
            setChatMessages((prev) => [...prev, `${body.from}: ${body.text}`]);
          });
        },
        onStompError: (frame) => {
          console.error("Broker error:", frame.headers["message"]);
        },
      });

      stompClient.activate();
    };

    connectWebSocket();

    return () => {
      stompClient?.deactivate();
    };
  }, [getAccessTokenSilently]);

  const sendMessage = () => {
    if (stompClient?.connected && message.trim() !== "") {
      const chatMsg = {
        from: user?.name || "Anonymous",
        text: message,
      };
      stompClient.publish({
        destination: "/api/chat",
        body: JSON.stringify(chatMsg),
      });
      setMessage("");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Chat Room
      </Typography>

      <List sx={{ maxHeight: 300, overflow: "auto", mb: 2 }}>
        {chatMessages.map((msg, idx) => (
          <ListItem key={idx}>{msg}</ListItem>
        ))}
      </List>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default WebSocketPage;
