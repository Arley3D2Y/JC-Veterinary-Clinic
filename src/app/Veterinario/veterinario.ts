import { Especialidad } from "../Especialidad/especialidad";
import { Tratamiento } from "../Tratamiento/tratamiento";

export interface Veterinario {
    id: number;
    nombre: string;
    cedula: string;
    correo: string;
    password: string;
    fotoString: string;
    especialidades: Especialidad[];
    tratamietos: Tratamiento[];
}