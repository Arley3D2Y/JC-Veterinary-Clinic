import { Droga } from "./droga";
import { Mascota } from "./mascota";
import { Veterinario } from "./veterinario";


export interface Tratamiento {
    id: number;
    descripcion: string;
    observaciones: string;
    fechaInicio: Date;
    fechaFin: Date;

    droga?: Droga;
    mascota?: Mascota;
    veterinario?: Veterinario;
}