import { Cliente } from "../Cliente/cliente";
import { Tratamiento } from "../Tratamiento/tratamiento";

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