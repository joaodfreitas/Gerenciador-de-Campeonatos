import React from 'react';
import Duel from './Duel'; // Importa o componente Duel

// Interface para as props do componente
interface RoundProps {
  round: string[][];
  roundName: string;
  selectedWinners: string[];
  selectWinner: (winner: string, duel: string[]) => void;
  isFinal: boolean;
}

const Round: React.FC<RoundProps> = ({ round, roundName, selectedWinners, selectWinner, isFinal }) => {
  // Renderização do componente
  return (
    <div className="flex flex-col items-center mb-10">
      {/* Exibe o nome da fase */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-300">{roundName}</h2>
      {/* Exibe os duelos da fase */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isFinal ? 'mx-auto w-fit' : ''}`}>
        {/* Mapeia os duelos para criar componentes Duel */}
        {round.map((duel, i) => (
          <Duel key={i} duel={duel} selectedWinners={selectedWinners} selectWinner={selectWinner} />
        ))}
      </div>
    </div>
  );
};

export default Round;