import Image from "next/image";
import styles from "./page.module.css";

import ChampionshipManager from "@/Components/ChampionshipManager"
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <ChampionshipManager />
    </main>
  );
}
