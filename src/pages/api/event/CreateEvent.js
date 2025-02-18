import dbConnect from '../../../../lib/dbConnect';
import Event from '../../../model/EventModel';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        return id ? getEventById(req, res, id) : getAllEvents(req, res);
      case 'POST':
        return createEvent(req, res);
      case 'PUT':
        return updateEvent(req, res, id);
      case 'DELETE':
        return deleteEvent(req, res, id);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

//  GET Single Event
const getEventById = async (req, res, id) => {
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching event' });
  }
};

//  GET All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    if (events.length === 0) return res.status(404).json({ message: 'No events found' });
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching events' });
  }
};

// ✅ CREATE Event
const createEvent = async (req, res) => {
  try {
    const { name, code, year, dates, notes } = req.body;
    if (!name || !code || !year || !dates) {
      return res.status(400).json({ message: 'Fill all required fields' });
    }

    const existingEvent = await Event.findOne({ $or: [{ name }, { code }] });
    if (existingEvent) {
      return res.status(400).json({ message: 'Event already exists with this name or code.' });
    }

    const event = new Event({ name, code, year, dates, notes });
    const newEvent = await event.save();
    return res.status(201).json(newEvent);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// ✅ UPDATE Event
const updateEvent = async (req, res, id) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json(updatedEvent);
  } catch (error) {
    return res.status(400).json({ error: 'Error updating event' });
  }
};

// ✅ DELETE Event
const deleteEvent = async (req, res, id) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting event' });
  }







  // if (id) {
  //   try {
  //     if (req.method === 'GET') {
  //       try {
  //         const event = await Event.findById(id);
  //         if (!event) return res.status(404).json({ error: 'Event not found' });
  //         return res.status(200).json(event);
  //       } catch (error) {
  //         res.status(500).json({ error: 'Error fetching event' });
  //       }
  //     } else if (req.method === 'PUT') {
  //       try {
  //         const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
  //         if (!updatedEvent) return res.status(404).json({ error: 'Event not found' });
  //         return  res.status(200).json(updatedEvent);
  //       } catch (error) {
  //         res.status(400).json({ error: 'Error updating event' });
  //       }
  //     } else if (req.method === 'DELETE') {
  //       try {
  //         const deletedEvent = await Event.findByIdAndDelete(id);
  //         if (!deletedEvent) return res.status(404).json({ error: 'Event not found' });
  //         res.status(200).json({ message: 'Event deleted successfully' });
  //       } catch (error) {
  //         res.status(500).json({ error: 'Error deleting event' });
  //       }
  //     } else {
  //       res.status(405).json({ error: 'Method not allowed' });
  //     }
  //   } catch (error) {
  //      console.log(error);
  //      return res.status(500).json({message  : error.mesaage});
       
  //   }
  // }
  // else{

  //   try {
  //     if (req.method === 'POST') {
  //       console.log(req.body);
  //       const { name, code, year, dates, notes } = req.body;
  
  //       if (!name || !code || !year || !dates) {
  //         return res.status(300).json({ message: "Fill All The Required Fields" });
  //       }
  
  //       const existingEvent = await Event.findOne({ $or: [{ name }, { code }] });
  //       if (existingEvent) {
  //         return res.status(400).json({ success: false, message: "Event already exists with this name or code." });
  //       }
  
  //       const event = new Event({
  //         name, code, year, dates, notes
  //       });
  
  //       const newEvent = await event.save();
  //       if (newEvent) {
  //         return res.status(200).json({ newEvent });
  //       }
  //       else {
  //         return res.status(400).json({ message: "server error" });
  //       }
  
  //     } else if (req.method === 'GET') {
  //       console.log(req.body);
  
  //       const events = await Event.find();
  //       if (events) {
  //         return res.status(200).json(events);
  //       }
  //       return res.status(404).json({ message: "Data Not Found" })
  //     }
  //   } catch (error) {
  //     console.log(error);
  
  //     return res.status(500).json({ message: error.message })
  //   }

  // }


 

}
