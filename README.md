# Gestor de Tareas CLI

CLI interactivo para gestión de tareas con persistencia en disco.  
Proyecto de práctica para los **Tipos Básicos en TypeScript**.

---

## Estructura del proyecto

```
src/
├── tipos.ts      ← Enums, type Tarea (tupla), interface TareaJson
├── tareas.ts     ← Lógica de negocio + lectura/escritura JSON
├── index.ts      ← CLI interactivo con readline
└── tareas.json   ← Base de datos en disco
```

---

## Cómo ejecutar


```bash
pnpm start
```

---

## Conceptos TypeScript practicados

| Concepto | Dónde se usa |
|---|---|
| `enum` numérico | `Estado` (Pendiente=1, EnProceso, Completada) |
| `enum` de string | `Prioridad` (Alta, Media, Baja) |
| Tuplas (`type Tarea`) | `[id, nombre, estado, prioridad]` |
| `interface` | `TareaJson` para serialización JSON |
| `async/await` | Flujo del CLI con readline |
| `never` | `opcionInvalida()` — función que siempre lanza error |
| `Math.max` con spread | Generación de IDs sin colisión |

---

## Opciones del menú

```
[1] Crear tarea    → pide nombre y prioridad (Alta / Media / Baja)
[2] Listar tareas  → muestra tabla con todas las tareas
[3] Completar tarea → pide ID y cambia estado a "Completada"
[4] Salir
```

---

## Notas técnicas

- **Persistencia en disco** — `tareas.json` sobrevive al reinicio
- **Tuplas** — cada tarea es `[id, nombre, estado, prioridad]`
- **Serialización** — al guardar, el enum numérico se convierte a string legible (`Estado[2]` → `"EnProceso"`)
- **IDs sin colisión** — generados con `Math.max` sobre ids existentes
- Las tareas nuevas siempre inician con estado `Pendiente`