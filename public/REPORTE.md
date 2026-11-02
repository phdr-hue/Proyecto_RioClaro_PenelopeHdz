# PROYECTO INTEGRADOR: IMPLEMENTACIÓN DE IA CON MICROSOFT AZURE
## Caso de Estudio: Distribuidora Río Claro

**Estudiante:** Penelope Hernandez Ramos, email: penelope.hdz@gmail.com
**Fecha de Entrega:** Viernes 6 de Noviembre  

---

## 1. Descripción del Problema Resuelto
Distribuidora Río Claro, una empresa con 22 años en el mercado y 5 sucursales, presentaba un alto desorden operativo debido a la dispersión de datos no estructurados (facturas en correos personales y fotos de WhatsApp) y la falta de una fuente única de verdad en sus catálogos e inventarios. Esto provocaba retrasos críticos en la atención al cliente, pérdida de cuentas comerciales y errores financieros como pagos duplicados a proveedores.

---

## 2. Arquitectura de la Solución Técnica en la Nube
Para resolver las problemáticas del negocio de forma escalable y respetando el presupuesto limitado, se diseñó e implementó una arquitectura híbrida utilizando servicios oficiales en la nube de Microsoft Azure:

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

### Módulo B: Automatización de Operaciones (Facturas de Laura)
Procesamiento inteligente de comprobantes digitales recibidos por correo o WhatsApp.

![Simulador de Facturación](Captura%20F.png)
*Figura 4: Interfaz del módulo de operaciones. Extracción automatizada con Azure AI e inserción inmediata en el registro centralizado de Excel Online.*

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
