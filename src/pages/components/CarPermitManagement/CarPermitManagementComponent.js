import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { set } from "mongoose";

function CarPermitComponent() {
  const [events, setEvents] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [notes, setNotes] = useState("");
  const [rawImage, setRawImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    fetchEvents();
    fetchCards();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/event/CreateEvent");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await axios.get("/api/Card/card");
      setCards(Array.isArray(response.data.cards) ? response.data.cards : []);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setCards([]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setRawImage(event.target.result); // Save raw image
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        setCroppedImage(croppedCanvas.toDataURL("image/png"));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEvent || !selectedCard || !rawImage || !croppedImage) {
      alert("Please fill all required fields");
      return;
    }

    const formData = {
      event: selectedEvent,
      card: selectedCard,
      originalImage: rawImage,
      editedImage: croppedImage,
      notes: notes,
    };

    try {
      const response = await axios.post("/api/CarPermit/carpermit", formData);
      console.log("Car Permit Created:", response.data);
      alert("Car Permit Created Successfully!");

      // **Reset Form Fields**
      setSelectedEvent("");
      setSelectedCard("");
      setNotes("");
      setRawImage(null);
      setCroppedImage(null);
      if (cropperRef.current) {
        cropperRef.current.cropper.clear();
      }

      // **Manually Reset File Input**
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Error submitting Car Permit:", error);
      alert("Failed to create Car Permit!");
    }
  };

  return (
    <Box p={3} sx={{ mt: 10 }}>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Event</InputLabel>
          <Select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            {events.map((event) => (
              <MenuItem key={event._id} value={event._id}>
                {event.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Card</InputLabel>
          <Select
            value={selectedCard}
            onChange={(e) => setSelectedCard(e.target.value)}
          >
            {Array.isArray(cards) && cards.length > 0 ? (
              cards.map((card) => (
                <MenuItem key={card._id} value={card._id}>
                  {card.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Cards Available</MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Image Upload */}
        <input type="file" id="fileInput" onChange={handleImageUpload} />
        <Box sx={{ mt: 2, width: 500, height: 300 }}>
          {rawImage && (
            <Cropper
              src={rawImage}
              style={{ height: 300, width: "100%" }}
              initialAspectRatio={16 / 9}
              guides={true}
              ref={cropperRef}
            />
          )}
        </Box>

        {/* Crop & Highlight Buttons */}
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" color="secondary" onClick={handleCrop}>
            Crop
          </Button>
        </Box>

        {/* Show Cropped Image */}
        {croppedImage && (
          <Box mt={2}>
            <h3>Cropped Image:</h3>
            <img src={croppedImage} alt="Cropped" style={{ width: "300px" }} />
          </Box>
        )}

        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default CarPermitComponent;
