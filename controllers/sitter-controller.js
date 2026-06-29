const knex = require("knex")(require("../knexfile"));

// GET list of sitters
const sitters = async (req, res) => {
  try {
    const sitters = await knex("sitters")
    res.json(sitters)
  } catch (error) {
    res.status(400).json({
      message: `Unable to retrieve sitters data: ${error}`
    })
  }
};

const addSitter = async (req,res) => {
  res.status(500).json({
    message: `Currently unable to add sitters. Check back later`
  })
};

const addSitterApplication = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone = null,
        city,
        province = "ON",
        postalCode,
        lat = null,
        lng = null,
        hourlyRate,
        serviceRadiusKm = 35,
        bio,
        acceptedPetTypes,
        acceptedPetSizes
    } = req.body;

    if (!firstName || !lastName || !email || !city || !postalCode || !hourlyRate || !bio) {
        return res.status(400).json({ message: "Missing required sitter application fields" });
    }

    if (!Array.isArray(acceptedPetTypes) || acceptedPetTypes.length === 0) {
        return res.status(400).json({ message: "At least one accepted pet type is required" });
    }

    if (!Array.isArray(acceptedPetSizes) || acceptedPetSizes.length === 0) {
        return res.status(400).json({ message: "At least one accepted pet size is required" });
    }

    try {
        const existingPending = await knex("sitter_applications")
            .where({ email })
            .whereIn("status", ["pending", "approved"])
            .first();

        if (existingPending) {
            return res.status(400).json({ message: "A sitter application already exists for this email" });
        }

        await knex("sitter_applications").insert({
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            city,
            province,
            postal_code: postalCode,
            lat,
            lng,
            hourly_rate: hourlyRate,
            service_radius_km: serviceRadiusKm,
            bio,
            accepted_pet_types: acceptedPetTypes.join(","),
            accepted_pet_sizes: acceptedPetSizes.join(","),
            status: "pending"
        });

        return res.status(201).json({ message: "Sitter application submitted for review" });
    } catch (error) {
        return res.status(500).json({ message: `Unable to submit sitter application: ${error.message}` });
    }
};

// Helper function to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

const findSitters = async (req, res) => {
/*   const { petType, userLat, userLng } = req.body;

  try {
    // Query sitters based on pet type, availability, and calculate distance
    const sitters = await knex('sitters')
      .join('sitter_pet_types', 'sitters.id', '=', 'sitter_pet_types.sitter_id')
      .join('pet_types', 'sitter_pet_types.pet_type_id', '=', 'pet_types.id')
      .select(
        'sitters.*',
        knex.raw(
          '( 3959 * acos( cos( radians(?) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(?) ) + sin( radians(?) ) * sin( radians( lat ) ) ) ) AS distance',
          [userLat, userLng, userLat]
        )
      )
      .where('availability', true)
      .andWhere('pet_types.name', petType)
      .orderBy('distance', 'asc');

    res.json(sitters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  } */

    try {
        const { petType, userLat, userLng } = req.body;

        if (!petType || !userLat || !userLng) {
            return res.status(400).json({ error: "Invalid input data" });
        }

        const sitters = await knex("sitters")
            .join("sitter_pet_types", "sitters.id", "sitter_pet_types.sitter_id")
            .join("pet_types", "sitter_pet_types.pet_type_id", "pet_types.id")
            .select(
                "sitters.id",
                "sitters.first_name",
                "sitters.last_name",
                "sitters.availability",
                "pet_types.name as petType",
                knex.raw(
                    `(${calculateDistance(userLat, userLng, "sitters.lat", "sitters.lng")}) as distance`
                )
            )
            .where("sitters.availability", true) // Filter available sitters
            .andWhere("pet_types.name", petType) // Match sitters by pet type
            .orderBy("distance", "asc"); // Order by distance

        const response = sitters.map((sitter) => ({
            petSize: "Unknown", // Assuming petSize is a placeholder
            petType: sitter.petType,
            userLat: parseFloat(userLat),
            userLng: parseFloat(userLng),
        }));

        return res.status(200).json(response);
    } catch (err) {
        console.error("Error querying sitters:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { sitters, addSitter, addSitterApplication, findSitters }
