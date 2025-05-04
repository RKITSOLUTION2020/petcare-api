import Pets from '../models/pets.models.js';

export const PetsIndex = async (req, res) => {
  try {
    const pets = await Pets.find();
    res.json(pets);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const StorePet = async (req, res) => {
  const newPets = new Pets({
    name: req.body.name,
    species: req.body.species,
    age: req.body.age,
    personality: req.body.personality,
  });

  try {
    const pets = await newPets.save();
    return res.status(201).json(pets);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const filterPetsByMood = async (req, res) => {
  const query = req.query.mood;

  try {
    const pets =
      query === 'All'
        ? await Pets.find()
        : await Pets.find({ personality: query });

    res.json(pets);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

export const GetPet = async (req, res) => {
  try {
    const pets = await Pets.findById(req.params.id);
    if (pets == null) {
      return res.status(404).json({ message: 'cannot find pets' });
    } else {
      res.json(pets);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdatePet = async (req, res) => {
  try {
    const pet = await Pets.findById(req.params.id);
    pet.name = req.body.name;
    pet.species = req.body.species;
    pet.age = req.body.age;
    pet.personality = req.body.personality;
    const savepet = await pet.save();
    res.json(savepet);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeletePet = async (req, res) => {
  const petid = req.params.id;

  try {
    await Pets.deleteOne({ _id: petid });
    res.json({ message: 'pet deleted!' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const AdoptedPet = async (req, res) => {
  const { id } = req.params;
  const isAdopted = req.query.adopt === 'true';

  try {
    const updatedPet = await Pets.findByIdAndUpdate(
      id,
      {
        adopted: isAdopted,
        adoption_date: isAdopted ? new Date() : null,
      },
      { new: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json({
      message: `Pet ${isAdopted ? 'adopted' : 'unadopted'} successfully`,
      pet: updatedPet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
