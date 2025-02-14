import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Slider,
} from "@mui/material";
import AvatarEditor from "react-avatar-editor";

function CarPermitManagementComponent({ events }) {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [image, setImage] = useState(null); // Original uploaded image (file object)
  const [scale, setScale] = useState(1); // Image scale
  const [rotate, setRotate] = useState(0); // Image rotation
  const [editedImage, setEditedImage] = useState(null); // Edited image (data URL)
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const editorRef = useRef(null); // Reference for the image editor

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB.");
        return;
      }
      setImage(file); // Set the uploaded image (file object)
    }
  };

  // Handle image editing (crop, scale, rotate)
  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const editedImageUrl = canvas.toDataURL("image/jpeg");
      setEditedImage(editedImageUrl); // Set the edited image
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedEvent || !editedImage) {
      setError("Please fill all required fields.");
      return;
    }
    console.log("Selected Event:", selectedEvent);
    console.log("Edited Image:", editedImage); // Log edited image
    console.log("Notes:", notes);
    // Add your submission logic here
  };

  // Reset image editor
  const resetEditor = () => {
    setImage(null);
    setEditedImage(null);
    setScale(1);
    setRotate(0);
  };

  // Close error alert
  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          padding: 5,
        }}
      >
        Car Permit Management
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        {/* Select Event Dropdown */}
        <FormControl fullWidth>
          <InputLabel id="event-select-label">Select Event</InputLabel>
          <Select
            labelId="event-select-label"
            value={selectedEvent}
            label="Select Event"
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            {events.map((event) => (
              <MenuItem key={event.eventCode} value={event.eventCode}>
                {event.eventName} ({event.eventStartDate} to{" "}
                {event.eventEndDate})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Upload Image */}
        <Box>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-image"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-image">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {loading && <CircularProgress sx={{ mt: 2 }} />}
          {image && (
            <Box sx={{ mt: 2 }}>
              {/* Image Editor */}
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={400}
                height={300}
                border={50}
                borderRadius={0}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={scale}
                rotate={rotate}
              />
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">Scale:</Typography>
                <Slider
                  value={scale}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e, newValue) => setScale(newValue)}
                />
                <Typography variant="body1">Rotate:</Typography>
                <Slider
                  value={rotate}
                  min={0}
                  max={360}
                  step={1}
                  onChange={(e, newValue) => setRotate(newValue)}
                />
              </Box>
              <Button
                variant="contained"
                sx={{ mt: 2, mr: 2 }}
                onClick={handleSave}
                disabled={loading}
              >
                Save Edited Image
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={resetEditor}
                disabled={loading}
              >
                Reset Editor
              </Button>

              {/* Edited Image Preview */}
              {editedImage && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">Edited Image Preview:</Typography>
                  <img
                    src={editedImage}
                    alt="Edited Preview"
                    style={{ maxWidth: "100%", marginTop: 10 }}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* Notes */}
        <TextField
          fullWidth
          label="Notes"
          variant="outlined"
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit
        </Button>
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CarPermitManagementComponent;
