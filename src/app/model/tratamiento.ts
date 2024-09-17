import { Mascota } from "./mascota";
import { TratamientoDroga } from "./tratamientoDroga";
import { Veterinario } from "./veterinario";


export interface Tratamiento {
    id: number;
    descripcion: string;
    observaciones: string;
    fechaInicio: Date;
    fechaFin: Date;
    veterinario: Veterinario;
    tratamientoDroga: TratamientoDroga[];
    mascota: Mascota;
}