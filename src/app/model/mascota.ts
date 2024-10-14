import { Cliente } from "./cliente";
import { Tratamiento } from "./tratamiento";

export interface Mascota {
    id: number;
    nombre: string;
    edad: string;
    peso: string;
    estado: string;
    enfermedad: string;
    sexo: string;
    raza: string;
    fotoString: string;
    tratamientos?: Tratamiento[];
    cliente?: Cliente;
}