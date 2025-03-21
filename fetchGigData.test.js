const {
  fetchBandName,
  fetchAllBandNames,
  fetchVenueInfoForSingleGig,
  fetchPostGig,
  fetchDeleteGig,
  fetchPatchGig,
} = require("./fetchGigData");

describe("fetchGigData", () => {
  test("we want to send a fetch request to get all band names", async () => {
    await expect(fetchBandName(3)).resolves.toEqual({
      name: "David Bowie",
    });
  });

  test("we want to get the band names from all gigs", async () => {
    await expect(fetchAllBandNames()).resolves.toEqual([
      { name: "Jimi Hendrix" },
      { name: "Black Sabbath" },
      { name: "David Bowie" },
      { name: "Sleaford Mods" },
      { name: "METZ" },
    ]);
  });

  test("I want to get venue information from a single gig", async () => {
    await expect(fetchVenueInfoForSingleGig(2)).resolves.toEqual({
      location: {
        venue: "Ontario Speedway",
        city: "Ontario",
        state: "California",
      },
    });
  });
});

describe("fetch POST request/response", () => {
  const testGigData = {
    name: "Crypt Rats",
    image: "https://f4.bcbits.com/img/a1666818566_10.jpg",
    description: "Uk grindcore newcomers take it on the road",
    date: "2025-08-16",
    location: {
      venue: "Jt Soar",
      city: "Nottingham",
      state: null,
    },
  };
  const testGigData2 = {
    name: null,
    image: "https://f4.bcbits.com/img/a1666818566_10.jpg",
    description: "Uk grindcore newcomers take it on the road",
    date: "2025-08-16",
    location: {
      venue: "Jt Soar",
      city: "Nottingham",
      state: null,
    },
  };
  const testGigData3 = {
    name: "Crypt Rats",
    image: "https://f4.bcbits.com/img/a1666818566_10.jpg",
    description: "Uk grindcore newcomers take it on the road",
    date: "2025-08-16",
    location: {
      venue: null,
      city: "Nottingham",
      state: null,
    },
  };
  test("Test the fetch api for my post endpoint responds as expected", async () => {
    await expect(fetchPostGig(testGigData)).resolves.toEqual({
      message: "Successfully posted new gig!",
      gig: {
        name: "Crypt Rats",
        image: "https://f4.bcbits.com/img/a1666818566_10.jpg",
        description: "Uk grindcore newcomers take it on the road",
        date: "2025-08-16T00:00:00.000Z",
        location: {
          venue: "Jt Soar",
          city: "Nottingham",
          state: null,
        },
        id: 6,
      },
    });
  });

  test("test if we send a post request without a band name we get the correct error", async () => {
    await expect(fetchPostGig(testGigData2)).rejects.toThrow(
      "You must at least provide a band name"
    );
  });

  test("test if we send a post request without a venue we get the correct error", async () => {
    await expect(fetchPostGig(testGigData3)).rejects.toThrow(
      "Please provide the venue for the gig!"
    );
  });
});

describe("fetch PATCH request/response", () => {
  test("see if we can update a gig with PATCH", async () => {
    await expect(fetchPatchGig(1)).resolves.toEqual({
      message: "Gig successfully updated",
    });
  });
});

describe("fetch DELETE request/response", () => {
  test("test that we can successfully delete a gig entry with a function", async () => {
    await expect(fetchDeleteGig(1)).resolves.toEqual({
      message: "Gig successfully deleted!",
    });
  });

  test("We get the correct error response when trying to delete with an invalid id", async () => {
    await expect(fetchDeleteGig(21)).rejects.toThrow("Unable to delete gig!");
  });
});
