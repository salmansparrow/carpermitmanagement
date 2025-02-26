import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventsComponent({ eventEditData, onSuccess }) {
  const [eventData, setEventData] = useState({
    _id: null, // For edit mode
    eventName: "",
    eventCode: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (eventEditData) {
      setEventData({
        _id: eventEditData._id || null,
        eventName: eventEditData.name || "",
        eventCode: eventEditData.code || "",
        startDate: eventEditData.dates?.[0]
          ? new Date(eventEditData.dates[0]).toISOString().split("T")[0]
          : "",
        endDate: eventEditData.dates?.[1]
          ? new Date(eventEditData.dates[1]).toISOString().split("T")[0]
          : "",
        notes: eventEditData.notes || "",
      });
    }
    console.log("onSuccess Function:", onSuccess);
  }, [eventEditData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setLoading(true);
      let response;
      if (eventData._id) {
        response = await axios.put(
          `/api/event/CreateEvent?id=${eventData._id}`,
          {
            name: eventData.eventName,
            code: eventData.eventCode,
            year: new Date(eventData.startDate).getFullYear(),
            dates: [eventData.startDate, eventData.endDate],
            notes: eventData.notes,
          }
        );
        console.log("Toast Function Call Ho Raha Hai");
        toast.success("Event Updated Successfully");
      } else {
        response = await axios.post("/api/event/CreateEvent", {
          name: eventData.eventName,
          code: eventData.eventCode,
          year: new Date(eventData.startDate).getFullYear(),
          dates: [eventData.startDate, eventData.endDate],
          notes: eventData.notes,
        });
        console.log("Toast Function Call Ho Raha Hai");
        toast.success("Event Added Successfully");
      }

      if (response.status === 200 || response.status === 201) {
        setEventData({
          _id: null,
          eventName: "",
          eventCode: "",
          startDate: "",
          endDate: "",
          notes: "",
        });

        onSuccess(); // ✅ Update hone ke baad refresh karein
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 🖊 **Function to Set Data for Editing**
  const handleEdit = (event) => {
    setEventData({
      _id: event._id,
      eventName: event.name,
      eventCode: event.code,
      startDate: new Date(event.dates[0]).toISOString().split("T")[0], // Converting Date to YYYY-MM-DD format
      endDate: new Date(event.dates[1]).toISOString().split("T")[0],
      notes: event.notes || "",
    });
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
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
        <ToastContainer position="top-center" autoClose={3000} />
      </Box>
    </>
  );
}

export default EventsComponent;
