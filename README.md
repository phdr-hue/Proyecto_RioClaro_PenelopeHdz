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

### 🔹 Opción 1: Consultas RAG Básicas y Seguridad
* **Prueba RAG de Pedidos:** Escriba `¿Cómo va el pedido 105?` (El bot extraerá del índice local que está *Entregado con éxito en León*).
* **Prueba RAG de Inventario:** Escriba `Inventario de Zapopan` (El bot extraerá del stock local que quedan *50 limpiadores*).
* **Prueba de Guardrail (Filtro de Seguridad):** Escriba cualquier frase fuera del negocio como `arroz` o `Receta de pizza`. El bot disparará la restricción de contexto devolviendo textualmente:
  > ⚠️ **[Restricción de Contexto / Guardrail Activo]:** Lo siento, soy un asistente especializado exclusivamente en la operación empresarial de Distribuidora Río Claro. No tengo autorización para responder preguntas ajenas a logística o almacén (Clasificación rechazada: FUERA_DE_CONTEXTO_DETECTADO). Por favor, realiza una consulta corporativa válida.

### 🔹 Opción 2: Gestión de Flujos Avanzados e Interacción
* **Prueba de Intención de Compra / Alta:** Escriba o seleccione la opción para iniciar un nuevo pedido o dar de alta un cliente. El asistente desplegará el flujo guiado interactivo solicitando los datos obligatorios de la sucursal.
* **Prueba de Soporte Técnico Humano:** Solicite hablar con un agente o escribe `soporte técnico`. El bot simulará la transferencia de la sesión y el guardado del historial de la conversación para la sucursal correspondiente.

### 🔹 Opción 3: Consultas Multisucursal y Consolidación de Datos
* **Prueba de Reporte Consolidado:** Solicite un balance global o escribe `Estado general de sucursales`. El bot procesará de forma simulada la unión de los micro-índices de las 5 sucursales (León, Zapopan, etc.) para entregar una respuesta unificada de disponibilidad.

### ⚠️ Pruebas de Manejo de Errores y Excepciones
* **Prueba de Caída de Servicio Simulado (Timeout / Fallback):** Intente ingresar un ID de pedido inexistente o fuerce una consulta vacía. El bot demostrará su lógica de resiliencia devolviendo un mensaje controlado de error (*"Servicio temporalmente en mantenimiento local, intente más tarde"*) en lugar de romper la ejecución del servidor web, garantizando la continuidad de la interfaz de usuario.
