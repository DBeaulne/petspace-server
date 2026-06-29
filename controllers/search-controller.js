const knex = require("knex")(require("../knexfile"));
const { calculateDistance, geocodeApproxLocation } = require("../utils/location");

const typeAliases = {
  Dog: ["Dog", "Dogs", "Small Dog", "Medium Dog", "Large Dog"],
  Cat: ["Cat", "Cats", "Indoor Cat", "Outdoor Cat"],
  Reptile: ["Reptile", "Reptiles"],
  Bird: ["Bird", "Birds"],
  Tarantula: ["Tarantula", "Tarantulas"]
};

const sizeAliases = {
  Small: ["Small Dog", "Dogs", "Dog"],
  Medium: ["Medium Dog", "Dogs", "Dog"],
  Large: ["Large Dog", "Dogs", "Dog"],
  Huge: ["Large Dog", "Dogs", "Dog"]
};

const matchesPet = (acceptedTypes, petType, petSize) => {
  const accepted = new Set(acceptedTypes);
  const typeMatches = typeAliases[petType] || [petType];
  const sizeMatches = sizeAliases[petSize] || [];

  if (petType === "Dog" && sizeMatches.length > 0) {
    return sizeMatches.some((name) => accepted.has(name));
  }

  return typeMatches.some((name) => accepted.has(name));
};

const getSitterRows = async () => {
  const rows = await knex("sitters")
    .leftJoin("sitter_pet_types", "sitters.id", "sitter_pet_types.sitter_id")
    .leftJoin("pet_types", "sitter_pet_types.pet_type_id", "pet_types.id")
    .select(
      "sitters.id",
      "sitters.first_name",
      "sitters.last_name",
      "sitters.email",
      "sitters.city",
      "sitters.province",
      "sitters.lat",
      "sitters.lng",
      "sitters.availability",
      "sitters.status",
      "sitters.hourly_rate",
      "sitters.bio",
      "sitters.service_radius_km",
      "pet_types.name as pet_type_name"
    )
    .where("sitters.availability", true)
    .andWhere("sitters.status", "approved");

  const sitters = new Map();

  rows.forEach((row) => {
    if (!sitters.has(row.id)) {
      sitters.set(row.id, {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
        city: row.city,
        province: row.province,
        lat: Number(row.lat),
        lng: Number(row.lng),
        hourlyRate: Number(row.hourly_rate || 25),
        bio: row.bio || "Approved Durham Region pet sitter.",
        serviceRadiusKm: Number(row.service_radius_km || 25),
        acceptedPetTypes: []
      });
    }

    if (row.pet_type_name) {
      sitters.get(row.id).acceptedPetTypes.push(row.pet_type_name);
    }
  });

  return Array.from(sitters.values());
};

const searchSitters = async (req, res) => {
  const { petType, petSize, startDateTime, endDateTime, postalCode, city, province, lat, lng } = req.body;

  if (!petType || !petSize) {
    return res.status(400).json({ message: "Pet type and pet size are required" });
  }

  try {
    const origin = await geocodeApproxLocation({ postalCode, city, province, lat, lng });
    const sitters = await getSitterRows();

    const matches = sitters
      .filter((sitter) => matchesPet(sitter.acceptedPetTypes, petType, petSize))
      .map((sitter) => {
        const distanceKm = calculateDistance(origin.lat, origin.lng, sitter.lat, sitter.lng);
        return {
          ...sitter,
          distanceKm: Number(distanceKm.toFixed(1)),
          request: { petType, petSize, startDateTime, endDateTime, locationLabel: origin.label }
        };
      })
      .filter((sitter) => sitter.distanceKm <= sitter.serviceRadiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return res.json({
      origin,
      sitters: matches.slice(0, 12)
    });
  } catch (error) {
    return res.status(500).json({ message: `Unable to search sitters: ${error.message}` });
  }
};

module.exports = { searchSitters, matchesPet };
