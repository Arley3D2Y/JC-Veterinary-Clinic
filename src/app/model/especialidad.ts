import { Veterinario } from "./veterinario";


export interface Especialidad{
    id: number;
    nombreEspecialidad: string;
    veterinarios: Veterinario[];
}
