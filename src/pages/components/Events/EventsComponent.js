import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function EventsComponent() {
  const [eventData, setEventData] = useState({
    eventName: "",
    eventCode: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check Required Fields
    if (
      !eventData.eventName ||
      !eventData.eventCode ||
      !eventData.startDate ||
      !eventData.endDate
    ) {
      alert("Fill All The Required Fields");
      return;
    }
    try {
      const response = await axios.post("/api/event/CreateEvent", {
        name: eventData.eventName,
        code: eventData.eventCode,
        year: new Date(eventData.startDate).getFullYear(),
        dates: [eventData.startDate, eventData.endDate],
        notes: eventData.notes,
      });

      if (response.status === 201) {
        alert("Event Created Successfully");
        setEventData({
          eventName: "",
          eventCode: "",
          startDate: "",
          endDate: "",
          notes: "",
        });
      }
    } catch (error) {
      console.error(
        "Error Creating Event",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to create event!");
    }
  };

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
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3, // Adds spacing between fields
            maxWidth: 600, // Optional: Limit the width of the form
            margin: "0 auto", // Center the form horizontally
          }}
          onSubmit={handleSubmit}
        >
          {/* Event Name */}
          <TextField
            fullWidth
            label="Event Name"
            name="eventName"
            variant="outlined"
            value={eventData.eventName}
            onChange={handleChange}
          />

          {/* Event Code */}
          <TextField
            fullWidth
            label="Event Code"
            name="eventCode"
            variant="outlined"
            value={eventData.eventCode}
            onChange={handleChange}
          />

          {/* Start Date */}
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            name="startDate"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={eventData.startDate}
            onChange={handleChange}
          />

          {/* End Date */}
          <TextField
            fullWidth
            label="End Date"
            type="date"
            name="endDate"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={eventData.endDate}
            onChange={handleChange}
          />

          {/* Notes */}
          <TextField
            fullWidth
            label="Notes"
            name="notes"
            variant="outlined"
            multiline
            rows={4}
            value={eventData.notes}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default EventsComponent;
