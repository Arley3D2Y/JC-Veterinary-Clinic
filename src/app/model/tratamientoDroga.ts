import { Droga } from "./droga";
import { Tratamiento } from "./tratamiento";

export interface TratamientoDroga {
    id: number;
    tratamiento: Tratamiento;
    droga: Droga;
    unidadesVendiadas: number;
}