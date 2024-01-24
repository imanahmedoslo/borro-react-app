import {Box, Typography} from "@mui/material";

export function Footer() {

  return (
    <Box sx={{
      textAlign: "center",
      backgroundColor: "#293040",
      minHeight: "10em",
      boxShadow:4,
      gridArea:"footer"
    }}>
      <Typography sx={{
        color: "white"
      }}>
        Footer
      </Typography>
    </Box>
  );
}