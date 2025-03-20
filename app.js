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

const gigs = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

module.exports = app;
