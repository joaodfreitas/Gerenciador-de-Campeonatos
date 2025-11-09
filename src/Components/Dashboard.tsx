"use client";

import React, { useEffect, useState } from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { ChampionshipFactory } from "../factories/ChampionshipFactory"


interface DashboardProps {
  user: User;
  onSelectManager: (championshipId?: string) => void;
}

interface Championship {
  id: string;
  name: string;
  date: string;
  isEditing?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectManager }) => {
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  // Carregar campeonatos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("championships");
    if (saved) setChampionships(JSON.parse(saved));
  }, []);

  // Salvar campeonatos no localStorage ao atualizar
  useEffect(() => {
    localStorage.setItem("championships", JSON.stringify(championships));
  }, [championships]);

  const handleCreateChampionship = () => {
  if (!name.trim()) return;
  const newChampionship = ChampionshipFactory.create(name, date);
  setChampionships((prev) => [...prev, newChampionship]);
  setName("");
  setDate("");
};

  const handleDeleteChampionship = (id: string) => {
    if (confirm("Deseja realmente excluir este campeonato?")) {
      setChampionships((prev) => prev.filter((champ) => champ.id !== id));
    }
  };

  const toggleEdit = (id: string) => {
    setChampionships((prev) =>
      prev.map((champ) =>
        champ.id === id ? { ...champ, isEditing: !champ.isEditing } : champ
      )
    );
  };

  const handleChangeChamp = (
    id: string,
    field: "name" | "date",
    value: string
  ) => {
    setChampionships((prev) =>
      prev.map((champ) =>
        champ.id === id ? { ...champ, [field]: value } : champ
      )
    );
  };

  const handleSaveEdit = (id: string) => {
    setChampionships((prev) =>
      prev.map((champ) =>
        champ.id === id ? { ...champ, isEditing: false } : champ
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">Olá, {user.displayName || user.email}</h1>
          <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
            Gerencie seus campeonatos
          </p>
        </div>

        {/* Formulário para criar campeonato */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold">Criar Novo Campeonato</h2>
          <input
            type="text"
            placeholder="Nome do Campeonato"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleCreateChampionship}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors"
          >
            Criar Campeonato
          </button>
        </div>

        {/* Lista de campeonatos */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Seus Campeonatos</h2>
          {championships.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">Nenhum campeonato criado ainda.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {championships.map((champ) => (
                <div
                  key={champ.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
                >
                  {/* Se estiver editando */}
                  {champ.isEditing ? (
                    <>
                      <input
                        type="text"
                        value={champ.name}
                        onChange={(e) => handleChangeChamp(champ.id, "name", e.target.value)}
                        className="mb-2 p-1 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="date"
                        value={champ.date}
                        onChange={(e) => handleChangeChamp(champ.id, "date", e.target.value)}
                        className="mb-2 p-1 rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleSaveEdit(champ.id)}
                          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white font-semibold"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => toggleEdit(champ.id)}
                          className="bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded text-white font-semibold"
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold">{champ.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-2">
                        Data: {champ.date || "Não informada"}
                      </p>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => onSelectManager(champ.id)}
                          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white font-semibold"
                          title="Abrir Campeonato"
                        >
                          Abrir
                        </button>
                        <button
                          onClick={() => toggleEdit(champ.id)}
                          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white font-semibold"
                          title="Editar Campeonato"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteChampionship(champ.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white font-semibold"
                          title="Excluir Campeonato"
                        >
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ações gerais */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => onSelectManager()}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
          >
            Gerenciar Campeonato (Novo)
          </button>
          <button
            onClick={() => signOut(auth)}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
