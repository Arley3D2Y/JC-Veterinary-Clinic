import { Mascota } from "../Mascota/mascota";
import { TratamientoDroga } from "../TratamientoDroga/tratamientoDroga";
import { Veterinario } from "../Veterinario/veterinario";


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