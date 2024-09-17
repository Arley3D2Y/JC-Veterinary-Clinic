import { Veterinario } from "../Veterinario/veterinario";

export interface Especialidad{
    id: number;
    nombreEspecialidad: string;
    veterinarios: Veterinario[];
}
