import {Box, Typography} from "@mui/material";

export function Footer() {

  return (
    <Box sx={{
      textAlign: "center",
      backgroundColor: "#293040",
      minHeight: "10em",
      width: "100%",
      position: "relative",
      bottom: 0,
      boxShadow:4,
    }}>
      <Typography sx={{
        color: "white"
      }}>
        Footer
      </Typography>
    </Box>
  );
}