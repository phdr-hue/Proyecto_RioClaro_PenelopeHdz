const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());
// Sirve los archivos visuales de la página web desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// --- 📦 IMPLEMENTACIÓN OPCIÓN 3: EXTENSIÓN DE BASE DE CONOCIMIENTO (SIMULACIÓN MULTIVARIADA) ---
// Hemos expandido los escenarios lógicos corporativos para simular un entorno de producción real
const BASE_CONOCIMIENTO = {
  sucursales: ["Guadalajara", "Zapopan", "León", "Querétaro", "Aguascalientes"],
  pedidos: {
    "105": { 
      sucursal: "León", 
      estado: "Entregado", 
      detalle: "Entregado con éxito al cliente hotelero." 
    },
    "106": { 
      sucursal: "Guadalajara", 
      estado: "Retenido en Aduanas", 
      detalle: "Alerta de importación por falta de documentación fiscal de la materia prima." 
    },
    "107": { 
      sucursal: "Aguascalientes", 
      estado: "Pendiente de Ruta", 
      detalle: "El camión repartidor se encuentra demorado por mantenimiento mecánico." 
    }
  },
  inventario: {
    "zapopan": "50 unidades de limpiadores multiusos en existencia.",
    "querétaro": "Disponibilidad completa de productos de higiene corporativa.",
    "guadalajara": "Stock crítico: 0 unidades de desinfectante industrial (Retraso de reabastecimiento)."
  }
};

// Ruta de la API para procesar el chat de la página web
app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message ? req.body.message.toLowerCase() : "";
  let botResponse = "";

  // --- 🔍 IMPLEMENTACIÓN OPCIÓN 2: CLASIFICADOR DE INTENCIONES (CATEGORIZACIÓN NLP) ---
  // El bot analiza el prompt en tiempo real para determinar el dominio organizativo antes de responder
  let categoria = "GENERAL";

  if (userMessage.includes('105') || userMessage.includes('106') || userMessage.includes('107') || userMessage.includes('pedido')) {
    categoria = "SOPORTE_LOGISTICO_Y_ENVIOS";
  } else if (userMessage.includes('zapopan') || userMessage.includes('querétaro') || userMessage.includes('guadalajara') || userMessage.includes('inventario') || userMessage.includes('stock')) {
    categoria = "GESTION_DE_INVENTARIOS_Y_ALMACEN";
  } else if (userMessage.includes('hola') || userMessage.includes('buenos días') || userMessage.includes('saludos')) {
    categoria = "ATENCION_INICIAL_Y_BIENVENIDA";
  } else {
    categoria = "FUERA_DE_CONTEXTO_DETECTADO";
  }

  // Monitor en la terminal de Visual Studio Code para evidencias de auditoría de IA
  console.log(`[NLP Audit Log] Consulta: "${req.body.message}" | Categoría Asignada: ${categoria}`);

  // --- 🛠️ PROCESAMIENTO MOCKING CON RAG ASOCIADO Y GUARDRAILS ---

  // Regla de Negocio: Búsqueda del Pedido Exitoso 105
  if (userMessage.includes('105')) {
    const pedido = BASE_CONOCIMIENTO.pedidos["105"];
    botResponse = `🏷️ **[Categoría de IA: ${categoria}]**\n[RAG Lógico] Buscando en el índice unificado... El pedido 105 correspondiente a la sucursal **${pedido.sucursal}** se encuentra: **${pedido.estado}**. Detalle de incidencia: ${pedido.detalle}`;
  }
  // Regla de Negocio Exclusiva Opción 3: Pedido con Incidencia Aduanera 106
  else if (userMessage.includes('106')) {
    const pedido = BASE_CONOCIMIENTO.pedidos["106"];
    botResponse = `🏷️ **[Categoría de IA: ${categoria}]**\n🚨 [RAG Lógico] **Alerta de Operación:** El pedido 106 asignado a **${pedido.sucursal}** reporta estatus crítico: **${pedido.estado}**. Resumen técnico: *${pedido.detalle}*`;
  }
  // Regla de Negocio Exclusiva Opción 3: Pedido Demorado 107
  else if (userMessage.includes('107')) {
    const pedido = BASE_CONOCIMIENTO.pedidos["107"];
    botResponse = `🏷️ **[Categoría de IA: ${categoria}]**\n🚚 [RAG Lógico] Monitoreo logístico local... El pedido 107 en **${pedido.sucursal}** está en estado: **${pedido.estado}**. Motivo registrado: *${pedido.detalle}*`;
  }
  // Regla de Negocio: Consulta de existencias Zapopan
  else if (userMessage.includes('zapopan')) {
    botResponse = `🏷️ **[Categoría de IA: ${categoria}]**\n[RAG Lógico] Consultando catálogo de existencias... En la sucursal Zapopan contamos con: ${BASE_CONOCIMIENTO.inventario.zapopan}`;
  }
  // Regla de Negocio Exclusiva Opción 3: Consulta de existencias críticas Guadalajara (0 unidades)
  else if (userMessage.includes('guadalajara')) {
    botResponse = `🏷️ **[Categoría de IA: ${categoria}]**\n[RAG Lógico] Alerta de desabasto detectada... En el centro de distribución Guadalajara reportamos: **${BASE_CONOCIMIENTO.inventario.guadalajara}**`;
  }
  // Regla de Negocio: Canal de Bienvenida Estándar
  else if (categoria === "ATENCION_INICIAL_Y_BIENVENIDA") {
    botResponse = `🏷️ **[Categoría de IA: ${categoria}]**\n¡Hola! Eres bienvenido al centro de soporte digital interactivo de Distribuidora Río Claro. ¿Deseas auditar el estatus de un pedido (105, 106, 107) o revisar existencias en alguna sucursal?`;
  }
  // 🚨 FILTRO DE CONTROL / GUARDRAIL ACTIVO (Filtra todo lo ajeno al negocio)
  else {
    botResponse = `⚠️ **[Restricción de Contexto / Guardrail Activo]:** Lo siento, soy un asistente especializado exclusivamente en la operación empresarial de Distribuidora Río Claro. No tengo autorización para responder preguntas ajenas a logística o almacén (Clasificación rechazada: ${categoria}). Por favor, realiza una consulta corporativa válida.`;
  }

  res.json({ response: botResponse });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor de Río Claro corriendo con éxito en http://localhost:${PORT}`);
});
