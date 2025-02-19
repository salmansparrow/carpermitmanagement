import dbConnect from "../../../../lib/dbConnect";
import Card from "../model/CardModel";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  try {
    switch (req.method) {
      case "GET":
        return id ? getCardById(req, res, id) : getAllCards(req, res);
      case "POST":
        return createCard(req, res);
      case "PUT":
        return updateCard(req, res, id);
      case "DELETE":
        return deleteCard(req, res, id);
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

//  GET Single Card
const getCardById = async (req, res, id) => {
  try {
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    return res.status(200).json(card);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching card" });
  }
};

//  GET All Cards
const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    if (cards.length === 0)
      return res.status(404).json({ message: "No cards found" });
    return res.status(200).json(cards);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching cards" });
  }
};

//  CREATE Card
const createCard = async (req, res) => {
  try {
    const { name, code } = req.body;
    if (!name || !code) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    const existingCard = await Card.findOne({ code });
    if (existingCard) {
      return res
        .status(400)
        .json({ message: "Card with this code already exists." });
    }

    const card = new Card({ name, code });
    const newCard = await card.save();
    return res.status(201).json(newCard);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//  UPDATE Card
const updateCard = async (req, res, id) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCard) return res.status(404).json({ error: "Card not found" });
    return res.status(200).json(updatedCard);
  } catch (error) {
    return res.status(400).json({ error: "Error updating card" });
  }
};

//  DELETE Card
const deleteCard = async (req, res, id) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) return res.status(404).json({ error: "Card not found" });
    return res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting card" });
  }
};
