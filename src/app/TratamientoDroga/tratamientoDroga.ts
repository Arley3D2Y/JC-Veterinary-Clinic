import { Droga } from "../Droga/droga";
import { Tratamiento } from "../Tratamiento/tratamiento";

export interface TratamientoDroga {
    id: number;
    tratamiento: Tratamiento;
    droga: Droga;
    unidadesVendiadas: number;
}