import { Cliente } from "./cliente";
import { Tratamiento } from "./tratamiento";
export interface Mascota {
    id: number;
    nombre: string;
    sexo: string;
    raza: string;
    fechaNacimiento: Date;
    fotoString: string;
    tratamientos: Tratamiento[];
    cliente: Cliente;
}