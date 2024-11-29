import { useState, useRef } from "react";
import { PlayCircle } from "lucide-react";

const animals = [
  {
    id: 1,
    name: "Cat",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 2,
    name: "Dog",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 3,
    name: "Elephant",
    image:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    id: 4,
    name: "Lion",
    image:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80",
  },
];

export function LanguageLearningGame() {
  const [selectedAnimal, setSelectedAnimal] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnimal] = useState(
    () => animals[Math.floor(Math.random() * animals.length)]
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAnimalClick = (animalId: number) => {
    setSelectedAnimal(animalId);
    setShowResult(true);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {animals.map((animal) => (
          <button
            key={animal.id}
            className={`relative overflow-hidden rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
              selectedAnimal === animal.id ? "ring-4 ring-purple-600" : ""
            }`}
            onClick={() => handleAnimalClick(animal.id)}
          >
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-auto object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              {/* <span className="text-white text-lg sm:text-2xl font-bold">
                {animal.name}
              </span> */}
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={playAudio}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Play Sound</span>
        </button>
      </div>
      <audio ref={audioRef} src="/path-to-audio-file.mp3" />{" "}
      {/* Replace with actual audio file */}
      {showResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Result</h2>
            {selectedAnimal === correctAnimal.id ? (
              <p className="text-green-600">
                Correct! The animal was indeed a {correctAnimal.name}.
              </p>
            ) : (
              <p className="text-red-600">
                Sorry, that's not correct. The correct animal was a{" "}
                {correctAnimal.name}.
              </p>
            )}
            <button
              onClick={() => setShowResult(false)}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
