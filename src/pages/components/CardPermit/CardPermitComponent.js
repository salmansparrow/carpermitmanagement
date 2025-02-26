import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function CardPermitForm({ cardData, onSuccess }) {
  const [formData, setFormData] = useState({
    code: cardData?.code || "",
    name: cardData?.name || "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Change in Input Fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.code || !formData.name) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      if (cardData) {
        // Edit Existing Card
        await axios.put(`/api/Card/card?id=${cardData._id}`, formData);
        toast.success("Card Updated Successfully");
      } else {
        // Add New Card
        await axios.post("/api/Card/card", formData);
        toast.success("Card Added Successfully");
      }
      setFormData({ code: "", name: "" }); // Reset Form
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box sx={{ padding: 3, marginTop: 10 }}>
        <Typography variant="h2" textAlign={"center"}>
          Card Permit Types
        </Typography>

        {/* Form in Column Direction */}

        <Box
          component="form"
          onSubmit={handleSubmit}
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
          <TextField
            fullWidth
            label="Card Code"
            variant="outlined"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Card Name"
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
            }}
            disabled={loading}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CardPermitForm;
