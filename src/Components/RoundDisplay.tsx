import React from 'react';
import Round from './Round'; // Importa o componente Round

// Interface para as props do componente
interface RoundDisplayProps {
  rounds: string[][][];
  roundNames: string[];
  selectedWinners: string[];
  selectWinner: (winner: string, duel: string[]) => void;
}

const RoundDisplay: React.FC<RoundDisplayProps> = ({ rounds, roundNames, selectedWinners, selectWinner }) => {
  // Renderização do componente
  return (
    <div className="mt-8 w-full flex flex-col items-center">
      {/* Mapeia as fases do torneio para criar componentes Round */}
      {rounds.map((round, index) => (
        <Round
          key={index}
          round={round}
          roundName={roundNames[index]}
          selectedWinners={selectedWinners}
          selectWinner={selectWinner}
          isFinal={index === rounds.length - 1}
        />
      ))}
    </div>
  );
};

export default RoundDisplay;