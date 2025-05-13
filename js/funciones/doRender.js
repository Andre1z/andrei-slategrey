/**
 * doRender.js
 *
 * Función para renderizar la línea de tiempo completa en el canvas.
 * Recorre todos los clips agregados (elementos con clase 'track-clip'), los dibuja
 * en función de sus propiedades (posición, tamaño y color) y añade el título del clip.
 */

(function() {
  "use strict";

  /**
   * Función principal que realiza el renderizado de la timeline.
   * Recorre cada clip, obtiene su configuración y lo dibuja sobre el canvas.
   */
  function doRender() {
    // Obtener el canvas de la timeline (se espera que exista en index.html con id "timeline-canvas").
    const timelineCanvas = document.getElementById("timeline-canvas");
    if (!timelineCanvas) {
      console.error("No se encontró el canvas de la timeline.");
      return;
    }
    
    const ctx = timelineCanvas.getContext("2d");
    
    // Limpiar el canvas antes de renderizar.
    ctx.clearRect(0, 0, timelineCanvas.width, timelineCanvas.height);
    
    // Obtener todos los elementos que representan un clip en la pista.
    const trackClips = document.querySelectorAll(".track-clip");
    
    // Si no hay clips, mostramos un mensaje indicativo.
    if (trackClips.length === 0) {
      ctx.fillStyle = "#888";
      ctx.font = "16px Arial";
      ctx.fillText("No hay clips para renderizar", 20, timelineCanvas.height / 2);
      console.log("No se encontraron clips para renderizar.");
      return;
    }
    
    // Recorremos cada clip y lo renderizamos en el canvas.
    trackClips.forEach(clip => {
      // Se asume que la posición y el ancho se definieron en el estilo inline durante la creación.
      const left = parseFloat(clip.style.left) || 0;
      const width = parseFloat(clip.style.width) || 0;
      const height = timelineCanvas.height; // Se usará la altura completa del canvas para el clip.
      
      // Obtener el color de fondo definido en el clip.
      const bgColor = clip.style.backgroundColor || "#333";
      
      // Dibujar el rectángulo que representa el clip.
      ctx.fillStyle = bgColor;
      ctx.fillRect(left, 0, width, height);
      
      // Dibujar el título o etiqueta central, si existe.
      const titleElement = clip.querySelector(".clip-title");
      if (titleElement) {
        const text = titleElement.textContent;
        ctx.fillStyle = "white";
        ctx.font = "12px sans-serif";
        const textWidth = ctx.measureText(text).width;
        const textX = left + (width - textWidth) / 2;
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
      }
    });
    
    console.log("Renderizado completado.");
  }

  // Exponer la función globalmente para poder invocarla desde otros scripts o desde el botón de render en index.html.
  window.doRender = doRender;
})();