import { Especialidad } from "./especialidad";
import { Tratamiento } from "./tratamiento";

export interface Veterinario {
    id: number;
    nombre: string;
    cedula: string;
    correo: string;
    password: string;
    fotoString: string;
    especialidades: Especialidad;
    tratamietos: Tratamiento[];
}