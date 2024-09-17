import { TratamientoDroga } from "../TratamientoDroga/tratamientoDroga";

export interface Droga{
    id: number;
    nombre: string;
    precioCompra: number;
    precioVenta: number;
    unidadesDisponibles: number;
    UnidadesVendidas: number;
    tratamientoDroga: TratamientoDroga[];
}