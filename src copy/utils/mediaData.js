// Sample array of animal types
const animalTypes = ['Lizard', 'Elephant', 'Tiger', 'Giraffe', 'Kangaroo', 'Penguin', 'Dolphin', 'Koala', 'Zebra', 'Hippo'];

// Function to generate random text related to the animal type
const generateRandomText = (animalType) => {
  // You can customize this function to generate text based on the animal type
  return `Information about ${animalType}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
};

// Function to generate an array of data
const generateBackendData = () => {
  const data = [];

  for (let i = 0; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * animalTypes.length);
    const randomAnimalType = animalTypes[randomIndex];
    const randomText = generateRandomText(randomAnimalType);

    data.push({
      id: i,
      type: randomAnimalType,
      text: randomText,
    });
  }

  return data;
};

// Usage
export default generateBackendData();

