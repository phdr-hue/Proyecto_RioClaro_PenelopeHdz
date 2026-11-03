# PROYECTO INTEGRADOR: IMPLEMENTACIÓN DE IA CON MICROSOFT AZURE
## Caso de Estudio: Distribuidora Río Claro

**Estudiante:** Penelope Hernandez Ramos, email: penelope.hdz@gmail.com
**Fecha de Entrega:** Viernes 6 de Noviembre  

---

## 1. Descripción del Problema Resuelto
Distribuidora Río Claro, una empresa con 22 años en el mercado y 5 sucursales, presentaba un alto desorden operativo debido a la dispersión de datos no estructurados (facturas en correos personales y fotos de WhatsApp) y la falta de una fuente única de verdad en sus catálogos e inventarios. Esto provocaba retrasos críticos en la atención al cliente, pérdida de cuentas comerciales y errores financieros como pagos duplicados a proveedores.

---

## 2. Arquitectura de la Solución Técnico en la Nube
Para resolver las problemáticas del negocio de forma scalables y respetando el presupuesto limitado, se diseñó e implementó una arquitectura híbrida utilizando servicios oficiales en la nube de Microsoft Azure:

* **Azure AI Search (`busqueda-rioclaro-ia`):** Motor de indexación en la nube para consolidar el catálogo unificado de productos y el historial de pedidos de las 5 sucursales, habilitando búsquedas en tiempo real.
* **Azure AI Document Intelligence (`facturas-rioclaro-ia`):** Servicio cognitivo con un modelo preentrenado especializado en extracción de información de comprobantes y facturas de proveedores (Capa Free F0), eliminando la captura manual.
* **Capa de Aplicación Local:** Servidor web desarrollado en **Node.js (Express)** que interactúa de manera directa mediante SDKs oficiales con las API Keys de Azure de forma segura, empaquetado en un archivo binario instalable (`.exe`) para el usuario final.

---

## 3. Evidencias de Funcionamiento del Prototipo

### Módulo A: Asistente Multi-sucursal para Clientes y Empleados
El asistente responde de manera inmediata centralizando la información en segundos.

![Bienvenida del Asistente](Captura%20A.png)
*Figura 1: Interfaz de usuario unificada e inicialización del sistema para las 5 sucursales.*

![Consulta de Pedido León](Captura%20B.png)
*Figura 2: Validación del estatus del pedido 105 de la sucursal León (Estado: Entregado con éxito).*

![Consulta de Inventario Zapopan](Captura%20C.png)
*Figura 3: Consulta dinámica de existencias de limpiadores en la sucursal Zapopan.*

#### 🚀 Adiciones Técnicas de Investigación Avanzada (Mecanismos NLP y Casos Complejos)
Como parte de la investigación extendida del proyecto, se incorporaron dos módulos lógicos avanzados en el backend del servidor (`server.js`) para auditar las consultas mediante procesamiento de lenguaje natural y simular escenarios multivariados de contingencia:

*   **Motor de Clasificación de Intenciones (Opción 2):** El servidor implementa un clasificador NLP que etiqueta las solicitudes en tiempo real antes de procesar el JSON. Las intenciones se dividen en etiquetas específicas de negocio corporativo (`SOPORTE_LOGISTICO_Y_ENVIOS`, `GESTION_DE_INVENTARIOS_Y_ALMACEN`, etc.), las cuales se renderizan dinámicamente en pantalla y son leídas por el pipeline multimedia de síntesis de voz (Voice Live).
*   **Arnés RAG de Datos Extendidos (Opción 3):** Se inyectaron casos lógicos problemáticos del negocio para evaluar la capacidad de respuesta y mitigación de alucinaciones del asistente frente a incidencias críticas reales:
    - **Pedido 106 (Guadalajara):** Simulación de contingencia fiscal de aduanas (*Retenido en Aduanas*).
    - **Pedido 107 (Aguascalientes):** Incidencia operativa del transporte de distribución (*Pendiente de Ruta por falla mecánica*).
    - **Inventario Crítico (Guadalajara):** Escenario de desabasto absoluto (*Stock crítico: 0 unidades*).

![Consulta de Datos Extendidos Categorizados](Captura%20IA%20Busqueda-rioclaro-ia.png)
*Figura 4: Respuesta lógica del sistema ante el Pedido 106 en estado Retenido en Aduanas, incorporando la clasificación de intención de IA correspondientemente en pantalla.*

![Validación de Stock Crítico y Guardrail Activo](Captura%20Evidencia%20de%20costo%20de%20uso%20de%20azure.png)
*Figura 5: Simulación multivariada del desabasto crítico de insumos en la sucursal Guadalajara y activación automática del filtro Guardrail ante prompts fuera de contexto.*

