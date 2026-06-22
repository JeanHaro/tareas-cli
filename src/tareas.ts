// Tipos
import { Estado, Prioridad, Tarea, TareaJson } from './tipos';

import * as fs from 'fs';
import * as path from 'path';

// Definimos la ruta de nuestro archivo JSON (donde se guardarán las tareas)
const tareaJson = path.join(
    __dirname, 
    '../tareas.json'
);

const guardarTarea = ( tareas: Tarea[] ): void => {
    const tareasParaGuardar: TareaJson[] = tareas.map( tarea => {
        return {
            'id': tarea[0],           
            'nombre': tarea[1],       
            'estado': Estado[Number(tarea[2])], 
            'prioridad': tarea[3]
        };
    });

    fs.writeFileSync(
        tareaJson, 
        JSON.stringify(tareasParaGuardar, null, 2), 
        'utf-8'
    );
}

// El array que acumula nuestras tareas
const tareas: Tarea[] = [];
let cargoTareas: boolean = false; 

export const cargarTareas = (): Tarea[] => {
    // Si existe la carpeta
    if (fs.existsSync(tareaJson)) {
        const data = fs.readFileSync(tareaJson, 'utf-8');

        // Si el archivo no está vacío, carga las tareas
        if (data.trim().length !== 0) {
            cargoTareas = true;
            const tareasObj: TareaJson[] = JSON.parse(data);

            tareasObj.map( item => {
                return tareas.push([
                    item.id, 
                    item.nombre,
                    Estado[item.estado as keyof typeof Estado], 
                    item.prioridad
                ] as Tarea);
            })
        }

        return tareas;
    }

    return tareas;
}

export const crearTarea = (nombre: string, prioridad: Prioridad): void => {
    const nextId = tareas.length === 0 ? 1 : Math.max(...tareas.map( r => r[0] )) + 1;

    const tarea: Tarea = [
        nextId, 
        nombre, 
        Estado.Pendiente, 
        prioridad
    ];

    tareas.push(tarea);
    guardarTarea(tareas);
} 

export const listarTareas = (): void => { 
    (tareas.length === 0) 
        ? console.log('No hay tareas registradas')
        : console.table(
            tareas.map( ([id, nombre, estado, prioridad]) => ({
                ID: id,
                Tarea: nombre,
                Estado: Estado[estado],
                Prioridad: prioridad
            }))
        );
}

export const completarTarea = ( id: number ): void => {
    // Buscar el id
    const tareaEncontrada = tareas.find( tarea => tarea[0] === id );

    if (tareaEncontrada) {
        tareaEncontrada[2] = Estado.Completada;
        guardarTarea(tareas);

        console.table({
            ID: tareaEncontrada[0],
            Tarea: tareaEncontrada[1],
            Estado: Estado[tareaEncontrada[2]],
            Prioridad: tareaEncontrada[3]
        });

        return;
    }
    
    console.log('Tarea no encontrada')
}

export const opcionInvalida = ( opcion: string ): never => {
    throw new Error(`Opción no válida: [${opcion}]`)
}