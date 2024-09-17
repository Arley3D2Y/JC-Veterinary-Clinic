import { Customer } from "./customer";

export interface Pet {
    id: number;
    nombre: string;
    sexo: string;
    raza: string;
    fechaNacimiento: string;
    fotoString: string;

    duenho?: Customer;
}