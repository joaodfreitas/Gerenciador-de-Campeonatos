// src/strategies/WinnerStrategy.ts
export interface WinnerStrategy {
  selectWinner(duel: string[]): string;
}

// Estratégia manual (usuário escolhe)
export class ManualWinnerStrategy implements WinnerStrategy {
  selectWinner(duel: string[]): string {
    return duel[0]; // placeholder (será sobrescrito na escolha manual)
  }
}

// Estratégia aleatória
export class RandomWinnerStrategy implements WinnerStrategy {
  selectWinner(duel: string[]): string {
    const randomIndex = Math.floor(Math.random() * duel.length);
    return duel[randomIndex];
  }
}