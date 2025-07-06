const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const MeetupEvent = require("./models/eventify.model");
const cors = require("cors");
const app = express();
require("dotenv").config();

// CORS Configuration
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

initializeDatabase();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Event CRUD Operations
async function createEvent(eventData) {
  try {
    const newEvent = new MeetupEvent(eventData);
    const savedEvent = await newEvent.save();
    return savedEvent;
  } catch (error) {
    console.error("Error while creating event: ", error);
    throw error; 
  }
}

// POST route
app.post("/events", async (req, res) => {
  try {
    if (!req.body.title || !req.body.date || !req.body.timeToStart || !req.body.timeToEnd || 
      !req.body.eventType || !req.body.host || !req.body.details || !req.body.eventTags || 
      !req.body.locationCity || !req.body.locationAddress || !req.body.thumbnail || !req.body.speakers) {
      return res.status(400).json({ error: "Title, date, start and end time, event type, host, details, eventTags, location city and address, thumbnail, speakers are required." });
    }
    
    const eventData = await createEvent(req.body);
    res.status(201).json({ 
      message: "Event added successfully", 
      event: eventData 
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to create event",
      details: error.message 
    });
  }
});

// GET route
async function readAllEvents() {
  try {
    return await MeetupEvent.find();
  } catch (error) {
    console.error("Error while fetching events: ", error);
    throw error;
  }
}

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch events",
      details: error.message 
    });
  }
});

// GET by Title route
async function readByTitle(eventTitle) {
  try {
    const eventByTitle = await MeetupEvent.findOne({ title: eventTitle });
    return eventByTitle;
  } catch (error) {
    console.error("Error while fetching event by title: ", error);
    throw error;
  }
}

app.get("/events/title/:eventTitle", async (req, res) => {
  try {
    const event = await readByTitle(req.params.eventTitle);
    if (!event) {
      return res.status(404).json({ error: "Event does not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch event",
      details: error.message 
    });
  }
});

// GET by Tag route
async function readByTag(eventTag) {
  try {
    const eventByTag = await MeetupEvent.find({ eventTags: eventTag });
    return eventByTag;
  } catch (error) {
    console.error("Error while fetching events by tag: ", error);
    throw error;
  }
}

app.get("/events/tags/:eventTag", async (req, res) => {
  try {
    const events = await readByTag(req.params.eventTag);
    res.json(events);
  } catch (error) {
    res.status(500).json({ 
      error: "Failed to fetch events by tag",
      details: error.message 
    });
  }
});

// DELETE route

async function deleteEventData (eventId) {
  try{
    const deleteEvent = await MeetupEvent.findByIdAndDelete(eventId)
    return deleteEvent;
  }catch(error){
    console.log(error);
  }
}

app.delete("/events/id/:eventId", async (req,res)=>{
  try{
    const eventData = await deleteEventData(req.params.eventId);
    
    if(eventData){
        res.status(200).json({message:"Event data deleted successfully",event:eventData});
    }else{
      res.status(404).json({error:"Event does not found"})
    }
  }catch (error){
    res.status(500).json({error:"Failed to fetch while deleting event."})
  }
})

// Server Run on PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});