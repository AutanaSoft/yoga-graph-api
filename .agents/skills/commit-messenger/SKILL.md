---
name: commit-messenger
description: Genera mensajes de commit que sigan "Conventional Commits" y las reglas de commitlint de este proyecto. Úsalo cuando el usuario solicite "generar", "hacer" o "crear un mensaje de commit".
---

# Commit Messenger

Esta skill automatiza la generación de mensajes de commit para Git, asegurando que sigan el estándar de "Conventional Commits" del proyecto.

## Reglas Obligatorias

- El `scope` **debe ser obligatorio**. Debe describir el módulo, componente o paquete afectado (ej. `ui`, `api`, `auth`, `config`). Si no es claro, infiere uno conciso a partir de los archivos en `staged`.
- La longitud total de la primera línea (header) **no debe exceder los 100 caracteres**.
- Todas las líneas subsiguientes (body, footer) tampoco deben exceder los 100 caracteres por línea.
- Sigue el formato: `tipo(scope): descripción`.

## Tipos Disponibles

- `feat`: Una nueva característica.
- `fix`: Corrección de un error (bug).
- `docs`: Cambios exclusivos en la documentación.
- `style`: Cambios que no afectan el significado del código (espacios, formato, etc.).
- `refactor`: Un cambio de código que ni corrige un error ni añade una característica.
- `perf`: Un cambio de código que mejora el rendimiento.
- `test`: Añadir pruebas faltantes o corregir pruebas existentes.
- `build`: Cambios que afectan el sistema de construcción o dependencias externas.
- `ci`: Cambios en nuestros archivos y scripts de configuración de CI/CD.
- `chore`: Otros cambios que no modifican los archivos de origen (`src`) o pruebas.
- `revert`: Revierte un commit anterior.

## Flujo de Trabajo (Workflow)

1. Cuando se active la skill, ejecuta `git status` para ver los archivos modificados.
2. Ejecuta `git diff` (y `git diff --staged` si aplica) para analizar exactamente qué líneas cambiaron. **Nunca adivines el contenido del commit**.
3. Determina el `tipo` y `scope` más apropiados.
4. Escribe una descripción clara y breve en inglés (a menos que se te pida lo contrario, por convención de programación).
5. Si es necesario, proporciona un cuerpo (`body`) o pie (`footer`) para cambios importantes (breaking changes) o contexto detallado.
6. El output final debe ser estrictamente el mensaje de commit sugerido. No ejecutes git commit por cuenta propia a no ser que el usuario te lo instruya explícitamente.
