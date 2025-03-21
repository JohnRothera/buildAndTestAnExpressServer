const fetchBandName = async (gigID) => {
  try {
    const response = await fetch(`http://localhost:3000/gigs/${gigID}`);
    if (!response.ok) {
      throw new Error("Unable to find band with that id!");
    }
    const gigData = await response.json();
    const band = {
      name: gigData.gig.name,
    };
    return band;
  } catch (error) {
    throw error;
  }
};

const fetchAllBandNames = async () => {
  try {
    const response = await fetch("http://localhost:3000/gigs");
    if (!response.ok) {
      throw new Error("Unable to retrieve band names!");
    }
    const gigData = await response.json();
    const bandNamesList = [];
    for (let i = 0; i < gigData.length; i++) {
      const bandName = {
        name: gigData[i].name,
      };
      bandNamesList.push(bandName);
    }
    return bandNamesList;
  } catch (error) {
    throw error;
  }
};

const fetchVenueInfoForSingleGig = async (gigID) => {
  try {
    const response = await fetch(`http://localhost:3000/gigs/${gigID}`);
    if (!response.ok) {
      throw new Error("Unable to find gig with that id!");
    }
    const gigData = await response.json();
    const location = {
      location: gigData.gig.location,
    };
    return location;
  } catch (error) {
    throw error;
  }
};

const fetchPostGig = async (gigData) => {
  try {
    if (!gigData.name) {
      throw new Error("You must at least provide a band name");
    }
    if (!gigData.location?.venue) {
      throw new Error("Please provide the venue for the gig!");
    }
    const gigToPost = {
      name: gigData.name,
      image: gigData.image || "",
      description: gigData.description || "",
      date: gigData.date ? new Date(gigData.date) : new Date(),
      location: {
        venue: gigData.location?.venue,
        city: gigData.location?.city || "",
        state: gigData.location?.state || null,
      },
    };
    const request = new Request("http://localhost:3000/gigs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gigToPost),
    });
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Unable to create new gig!");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchDeleteGig = async (gigID) => {
  try {
    const request = new Request(`http://localhost:3000/gigs/${gigID}`, {
      method: "DELETE",
    });
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Unable to delete gig!");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchBandName,
  fetchAllBandNames,
  fetchVenueInfoForSingleGig,
  fetchPostGig,
  fetchDeleteGig,
};
