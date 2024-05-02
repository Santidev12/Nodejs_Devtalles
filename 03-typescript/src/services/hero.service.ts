import { heroes } from "../data/heroes";

export const findheroById = (id: number) => {
    return heroes.find((hero) => hero.id === id);
  };