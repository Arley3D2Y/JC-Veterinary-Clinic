import { Pet } from "./pet";

export interface Customer {
    id: number;
    nombre: string;
    cedula: string;
    correo: string;
    celular: string;
    direccion: string;
    fotoString: string;

    mascotas: Pet[ ];
}