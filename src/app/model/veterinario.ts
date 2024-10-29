import { Especialidad } from "./especialidad";
import { Tratamiento } from "./tratamiento";

export interface Veterinario {
    id: number;
    cedula: string;
    password: string;
    nombre: string;
    correo: string;
    fotoString: string;
    cantidadAtenciones: number;
    estado: boolean;

    especialidad?: Especialidad;
    tratamietos?: Tratamiento[];
}