import { LanguageLearningGame } from "../components/v0/LanguageLearningGame";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">
      <h1 className="text-4xl font-bold text-white mb-8">Luca's Card</h1>
      <LanguageLearningGame />
    </main>
  );
}
