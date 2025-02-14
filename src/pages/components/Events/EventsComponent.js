import { Box, TextField, Button, Typography } from "@mui/material";

function EventsComponent() {
  return (
    <>
      <Box sx={{ padding: 3, marginTop: 10 }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
          }}
        >
          Events
        </Typography>

        {/* Form in Column Direction */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3, // Adds spacing between fields
            maxWidth: 600, // Optional: Limit the width of the form
            margin: "0 auto", // Center the form horizontally
          }}
        >
          {/* Event Name */}
          <TextField fullWidth label="Event Name" variant="outlined" />

          {/* Event Code */}
          <TextField fullWidth label="Event Code" variant="outlined" />

          {/* Start Date */}
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />

          {/* End Date */}
          <TextField
            fullWidth
            label="End Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />

          {/* Notes */}
          <TextField
            fullWidth
            label="Notes"
            variant="outlined"
            multiline
            rows={4}
          />

          {/* Submit Button */}
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default EventsComponent;
