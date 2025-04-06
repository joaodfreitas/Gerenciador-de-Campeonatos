import React from 'react';

// Interface para as props do componente
interface ChampionDisplayProps {
  champion: string | null;
  resetTournament: () => void;
}

const ChampionDisplay: React.FC<ChampionDisplayProps> = ({ champion, resetTournament }) => {
  // Renderização do componente
  return (
    <div className="mt-8 w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg text-center border border-gray-700 mx-auto">
      {/* Exibe o nome do campeão se houver um */}
      {champion && (
        <h2 className="text-3xl font-extrabold text-yellow-500 mb-4">{champion} é o campeão!</h2>
      )}
      <div className="flex justify-center">
        {/* Botão para reiniciar o torneio */}
        <button
          onClick={resetTournament}
          className="mt-6 px-8 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
        >
          Novo Torneio
        </button>
      </div>
    </div>
  );
};

export default ChampionDisplay;