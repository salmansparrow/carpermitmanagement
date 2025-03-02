import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import * as markerjs2 from "markerjs2";

function CarPermitComponent() {
  const [events, setEvents] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [notes, setNotes] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const imgRef = useRef(null);

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
      setImageURL(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const openMarkerEditor = () => {
    if (!imgRef.current) return;

    const markerArea = new markerjs2.MarkerArea(imgRef.current);
    markerArea.addEventListener("render", (event) => {
      imgRef.current.src = event.dataUrl;
    });
    markerArea.show();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEvent || !selectedCard || !imageURL) {
      alert("Please fill all required fields");
      return;
    }

    const formData = {
      event: selectedEvent,
      card: selectedCard,
      editedImage: imgRef.current.src, // Edited image with highlights
      notes: notes,
    };

    try {
      const response = await axios.post("/api/CarPermit/carpermit", formData);
      console.log("Car Permit Created:", response.data);
      alert("Car Permit Created Successfully!");

      // Reset form
      setSelectedEvent("");
      setSelectedCard("");
      setNotes("");
      setImageURL(null);
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

        {/* Image Display with Marker.js */}
        {imageURL && (
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <img
              ref={imgRef}
              src={imageURL}
              alt="Uploaded"
              width={500}
              height={300}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={openMarkerEditor}
              sx={{ mt: 2 }}
            >
              Edit / Highlight Image
            </Button>
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
