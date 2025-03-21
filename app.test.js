const request = require("supertest");
const app = require("./app.js");

const gigs = [
  {
    name: "Jimi Hendrix",
    image:
      "https://nitorlack.com/wp-content/uploads/2022/03/JIMI-HENDRIX-MONTEREY-GUITARRA-FUEGO.jpg",
    description: "Live from Monterey Pop festival!",
    date: "1967-06-18T00:00:00.000Z",
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
    date: "1974-04-06T00:00:00.000Z",
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
    date: "1973-07-03T00:00:00.000Z",
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
    date: "2022-07-29T00:00:00.000Z",
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
    date: "2022-04-07T00:00:00.000Z",
    location: {
      venue: "The Brudenell",
      city: "Leeds",
      state: null,
    },
    id: 5,
  },
];

describe("GET /gigs", () => {
  test("We recieve all gig objects and a 200ok status code", async () => {
    const response = await request(app).get("/gigs");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(gigs);
  });

  test("we can get a single gig by its id and a 200ok status code", async () => {
    const response = await request(app).get("/gigs/2");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      gig: {
        name: "Black Sabbath",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkSUnhYW_rLS9T3oRIBa29GUaJK4HWk_GCnQ&s",
        description: "Live from California Jam festival!",
        date: "1974-04-06T00:00:00.000Z",
        location: {
          venue: "Ontario Speedway",
          city: "Ontario",
          state: "California",
        },
        id: 2,
      },
    });
  });

  test("we display a custom error and 404 status if searching for non existent gig id", async () => {
    const response = await request(app).get("/gigs/22");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "No gig with that ID!",
    });
  });
});

describe("POST a new gig /gigs", () => {
  test("we can post a new gig and see it populate the list of gigs", async () => {
    const response = await request(app)
      .post("/gigs")
      .send({
        name: "Crypt Rats",
        image: "https://f4.bcbits.com/img/a1666818566_10.jpg",
        description: "Uk grindcore newcomers take it on the road",
        date: "2025-08-16",
        location: {
          venue: "Jt Soar",
          city: "Nottingham",
          state: null,
        },
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Successfully posted new gig!",
      gig: {
        name: "Crypt Rats",
        image: "https://f4.bcbits.com/img/a1666818566_10.jpg",
        description: "Uk grindcore newcomers take it on the road",
        date: "2025-08-16",
        location: {
          venue: "Jt Soar",
          city: "Nottingham",
          state: null,
        },
        id: 6,
      },
    });
  });
});

describe("DELETE a gig from /gigs", () => {
  test("we can delete a gig, get a 200 status code and see the list \
    of gigs has removed the chosen element", async () => {
    const response = await request(app).delete("/gigs/4");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Gig successfully deleted!",
    });
  });

  test("we get an error message when trying to delete with an incorrect id", async () => {
    const response = await request(app).delete("/gigs/22");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "ID not found!",
    });
  });
});
