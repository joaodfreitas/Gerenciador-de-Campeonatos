"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import LoginPage from "../Components/LoginPage";
import Dashboard from "@/Components/Dashboard";
import ChampionshipManager from "@/Components/ChampionshipManager";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [viewManager, setViewManager] = useState(false);
  const [selectedChampionshipId, setSelectedChampionshipId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <LoginPage />;

if (viewManager)
  return (
    <ChampionshipManager
      onBackToDashboard={() => {
        setViewManager(false);
        setSelectedChampionshipId(null);
      }}
      championshipId={selectedChampionshipId ?? undefined}
    />
  );


return (
  <Dashboard
    user={user}
    onSelectManager={(championshipId) => {
      setSelectedChampionshipId(championshipId ?? null);
      setViewManager(true);
    }}
  />
);
}