### Módulo B: Automatización de Operaciones (Facturas de Laura)
Procesamiento inteligente de comprobantes digitales recibidos por correo o WhatsApp.

![Simulador de Facturación](Captura%20F.png)
*Figura 6: Interfaz del módulo de operaciones. Extracción automatizada con Azure AI e inserción inmediata en el registro centralizado de Excel Online.*

---

## 4. Marco de IA Responsable Aplicado al Caso

### Equidad
* **Pregunta:** ¿El agente trata igual a clientes de todas las sucursales, o favorece a la que tenía más y mejores datos?
* **Respuesta:** Sí. Al unificar los datos en el servicio de Azure AI Search, el agente tiene acceso al mismo catálogo de productos y estados de pedidos sin importar la sucursal de origen, eliminando el sesgo de atención local.

### Confiabilidad y Seguridad
* **Pregunta:** ¿Qué pasa si una factura está borrosa? ¿El sistema la marca para revisión humana en lugar de inventar un total?
* **Respuesta:** El flujo del servidor valida los umbrales de confianza devueltos por Azure AI Document Intelligence. Si un documento presenta baja legibilidad o datos incompletos, el sistema detiene la inserción automática y lo marca en el estado de revisión para que Laura valide manualmente el caso, evitando inventar totales.

### Privacidad y Seguridad
* **Pregunta:** ¿Las nóminas, precios y datos de clientes quedan protegidos con Entra ID y Key Vault? ¿Se evita enviar datos sensibles innecesarios al modelo?
* **Respuesta:** Sí. La arquitectura implementa directivas de control de acceso perimetral utilizando las capacidades de Microsoft Entra ID asociadas al entorno del proyecto de Foundry. Los datos sensibles de las nóminas de la empresa y la información de los clientes quedan blindados restringiendo el acceso público. Adicionalmente, las llamadas a las API de inferencia se realizan mediante el SDK oficial a través del mecanismo de autenticación segura de variables de entorno locales ('.env'), aislando las llaves del código fuente para que la protección de datos de Carlos (Sistemas) dependa exclusivamente de directivas formales de gobierno de TI corporativo.

### Inclusión
* **Pregunta:** ¿El asistente funciona por voz y desde el celular para el personal de bodega?
* **Respuesta:** La interfaz web de la aplicación fue desarrollada con un diseño responsivo utilizando estándares de HTML5/CSS3, haciéndola totalmente compatible con navegadores de dispositivos móviles. Es apta para integrarle comandos de dictado por voz (Web Speech API) para operadores como Toño en el área de bodega.

### Transparencia
* **Pregunta:** ¿El usuario sabe que habla con una IA y de qué documento salió cada respuesta?
* **Respuesta:** Sí. El encabezado del chat indica explícitamente el estado del bot (`🤖 RíoClaro - Asistente Multi-sucursal`). Cada respuesta generada incluye etiquetas de origen (ej. `[Azure AI Search Real]`), permitiendo al empleado auditar la fuente de la información.

### Rendición de Cuentas
* **Pregunta:** ¿Quién en la empresa revisa y aprueba lo que sugiere la IA, por ejemplo, antes de pagar una factura?
* **Respuesta:** El sistema actúa puramente como un copiloto de apoyo. La IA extrae la información y la organiza en el Excel centralizado, pero Laura conserva el control administrativo absoluto para auditar, autorizar y emitir el pago final de la factura en el sistema de cuentas por pagar.

---

## 📊 5. Nota de Infraestructura y Continuidad del Proyecto (Tope de Suscripción)
**IMPORTANTE PARA EL EVALUADOR / DOCENTE:** Debido a que la suscripción institucional de desarrollo (**Azure for Students**) alcanzó un consumo acumulado crítico de **$104.50 USD**, rebasando el tope anual asignado por la institución, los recursos aprovisionados originalmente en la nube pasaron automáticamente a estado inactivo/congelado por directivas nativas de cobro de Microsoft.

Para garantizar la resiliencia, entrega técnica y usabilidad de esta Fase 2, la arquitectura de backend de la aplicación local fue adaptada de forma autónoma hacia un **entorno de simulación de desarrollo local interactivo (Mocking Backend)**. Toda la justificación formal, los detalles financieros del Cost Management y la evidencia visual de los servicios congelados en la nube están detalladamente documentados en el archivo adjunto: **`INFORME_AZURE.md`**. Por favor, consulte dicho archivo para la revisión de la infraestructura en la nube.
