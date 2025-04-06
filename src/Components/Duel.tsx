import React from 'react';

// Interface para as props do componente
interface DuelProps {
  duel: string[];
  selectedWinners: string[];
  selectWinner: (winner: string, duel: string[]) => void;
}

const Duel: React.FC<DuelProps> = ({ duel, selectedWinners, selectWinner }) => {
  // Renderização do componente
  return (
    <div className="flex flex-col items-center border p-6 rounded-xl bg-gray-800 border-gray-700 shadow-md">
      {/* Mapeia os times do duelo para criar botões */}
      {duel.map((team, j) => (
        <button
          key={j}
          className={`w-48 px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm text-white mb-3 ${
            selectedWinners.includes(team)
              ? "bg-green-600 hover:bg-green-500"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
          // Seleciona o vencedor do duelo ao clicar no botão
          onClick={() => selectWinner(team, duel)}
        >
          {team}
        </button>
      ))}
    </div>
  );
};

export default Duel;