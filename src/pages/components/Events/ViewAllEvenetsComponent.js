import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EventsComponent from "./EventsComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewAllEventsComponent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewEvent, setViewEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/event/CreateEvent"); // Ensure this API endpoint is correct
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete Card
  const handleDelete = async (id) => {
    if (!window.confirm("are you sure you want to delete this card")) return;
    try {
      await axios.delete(`/api/event/CreateEvent?id=${id}`);
      toast.success("Card Deleted Successfully");
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting card");
    }
  };

  return (
    <>
      <Box sx={{ padding: 3, position: "relative", top: 50 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: 3,
          }}
        >
          All Events
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Code</strong>
                </TableCell>
                <TableCell>
                  <strong>Year</strong>
                </TableCell>
                <TableCell>
                  <strong>Start Date</strong>
                </TableCell>
                <TableCell>
                  <strong>End Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event, index) => (
                  <TableRow key={event._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.code}</TableCell>
                    <TableCell>
                      {event.dates?.[0]
                        ? new Date(event.dates[0]).toISOString().split("T")[0]
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {event.dates?.[1]
                        ? new Date(event.dates[1]).toISOString().split("T")[0]
                        : "N/A"}
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          console.log("Selected Event:", event); // Debugging
                          setViewEvent(event);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => setEditEvent(event)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Modal (Using CardPermitForm) */}
        {editEvent && (
          <Dialog
            open={true}
            onClose={() => setEditEvent(null)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent>
              <EventsComponent
                eventEditData={editEvent}
                onSuccess={() => {
                  setEditEvent(null);
                  fetchEvents();
                }}
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Event Detail Dialog */}
        {viewEvent && (
          <Dialog open={Boolean(viewEvent)} onClose={() => setViewEvent(null)}>
            <DialogTitle>Event Details</DialogTitle>
            <DialogContent>
              <Typography>
                <b>Event Name:</b> {viewEvent.name}
              </Typography>
              <Typography>
                <b>Event Code:</b> {viewEvent.code}
              </Typography>
              <Typography>
                <b>Start Date:</b>{" "}
                {viewEvent.dates?.[0]
                  ? new Date(viewEvent.dates[0]).toLocaleDateString()
                  : "N/A"}
              </Typography>
              <Typography>
                <b>End Date:</b>{" "}
                {viewEvent.dates?.[1]
                  ? new Date(viewEvent.dates[1]).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </DialogContent>
          </Dialog>
        )}
        <ToastContainer position="top-center" autoClose={3000} />
      </Box>
    </>
  );
}

export default ViewAllEventsComponent;
