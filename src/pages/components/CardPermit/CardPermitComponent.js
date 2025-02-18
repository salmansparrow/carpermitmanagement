import { Box, Button, TextField, Typography } from "@mui/material";

function CardPermitComponent() {
  return (
    <>
      <Box sx={{ padding: 3, marginTop: 10 }}>
        <Typography variant="h2" textAlign={"center"}>
          Card Permit Types
        </Typography>

        {/* Form in Column Direction */}
          
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3, // Adds spacing between fields
            maxWidth: 600, // Optional: Limit the width of the form
            margin: "0 auto", // Center the form horizontally
            top: 50,
            position: "relative",
          }}
        >
          <TextField fullWidth label="Card Code" variant="outlined" />
          <TextField fullWidth label="Card Name" variant="outlined" />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CardPermitComponent;
