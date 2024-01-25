import {Box, Typography} from "@mui/material";

export function Footer() {

  return (
    <Box sx={{
      gridArea:"footer",
      textAlign: "center",
      backgroundColor: "#293040",
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