export interface Championship {
  id: string;
  name: string;
  date: string;
}

export class ChampionshipFactory {
  static create(name: string, date: string): Championship {
    return {
      id: Date.now().toString(),
      name,
      date,
    };
  }
}