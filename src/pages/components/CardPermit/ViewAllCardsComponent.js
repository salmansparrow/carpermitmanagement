import axios from "axios";
import { toast } from "react-toastify";
import CardPermitForm from "./CardPermitComponent";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
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
import { useEffect, useState } from "react";

function ViewAllCardsComponent() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [viewCard, setViewCard] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Cards from API

  const fetchCards = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/Card/card?page=${page}&limit=${limit}`
      );
      setCards(response.data.cards);
      setTotalPages(response.data.totalPages); // Update total pages
    } catch (error) {
      toast.error("Failed to fetch card");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards(page);
  }, [page]);

  // Delete Card
  const handleDelete = async (id) => {
    if (!window.confirm("are you sure you want to delete this card")) return;

    try {
      await axios.delete(`/api/Card/card?id=${id}`);
      toast.success("Card Deleted Successfully");
      fetchCards();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting card");
    }
  };

  return (
    <>
      <Box sx={{ padding: 3, position: "relative", top: 50 }}>
        <Typography variant="h4" textAlign="center">
          All Card Permit Types
        </Typography>

        {/* Table */}

        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>#</b>
                </TableCell>
                <TableCell>
                  <b>Card Code</b>
                </TableCell>
                <TableCell>
                  <b>Card Name</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                cards.map((card, index) => (
                  <TableRow key={card._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{card.code}</TableCell>
                    <TableCell>{card.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => setViewCard(card)}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => setEditCard(card)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(card._id)}
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

        {/* Pagination Controls */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Typography mx={2}>Page {page}</Typography>
          <Button
            variant="contained"
            onClick={() =>
              setPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </Box>

        {/* Edit Modal (Using CardPermitForm) */}
        {editCard && (
          <Dialog
            open={true}
            onClose={() => setEditCard(null)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Edit Card</DialogTitle>
            <DialogContent>
              <CardPermitForm
                cardData={editCard}
                onSuccess={() => {
                  setEditCard(null);
                  fetchCards();
                }}
              />
            </DialogContent>
          </Dialog>
        )}
        {/* View Modal */}
        {viewCard && (
          <Dialog open="true" onClose={() => setViewCard(null)}>
            <DialogTitle>Card Details</DialogTitle>
            <DialogContent>
              <Typography>
                <b>Card Code:</b> {viewCard.code}
              </Typography>
              <Typography>
                <b>Card Name:</b> {viewCard.name}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewCard(null)}>Close Button</Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </>
  );
}

export default ViewAllCardsComponent;
