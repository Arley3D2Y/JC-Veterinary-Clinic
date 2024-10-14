import { Tratamiento } from "./tratamiento";

export interface Droga{
    id: number;
    nombre: string;
    precioCompra: number;
    precioVenta: number;
    unidadesDisponibles: number;
    UnidadesVendidas: number;
    tratamientos?: Tratamiento[];
}