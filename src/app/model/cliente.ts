import { Mascota } from "./mascota";

export interface Cliente {
    id: number;
    nombre: string;
    cedula: string;
    correo: string;
    celular: string;
    direccion: string;
    fotoString: string;

    mascotas?: Mascota[ ];
}