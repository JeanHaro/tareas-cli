// Importamos readline para manejar la entrada y salida por consola
import * as readline from 'readline';

// Tipos
import { Prioridad } from './tipos';

// Funciones
import { 
    cargarTareas,
    crearTarea, 
    listarTareas, 
    completarTarea, 
    opcionInvalida 
} from './tareas';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Helper para no repetir r1.question en cada paso
const preguntar = ( texto: string ): Promise<string> => {
    return new Promise( resolve => rl.question(texto, resolve));
}

const main = async (): Promise<void> => {
    cargarTareas();
    console.log('\n=== GESTOR DE TAREAS ===\n');

    let continuar: boolean = true;

    while (continuar) {
        console.log(`
            \n[1] Crear tarea
            \n[2] Listar tareas
            \n[3] Completar tarea
            \n[4] Salir
        `);

        const opcion = await preguntar(`Selecciona una opción: `);

        try {
            switch (opcion.trim()) {
                case '1':
                    const nombre = await preguntar('Nombre de la tarea: ');
                    

                    const prioridad_digito = await preguntar(`
                        \n¿Cuál es la prioridad?
                        \n[1] Alta
                        \n[2] Media
                        \n[3] Baja
                    `)
                    
                    let prioridad!: Prioridad;
                    if (prioridad_digito === '1' )      prioridad = Prioridad.Alta;
                    else if (prioridad_digito === '2' ) prioridad = Prioridad.Media;
                    else if (prioridad_digito === '3' ) prioridad = Prioridad.Baja;
                    else opcionInvalida(prioridad_digito.trim());
                    
                    crearTarea(nombre, prioridad);
                    break;
                case '2': 
                    listarTareas();
                    break;
                case '3':
                    const idStr = await preguntar('¿Cuál es el ID?');
                    const id = Number(idStr);
                    if (isNaN(id)) throw new Error('El ID debe ser un número')
                    completarTarea(id);
                    break;
                case '4':
                    continuar = false;
                    rl.close();
                    break;
                default:
                    opcionInvalida(opcion.trim());
                    break;
            }
        } catch (error) {
            if (error instanceof Error) console.log(`${error.message}`);
        }
    }
};

main();