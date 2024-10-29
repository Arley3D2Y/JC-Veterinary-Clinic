import { Cliente } from './cliente';
import { Enfermedad } from './enfermedad';
import { Estado } from './estado';
import { Tratamiento } from './tratamiento';

export interface Mascota {
    id: number;
    nombre: string;
    edad: string;
    raza: string;
    peso: string;
    sexo: string;

    fotoString: string;

    enfermedad: Enfermedad;
    estado: Estado;

    tratamientos?: Tratamiento[];
    cliente?: Cliente;
}