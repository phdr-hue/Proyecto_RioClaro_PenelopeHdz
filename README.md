# Asistente Virtual Inteligente - Distribuidora Río Claro (Fase 2)

Este repositorio contiene el Producto Mínimo Viable (MVP) del asistente virtual interactivo diseñado para optimizar el soporte unificado en las 5 sucursales de la **Distribuidora Río Claro**.

## 📊 Nota de Infraestructura y Resiliencia del Proyecto
Debido a que la suscripción institucional de desarrollo (**Azure for Students**) alcanzó un consumo crítico de **\$104.50 USD**, superando el tope de financiamiento asignado, los recursos aprovisionados en la nube pasaron automáticamente a estado inactivo en el Portal de Azure.

Para garantizar la entrega técnica de la Fase 2, la arquitectura fue adaptada de forma resiliente hacia un **entorno de simulación de desarrollo local (Mocking Backend)** basado en Node.js y Express. El informe detallado y las evidencias de la infraestructura en la nube se encuentran documentados en el archivo adjunto: `INFORME_AZURE.md`.

## 🛠️ Requisitos de Instalación Local
Para levantar y probar la simulación interactiva en su computadora, asegúrese de contar con [Node.js](https://nodejs.org) instalado y ejecute en su terminal:

1. Instale la librería del servidor web:
   ```bash
   npm install express
   ```

2. Ejecute el comando de encendido del servidor:
   ```bash
   node server.js
   ```

3. Abra su navegador (Chrome/Edge) e ingrese a la siguiente dirección URL local:
   ```text
   http://localhost:3000/
   ```

## 🧪 Pruebas de Validación del Agente
- **Prueba RAG de Pedidos:** Escriba `¿Cómo va el pedido 105?` (El bot extraerá del índice local que está *Entregado con éxito en León*).
- **Prueba RAG de Inventario:** Escriba `Inventario de Zapopan` (El bot extraerá del stock local que quedan *50 limpiadores*).
- **Prueba de Guardrail (Filtro de Seguridad):** Escriba cualquier frase fuera del negocio como `Receta de pizza`. El bot disparará la advertencia automática de restricción de contexto.
