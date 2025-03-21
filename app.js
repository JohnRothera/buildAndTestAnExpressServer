const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

const gig1 = {
  name: "Jimi Hendrix",
  image:
    "https://nitorlack.com/wp-content/uploads/2022/03/JIMI-HENDRIX-MONTEREY-GUITARRA-FUEGO.jpg",
  description: "Live from Monterey Pop festival!",
  date: new Date("1967-06-18"),
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
  date: new Date("1974-04-06"),
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
  date: new Date("1973-07-03"),
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
  date: new Date("2022-07-29"),
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
  date: new Date("2022-04-07"),
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

app.patch("/gigs/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const gigToUpdate = req.body;

  const gigIndex = gigs.findIndex((gig) => gig.id === Number(id));
  if (gigIndex === -1) {
    return res.status(404).json({ message: "Gig not found" });
  }

  // Create a proper updated gig object
  const updatedGig = {
    ...gigs[gigIndex], // Start with existing gig
    // Update only the specific fields sent in the request
    description: gigToUpdate.description || gigs[gigIndex].description,
    date: gigToUpdate.date ? new Date(gigToUpdate.date) : gigs[gigIndex].date,
    location: {
      // Preserve existing location fields and override with any new values
      ...gigs[gigIndex].location,
      ...(gigToUpdate.location || {}),
    },
  };

  // Update the gig in the array
  gigs[gigIndex] = updatedGig;

  res.status(200).json({ message: "Gig successfully updated" });
});

module.exports = app;
