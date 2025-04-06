import React from 'react';

// Interface para as props do componente
interface TournamentControlsProps {
  advanceRound: () => void;
}

const TournamentControls: React.FC<TournamentControlsProps> = ({ advanceRound }) => {
  // Renderização do componente
  return (
    <button
      className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
      onClick={advanceRound}
    >
      Avançar para a Próxima Fase
    </button>
  );
};

export default TournamentControls;