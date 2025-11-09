"use client";

import React, { useState } from "react";
import TeamInput from "./TeamInput";
import RoundDisplay from "./RoundDisplay";
import ChampionDisplay from "./ChampionDisplay";
import TournamentControls from "./TournamentControls";
import { WinnerStrategy, ManualWinnerStrategy, RandomWinnerStrategy } from "../strategies/WinnerStrategy"
import { ChampionSubject, ChampionNotifier } from "../observers/ChampionObserver";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface ChampionshipManagerProps {
  onBackToDashboard: () => void;
  championshipId?: string;
}

const ChampionshipManager: React.FC<ChampionshipManagerProps> = ({ onBackToDashboard, championshipId }) => {
  const [teams, setTeams] = useState<string[]>(Array(16).fill(""));
  const [rounds, setRounds] = useState<string[][][]>([]);
  const [selectedWinners, setSelectedWinners] = useState<string[]>([]);
  const [isTournamentStarted, setIsTournamentStarted] = useState(false);
  const [champion, setChampion] = useState<string | null>(null);
  const [isTournamentFinished, setIsTournamentFinished] = useState(false);
  const [winnerStrategy, setWinnerStrategy] = useState<WinnerStrategy>(new ManualWinnerStrategy());

  const championSubject = new ChampionSubject();
championSubject.addObserver(new ChampionNotifier());

  const startTournament = () => {
    if (teams.some((team) => team === "")) {
      alert("Por favor, insira todos os nomes dos times.");
      return;
    }

    const shuffledTeams = shuffleArray(teams);
    const initialRound = chunkArray(shuffledTeams, 2);
    setRounds([initialRound]);
    setIsTournamentStarted(true);
  };

  const shuffleArray = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

  const chunkArray = (array: string[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i + 0, i + size));
    }
    return result;
  };

  const advanceRound = () => {
  let nextWinners = selectedWinners;

  // se o usuário não escolher manualmente, usa estratégia automática
  if (nextWinners.length === 0) {
    nextWinners = rounds[rounds.length - 1].map((duel) => winnerStrategy.selectWinner(duel));
  }

  if (nextWinners.length !== rounds[rounds.length - 1].length) {
    alert(`Escolha um vencedor para cada duelo antes de avançar.`);
    return;
  }

  const nextRound = chunkArray(nextWinners, 2);
  setRounds([...rounds, nextRound]);
  setSelectedWinners([]);

  if (nextRound.length === 1 && nextRound[0].length === 1) {
    setChampion(nextRound[0][0]);
    setIsTournamentFinished(true);
    championSubject.notify(nextRound[0][0]);
  }
};

  const selectWinner = (winner: string, duel: string[]) => {
    const updatedWinners = selectedWinners.filter((team) => !duel.includes(team));
    updatedWinners.push(winner);
    setSelectedWinners(updatedWinners);
  };

  const resetTournament = () => {
    setTeams(Array(16).fill(""));
    setRounds([]);
    setSelectedWinners([]);
    setChampion(null);
    setIsTournamentStarted(false);
    setIsTournamentFinished(false);
  };

  const roundNames = ["Oitavas de Final", "Quartas de Final", "Semifinais", "Final"];

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
        Gerenciador de Campeonato
      </h1>

      {!isTournamentStarted && !isTournamentFinished && (
        <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <TeamInput teams={teams} setTeams={setTeams} />
          <button
            onClick={startTournament}
            className="w-full mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Iniciar Torneio
          </button>

          {/* Botão de logout */}
           <button
        onClick={onBackToDashboard}
        className="mt-8 px-6 py-3 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
      >
        Voltar para o Dashboard
      </button>
       <h2>Gerenciando Campeonato: {championshipId ?? "Nenhum selecionado"}</h2>
        </div>
      )}

<div className="flex gap-4 mt-4">
  <button
    onClick={() => setWinnerStrategy(new ManualWinnerStrategy())}
    className="bg-blue-700 px-4 py-2 rounded"
  >
    Modo Manual
  </button>
  <button
    onClick={() => setWinnerStrategy(new RandomWinnerStrategy())}
    className="bg-green-700 px-4 py-2 rounded"
  >
    Modo Aleatório
  </button>
</div>

      {isTournamentStarted && rounds.length > 0 && (
        <RoundDisplay
          rounds={rounds}
          roundNames={roundNames}
          selectedWinners={selectedWinners}
          selectWinner={selectWinner}
        />
      )}

      {isTournamentStarted && !isTournamentFinished && (
        <TournamentControls advanceRound={advanceRound} />
      )}

      {isTournamentFinished && champion && (
        <ChampionDisplay champion={champion} resetTournament={resetTournament} />
      )}
    </div>
  );
};

export default ChampionshipManager;
