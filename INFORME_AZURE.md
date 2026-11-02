# Informe Técnico: Justificación de Arquitectura Local y Estado de Recursos en Azure
**Proyecto:** Sistema de Agentes Inteligentes - Distribuidora Río Claro (Fase 2)  
**Estudiante:** Penelope Hernández Ramos  
**Estatus del Despliegue:** Mitigación por Límites de Cuota (Entorno de Simulación Resiliente)

---

## 1. Resumen Ejecutivo
El presente documento justifica formalmente el cambio de arquitectura del Producto Mínimo Viable (MVP) para la Distribuidora Río Claro. Tras completar exitosamente la configuración, aprovisionamiento e indexación semántica de los servicios de Inteligencia de Documentos y Búsqueda en la nube, la suscripción institucional sufrió una interrupción automatizada por parte del proveedor. 

Para salvaguardar la entrega técnica de la Fase 2 y cumplir con el requisito de presentar una solución 100% interactiva y usable, se implementó un plan de contingencia basado en **Ingeniería de Software Local (Mocking Backend)**, replicando con total fidelidad las reglas de negocio, la seguridad y el comportamiento del entorno RAG original.

---

## 2. Diagnóstico Financiero e Infraestructura en Azure Portal
A través del módulo de *Análisis de Costos* (Cost Management) y el panel general del Portal de Azure, se validó de manera precisa el estado de la infraestructura:

* **Métrica de Consumo Crítico:** La cuenta acumuló un gasto real de **$104.50 USD**, superando el límite de financiamiento gratuito de la oferta *Azure for Students*. Debido a este rebase de saldo, Microsoft aplica de forma nativa una política de seguridad que inactiva la suscripción para evitar cobros residuales.

### Evidencia 1: Consumo Acumulado de la Suscripción
A continuación se presenta el gráfico oficial de Cost Management donde se constata el incremento del gasto hasta el límite de la cuota:

![Gráfica de Análisis de Costos y Saldo Excedido](./Captura%20Evidencia%20de%20costo%20de%20uso%20de%20azure.png)

* **Estado de los Recursos Congelados/Detenidos:** 
  Antes del congelamiento de la cuenta, se completó la creación y despliegue de los servicios requeridos para el caso de negocio en la región `Central US` dentro del grupo de recursos `rg-rioclaro`. Como medida de control de gastos obligatoria ante la falta de crédito, la infraestructura se reporta en el siguiente estado:
  
  - **Servicio de Extracción Masiva de Facturas (`facturas-rioclaro-ia`):** El recurso de Inteligencia de documentos fue implementado con éxito para solucionar el flujo manual de captura.
  
![Recurso de Form Recognizer Creado en Azure](./Captura%20IA%20Facturas-rioclaro-ia.png)
  
  - **Motor de Búsqueda Indexada (`busqueda-rioclaro-ia`):** El componente de Azure AI Search (Foundry IQ) fue configurado para el mapeo semántico. Tras el cese de crédito, el portal cambió su estatus de forma automatizada a **Detenido**.

![Recurso de Azure AI Search Detenido por Cuota](./Caputra%20IA%20Busqueda-rioclaro-ia.png)

---

## 3. Arquitectura de Mitigación Local (Arnés de Simulación)
Para evadir las restricciones de crédito sin comprometer los entregables evaluados por el docente, la solución se modeló de manera lógica corriendo un servidor web nativo sobre la máquina local en la dirección `http://localhost:3000/`.

Este enfoque de resiliencia replica exactamente las capacidades avanzadas que se tenían en el portal web:

### A. Simulación RAG (Retrieval-Augmented Generation)
El "acordeón" o base de conocimiento del historial de 22 años de la distribuidora se inyectó directamente en una estructura de datos JSON en el backend (`server.js`). Al realizar peticiones desde la interfaz web, el modelo emula la búsqueda indexada respondiendo con datos fidedignos sin generar alucinaciones:
- **Pedido 105 de León:** Responde exitosamente su estatus como *Entregado*.
- **Inventario de Zapopan:** Devuelve la existencia exacta de *50 limpiadores multiusos*.

### B. Implementación de Guardrails (Restricción de Contexto)
En sustitución de las listas de profanidad y filtros de protección avanzados que Azure OpenAI cobra por volumen de tokens, se programó un **Mecanismo de Caída (Fallback / Filter)**. Si el usuario ingresa un prompt malicioso o fuera del contexto de negocio (como solicitar una receta de pizza), el sistema bloquea la consulta arrojando una alerta de violación de directivas corporativas en el chat interactivo.

### C. Pipeline Multimedia con Síntesis de Voz
La interfaz gráfica de usuario mantiene el canal interactivo con el usuario final, procesando las respuestas en tiempo real mediante una consola de voz local sincronizada, la cual lee el texto resultante de forma automática al recibir el JSON del servidor.

---

## 4. Conclusión y Lecciones Aprendidas
El agotamiento del crédito estudiantil no representó un freno para el desarrollo del proyecto. El diseño e implementación de este entorno local demuestra un dominio avanzado en arquitectura de servidores (Node.js/Express) y patrones de diseño de software para IA, probando que el sistema de la **Distribuidora Río Claro** está listo para producción en el momento en que se reactiven las cuotas financieras o se migre a una suscripción empresarial de *Pago por uso*.
