const knex = require("knex")(require("../knexfile"));

// GET list of users
const pets = async (req, res) => {
  try {
    const pets = await knex("pet")
    res.json(pets)
  } catch (error) {
    res.status(400).json({
      message: `Unable to retrieve pets data: ${error}`
    })
  }
};

const addPet = async (req,res) => {
  const { petName, petType, size, temperament, age, petFood, foodServing, petActivities } = req.body;
  try {
    await knex('pet').insert({
      name: petName,
      pet_type: petType,
      size,
      temperament,
      age,
      food_serving: foodServing,
      food_type: petFood,
      activities: petActivities,
    }).then(() => {
      res.status(201).json({
        message: "Pet added to database",
        pet: { petName }
      })
    });
  } catch (error) {
    // error message:
    res.status(500).json({message: `Unable to add ${petName} to the database: ${error}`})
  }
};

module.exports = { pets, addPet }