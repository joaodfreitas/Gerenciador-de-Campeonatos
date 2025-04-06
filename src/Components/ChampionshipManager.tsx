"use client";

import React, { useState } from "react";
import TeamInput from "./TeamInput"; // Importa o componente para entrada de nomes dos times
import RoundDisplay from "./RoundDisplay"; // Importa o componente para exibir as fases do torneio
import ChampionDisplay from "./ChampionDisplay"; // Importa o componente para exibir o campeão
import TournamentControls from "./TournamentControls"; // Importa o componente para os controles do torneio

const ChampionshipManager: React.FC = () => {
  // Estados para gerenciar os dados do torneio
  const [teams, setTeams] = useState<string[]>(Array(16).fill("")); // Lista de nomes dos times
  const [rounds, setRounds] = useState<string[][][]>([]); // Lista de fases do torneio
  const [selectedWinners, setSelectedWinners] = useState<string[]>([]); // Lista de vencedores selecionados
  const [isTournamentStarted, setIsTournamentStarted] = useState(false); // Indica se o torneio começou
  const [champion, setChampion] = useState<string | null>(null); // Nome do time campeão
  const [isTournamentFinished, setIsTournamentFinished] = useState(false); // Indica se o torneio terminou

  // Função para iniciar o torneio
  const startTournament = () => {
    // Verifica se todos os nomes dos times foram inseridos
    if (teams.some((team) => team === "")) {
      alert("Por favor, insira todos os nomes dos times.");
      return;
    }

    // Embaralha os times e cria a primeira fase do torneio
    const shuffledTeams = shuffleArray(teams);
    const initialRound = chunkArray(shuffledTeams, 2);
    setRounds([initialRound]);
    setIsTournamentStarted(true);
  };

  // Função para embaralhar um array
  const shuffleArray = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

  // Função para dividir um array em grupos de um determinado tamanho
  const chunkArray = (array: string[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Função para avançar para a próxima fase do torneio
  const advanceRound = () => {
    // Verifica se todos os vencedores foram selecionados
    if (selectedWinners.length !== rounds[rounds.length - 1].length) {
      alert(`Escolha um vencedor para cada duelo antes de avançar.`);
      return;
    }

    // Cria a próxima fase do torneio e atualiza o estado
    const nextRound = chunkArray(selectedWinners, 2);
    setRounds([...rounds, nextRound]);
    setSelectedWinners([]);

    // Verifica se o torneio terminou
    if (nextRound.length === 1 && nextRound[0].length === 1) {
      setChampion(nextRound[0][0]);
      setIsTournamentFinished(true);
    }
  };

  // Função para selecionar o vencedor de um duelo
  const selectWinner = (winner: string, duel: string[]) => {
    const updatedWinners = selectedWinners.filter((team) => !duel.includes(team));
    updatedWinners.push(winner);
    setSelectedWinners(updatedWinners);
  };

  // Função para reiniciar o torneio
  const resetTournament = () => {
    setTeams(Array(16).fill(""));
    setRounds([]);
    setSelectedWinners([]);
    setChampion(null);
    setIsTournamentStarted(false);
    setIsTournamentFinished(false);
  };

  // Array com os nomes das fases do torneio
  const roundNames = ["Oitavas de Final", "Quartas de Final", "Semifinais", "Final"];

  // Renderização do componente
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">Gerenciador de Campeonato</h1>

      {/* Exibe o componente TeamInput se o torneio não começou e não terminou */}
      {!isTournamentStarted && !isTournamentFinished && (
        <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <TeamInput teams={teams} setTeams={setTeams} />
          <button
            onClick={startTournament}
            className="w-full mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Iniciar Torneio
          </button>
        </div>
      )}

      {/* Exibe o componente RoundDisplay se o torneio começou e há fases para exibir */}
      {isTournamentStarted && rounds.length > 0 && (
        <RoundDisplay
          rounds={rounds}
          roundNames={roundNames}
          selectedWinners={selectedWinners}
          selectWinner={selectWinner}
        />
      )}

      {/* Exibe o componente TournamentControls se o torneio começou e não terminou */}
      {isTournamentStarted && !isTournamentFinished && (
        <TournamentControls advanceRound={advanceRound} />
      )}

      {/* Exibe o componente ChampionDisplay se o torneio terminou e há um campeão */}
      {isTournamentFinished && champion && (
        <ChampionDisplay champion={champion} resetTournament={resetTournament} />
      )}
    </div>
  );
};

export default ChampionshipManager;