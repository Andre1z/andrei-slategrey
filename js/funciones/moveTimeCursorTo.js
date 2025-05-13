/**
 * moveTimeCursorTo.js
 *
 * Función para mover el cursor de tiempo a una posición especificada.
 * Se espera que el contenedor de la línea de tiempo (por ejemplo, con id "timeline-container")
 * tenga el atributo "data-pixels-per-second" para convertir el tiempo (segundos) a píxeles.
 * También se espera que exista un elemento con id "time-cursor" que represente el cursor en la UI.
 */

(function () {
  "use strict";

  /**
   * Mueve el cursor de la línea de tiempo al tiempo especificado.
   *
   * @param {number} time - Tiempo en segundos al que se debe mover el cursor.
   */
  function moveTimeCursorTo(time) {
    if (typeof time !== "number" || isNaN(time)) {
      console.error("El valor de tiempo debe ser un número válido en segundos.");
      return;
    }
    
    // Obtener el contenedor de la timeline para extraer el factor de conversión.
    const timelineContainer = document.getElementById("timeline-container");
    if (!timelineContainer) {
      console.error("No se encontró el contenedor de la línea de tiempo con id 'timeline-container'.");
      return;
    }
    
    // Leer el factor de conversión: píxeles por segundo.
    const pixelsPerSecond = parseFloat(timelineContainer.getAttribute("data-pixels-per-second")) || 10;
    
    // Calcular la posición horizontal (en píxeles) a partir del tiempo.
    const posX = time * pixelsPerSecond;
    
    // Obtener el elemento que representa el cursor.
    const timeCursor = document.getElementById("time-cursor");
    if (!timeCursor) {
      console.error("No se encontró el elemento con id 'time-cursor'.");
      return;
    }
    
    // Establecer la posición del cursor en el eje X.
    timeCursor.style.position = "absolute"; // Asegurarse de que tenga posicionamiento.
    timeCursor.style.left = posX + "px";
    
    // Opcional: Actualizar la propiedad de previsualización (si existiera) o emitir un log.
    console.log(`Cursor movido a ${time} segundos (posición ${posX}px).`);
  }

  // Exponer la función globalmente para que pueda ser utilizada en otros módulos.
  window.moveTimeCursorTo = moveTimeCursorTo;
})();