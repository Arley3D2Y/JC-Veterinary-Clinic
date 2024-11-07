import { Cliente } from './cliente';
import { Enfermedad } from './enfermedad';
import { Tratamiento } from './tratamiento';
import { EstadoSalud } from './estadoSalud';

export interface Mascota {
    id: number;
    nombre: string;
    edad: string;
    raza: string;
    peso: string;
    sexo: string;

    fotoString: string;

    enfermedad: Enfermedad;
    estado: EstadoSalud;

    tratamientos?: Tratamiento[];
    cliente?: Cliente;
}