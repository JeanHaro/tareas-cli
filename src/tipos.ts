// Enumeraciones
export enum Estado {
    Pendiente = 1,
    EnProceso,
    Completada
}

export enum Prioridad {
    Alta = 'Alta',
    Media = 'Media',
    Baja = 'Baja'
}

// Type Alias para Tuples, porque las tareas serán de tipo tuple
export type Tarea = [
    id: number, 
    nombre: string, 
    estado: Estado, 
    prioridad: Prioridad
]

export interface TareaJson {
    id: number;
    nombre: string;
    estado: string;
    prioridad: Prioridad;
}