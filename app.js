const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

const jimiDate = new Date("1967-06-15");
jimiDate.setDate(18);
const sabbathJamDate = new Date("1974-04-15");
sabbathJamDate.setDate(6);
const bowieDate = new Date("1973-07-15");
bowieDate.setDate(3);
const sleafordsDate = new Date("2022-07-15");
sleafordsDate.setDate(29);
const metzDate = new Date("2022-04-15");
metzDate.setDate(7);

const gig1 = {
  name: "Jimi Hendrix",
  image:
    "https://nitorlack.com/wp-content/uploads/2022/03/JIMI-HENDRIX-MONTEREY-GUITARRA-FUEGO.jpg",
  description: "Live from monterey pop festival!",
  date: jimiDate,
  location: {
    venue: "Monterey County Fairgrounds",
    city: "Monterey",
    state: "California",
  },
  id: 1,
};

const gig2 = {
  name: "Black Sabbath",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkSUnhYW_rLS9T3oRIBa29GUaJK4HWk_GCnQ&s",
  description: "Live from California Jam festival!",
  date: sabbathJamDate,
  location: {
    venue: "Ontario Speedway",
    city: "Ontario",
    state: "California",
  },
  id: 2,
};

const gig3 = {
  name: "David Bowie",
  image:
    "https://variety.com/wp-content/uploads/2023/07/Ziggy50-Trailer-V8-temp-for-stills42.jpg?w=1000&h=563&crop=1",
  description: "Say farewell to the Spiders from Mars!",
  date: bowieDate,
  location: {
    venue: "Hammersmith Odeon",
    city: "London",
    state: null,
  },
  id: 3,
};

const gig4 = {
  name: "Sleaford Mods",
  image: "https://www.youtube.com/watch?v=37oJcgEHPQI",
  description: "One last blast at The Chameleon!",
  date: sleafordsDate,
  location: {
    venue: "The Chameleon",
    city: "Nottingham",
    state: null,
  },
  id: 4,
};

const gig5 = {
  name: "METZ",
  image:
    "https://www.brudenellsocialclub.co.uk/files/4816/4674/0724/Metz_Poster-10.5x.jpg",
  description: "Touring new album 'Atlus Vending!'",
  date: metzDate,
  location: {
    venue: "The Brudenell",
    city: "Leeds",
    state: null,
  },
  id: 5,
};

const gigs = [gig1, gig2, gig3, gig4, gig5];

app.get("/gigs", (req, res) => {
  res.send(gigs);
});

app.get("/gigs/:id", (req, res) => {
  const id = req.params.id;
  const gig = gigs[id - 1];
  if (!gig) return res.status(404).json({ error: "No gig with that ID!" });
  return res.status(200).json({ gig });
});

app.post("/gigs", (req, res) => {
  const { body } = req;
  const newGig = { ...body, id: gigs.length + 1 };
  gigs.push(newGig);
  return res.status(201).json({
    message: "Successfully posted new gig!",
    gig: newGig,
  });
});

app.delete("/gigs/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return res.status(400).json({ error: "ID must be a number!" });
  const findGigIndex = gigs.findIndex((gig) => gig.id === parsedId);
  if (findGigIndex === -1)
    return res.status(404).json({ error: "ID not found!" });
  gigs.splice(findGigIndex, 1);
  return res.status(200).json({ message: "Gig successfully deleted!" });
});

module.exports = app;
