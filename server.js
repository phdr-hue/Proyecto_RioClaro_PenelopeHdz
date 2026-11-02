const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());
// Sirve los archivos visuales de la página web desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// --- BASE DE CONOCIMIENTO (SIMULACIÓN RAG LÓGICA DE RÍO CLARO) ---
// Aquí guardamos la información de tus 22 años de historial y sucursales
const BASE_CONOCIMIENTO = {
    sucursales: ["Guadalajara", "Zapopan", "León", "Querétaro", "Aguascalientes"],
    pedidos: {
        "105": { sucursal: "León", estado: "Entregado", detalle: "Entregado con éxito al cliente hotelero." }
    },
    inventario: {
        "zapopan": "50 unidades de limpiadores multiusos en existencia.",
        "querétaro": "Disponibilidad completa de productos de higiene."
    }
};

// Ruta de la API para procesar el chat de la página web
app.post('/api/chat', (req, res) => {
 const userMessage = req.body.message ? req.body.message.toLowerCase() : "";
 let botResponse = "";

 // 1. Regla de Negocio: Búsqueda de pedido por número
 if (userMessage.includes('105')) {
   const pedido = BASE_CONOCIMIENTO.pedidos["105"];
   botResponse = `[RAG Inteligente] Verificando en sistema unificado... El pedido 105 correspondiente a la sucursal ${pedido.sucursal} se encuentra: **${pedido.estado}**. Detalle: ${pedido.detalle}`;
 }
 // 2. Regla de Negocio: Consulta de inventario por sucursal
 else if (userMessage.includes('zapopan')) {
   botResponse = `[RAG Inteligente] Consultando inventario consolidado... En la sucursal Zapopan contamos con: ${BASE_CONOCIMIENTO.inventario.zapopan}`;
 } 
 else if (userMessage.includes('león')) {
   botResponse = "[RAG Inteligente] Conectando con base de datos de León... Actualmente el stock local está agotado, pero podemos coordinar el envío de inmediato desde Querétaro.";
 } 
 else if (userMessage.includes('hola') || userMessage.includes('buenos días') || userMessage.includes('saludos')) {
   botResponse = "¡Hola! Eres bienvenido al centro de soporte digital de Distribuidora Río Claro. ¿Deseas consultar el estatus de un pedido o revisar existencias en alguna sucursal?";
 }
 
 // 🚨 3. FILTRO DE CAÍDA (FALLBACK): Captura consultas fuera de tema
 else {
   botResponse = `⚠️ **[Restricción de Contexto / Guardrail Activo]:** Lo siento, soy un asistente especializado exclusivamente en la operación de las 5 sucursales de Distribuidora Río Claro. No tengo permitido responder preguntas ajenas a pedidos o inventarios del negocio. Por favor, realiza una consulta válida.`;
 }

 res.json({ response: botResponse });
});
