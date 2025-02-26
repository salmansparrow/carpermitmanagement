import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function CarPermitList() {
  const [carPermits, setCarPermits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCarPermits();
  }, []);

  const fetchCarPermits = async () => {
    try {
      const response = await axios.get("/api/CarPermit/carpermit");
      setCarPermits(response.data);
    } catch (error) {
      console.error("Error fetching car permits:", error);
      setError("Failed to load car permits.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" color="error.main" mt={3}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} mt={10}>
      <Typography variant="h4" mb={2}>
        Car Permit List
      </Typography>
      {carPermits.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No Data Found
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Event</b>
                </TableCell>
                <TableCell>
                  <b>Card</b>
                </TableCell>
                <TableCell>
                  <b>Original Image</b>
                </TableCell>
                <TableCell>
                  <b>Cropped Image</b>
                </TableCell>
                <TableCell>
                  <b>Notes</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carPermits.map((permit) => (
                <TableRow key={permit._id}>
                  <TableCell>{permit.event?.name || "N/A"}</TableCell>
                  <TableCell>{permit.card?.name || "N/A"}</TableCell>
                  <TableCell>
                    {permit.originalImage ? (
                      <img
                        src={permit.originalImage}
                        alt="Original"
                        width="100"
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell>
                    {permit.editedImage ? (
                      <img src={permit.editedImage} alt="Cropped" width="100" />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell>{permit.notes || "No Notes"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default CarPermitList;
