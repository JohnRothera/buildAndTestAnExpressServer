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

module.exports = {
  fetchBandName,
  fetchAllBandNames,
  fetchVenueInfoForSingleGig,
};
