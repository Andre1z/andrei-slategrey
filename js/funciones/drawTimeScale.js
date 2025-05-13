/**
 * drawTimeScale.js
 *
 * Función para dibujar una escala de tiempo en un canvas.
 * Utiliza la configuración del editor (por ejemplo, EditorConfig.timelineDuration)
 * y un factor de conversión (píxeles por segundo) para renderizar marcas temporales,
 * tanto principales como secundarias, en el canvas.
 *
 * Opciones disponibles (en el objeto options):
 *   - pixelsPerSecond: Factor de conversión (píxeles por segundo). Por defecto: 10.
 *   - interval: Intervalo en segundos para marcas principales. Por defecto: 5.
 *   - majorTickHeight: Altura de la marca principal. Por defecto: 80% de la altura del canvas.
 *   - minorTickHeight: Altura de la marca menor. Por defecto: 50% de la altura del canvas.
 *   - textColor: Color del texto. Por defecto: "#000".
 *   - tickColor: Color de las líneas de marca. Por defecto: "#000".
 *   - font: Fuente para el texto. Por defecto: "10px sans-serif".
 *   - backgroundColor: Color de fondo del canvas (opcional).
 */

(function () {
  "use strict";

  function drawTimeScale(canvas, options) {
    if (!canvas) {
      console.error("No se ha proporcionado un canvas para dibujar la escala de tiempo.");
      return;
    }

    options = options || {};
    var ctx = canvas.getContext("2d");

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Configuración predeterminada. Se usa EditorConfig.timelineDuration si está disponible.
    var timelineDuration =
      typeof EditorConfig !== "undefined" && EditorConfig.timelineDuration
        ? EditorConfig.timelineDuration
        : 300;
    var pixelsPerSecond = options.pixelsPerSecond || 10;
    var interval = options.interval || 5; // Intervalo principal en segundos.
    var majorTickHeight = options.majorTickHeight || canvas.height * 0.8;
    var minorTickHeight = options.minorTickHeight || canvas.height * 0.5;
    var textColor = options.textColor || "#000";
    var tickColor = options.tickColor || "#000";
    var font = options.font || "10px sans-serif";
    var backgroundColor = options.backgroundColor || null;

    // Si se define un color de fondo, se dibuja en el canvas.
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Configuración del contexto para dibujar las marcas.
    ctx.strokeStyle = tickColor;
    ctx.fillStyle = textColor;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    // Se asume que el ancho del canvas representa timelineDuration * pixelsPerSecond.
    // Dibujar marcas de tiempo para cada segundo.
    for (var second = 0; second <= timelineDuration; second++) {
      var x = second * pixelsPerSecond;
      if (x > canvas.width) break; // Evitar dibujar fuera del canvas.
      ctx.beginPath();
      // Cada "interval" segundos, se dibuja una marca principal.
      if (second % interval === 0) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, majorTickHeight);
        ctx.stroke();
        // Dibujar el texto con el tiempo formateado (mm:ss).
        ctx.fillText(formatTime(second), x, majorTickHeight + 2);
      } else {
        // Marcas secundarios con menor altura.
        ctx.moveTo(x, 0);
        ctx.lineTo(x, minorTickHeight);
        ctx.stroke();
      }
    }

    console.log("Escala de tiempo renderizada.");
  }

  /**
   * Función auxiliar para formatear los segundos en formato mm:ss.
   *
   * @param {number} seconds - Número de segundos.
   * @returns {string} Texto formateado como "mm:ss".
   */
  function formatTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
  }

  // Exponer la función globalmente para poder usarla en otros módulos o en la inicialización.
  window.drawTimeScale = drawTimeScale;
})();