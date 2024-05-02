import { findheroById } from "./services/hero.service";


const hero = findheroById(1);

console.log(hero?.name ?? "Not found");
