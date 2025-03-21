const {
  fetchBandName,
  fetchAllBandNames,
  fetchVenueInfoForSingleGig,
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
