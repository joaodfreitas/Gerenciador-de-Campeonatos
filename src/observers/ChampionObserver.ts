// src/observers/ChampionObserver.ts
export interface Observer {
  update(champion: string): void;
}

export class ChampionNotifier implements Observer {
  update(champion: string) {
    console.log(`🏆 Novo campeão registrado: ${champion}`);
    alert(`🏆 O campeão do torneio é ${champion}!`);
  }
}

export class ChampionSubject {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notify(champion: string) {
    this.observers.forEach((observer) => observer.update(champion));
  }
}