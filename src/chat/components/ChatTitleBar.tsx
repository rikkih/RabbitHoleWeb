import { Box, Typography } from "@mui/material";

export function ChatTitleBar({ title }: { title: string }) {
  return (
    <Box
      sx={{
        bgcolor: "rgba(27, 27, 27, 0.7)",
        color: "primary.contrastText",
        p: 2,
        flexShrink: 0,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" noWrap>
        {title}
      </Typography>
    </Box>
  );
}
