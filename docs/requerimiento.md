# Desarrollo de API GraphQL con Yoga-Graphql, Fastify y Prisma

## 🎯 Objetivo General

Desarrollar una API GraphQL robusta, escalable y segura utilizando el stack especificado, siguiendo las mejores prácticas de la industria y garantizando un entorno de desarrollo profesional.

## 🛠 Stack Tecnológico

- **Runtime**: Node.js (Investigar versión LTS recomendada para estas dependencias)
- **Manager de paquetes**: pnpm
- **Servidor HTTP**: Fastify
- **GraphQL Engine**: Yoga-Graphql con subcripción y subida de archivos
- **GraphQL Schema**: Code-first
- **ORM**: Prisma (Configurado para **PostgreSQL**)
- **Lenguaje**: TypeScript (Configuración estricta)
- **Validación**: Zod
- **Eslint**: Eslint con configuración para TypeScript y Prettier.
- **Formateo**: Prettier para consistencia de estilo.
- **Entorno de Desarrollo**: Hot Reload (Recarga en caliente).

---

## 🔍 Fase 1: Investigación y Configuración (Mandatorio)

**1. Investigación Profunda centrada en el Entorno de Desarrollo:**
Antes de generar código, el agente **DEBE** realizar una investigación profunda y exhaustiva en documentación oficial, páginas web y foros de alta relevancia. **Toda la investigación debe basarse estrictamente en encontrar las configuraciones óptimas para el entorno de desarrollo**. El enfoque debe ser:

- **Entorno de Desarrollo**: Cuáles son las mejores dependencias y configuraciones para el entorno.
- **Configuración de Fastify**: Identificar la forma más óptima de configurar `Fastify` con `yoga-graphql`, teniendo en cuenta:
  - Cors
  - Rate Limit
  - Helmet
  - CSRF Protection
  - Logger
  - Suscripción
  - Subida de archivos
  - Hot Reload
- **Seguridad**: Cuáles son las mejores prácticas para manejar la seguridad de `Fastify` y `yoga-graphql`.
- **Arquitectura de Carpetas**: Determinar la estructura más moderna y escalable (e.g., Clean Architecture, Modular).
- **Prisma + PostgreSQL**: Investigar la configuración óptima basándose en la última versión oficial, enfocada específicamente en el entorno de desarrollo.

**2. Entregable de la Fase 1 (Plan de Implementación):**
Al finalizar la investigación, el agente debe detenerse y entregar un plan de implementación detallado en base a los resultados de la investigación.

---
