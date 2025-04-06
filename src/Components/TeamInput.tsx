import React from 'react';

// Interface para as props do componente
interface TeamInputProps {
  teams: string[];
  setTeams: React.Dispatch<React.SetStateAction<string[]>>;
}

const TeamInput: React.FC<TeamInputProps> = ({ teams, setTeams }) => {
  // Renderização do componente
  return (
    <div>
      <h2 className="text-lg mb-4">Insira os nomes dos 16 times:</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Mapeia os nomes dos times para criar inputs */}
        {teams.map((team, index) => (
          <input
            key={index}
            type="text"
            className="p-2 border border-gray-300 rounded"
            value={team}
            // Atualiza o estado teams com o nome do time digitado
            onChange={(e) => {
              const updatedTeams = [...teams];
              updatedTeams[index] = e.target.value;
              setTeams(updatedTeams);
            }}
            placeholder={`Time ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamInput;