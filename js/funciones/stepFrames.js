/**
 * stepFrames.js
 *
 * Este módulo permite avanzar o retroceder fotogramas en la línea de tiempo.
 * La función stepFrames calcula el tiempo actual a partir del cursor y actualiza su posición
 * añadiendo o restando la duración de un fotograma (determinado por el frame rate).
 *
 * Funcionamiento:
 *   1. Se obtiene el elemento del cursor "time-cursor" y el contenedor "timeline-container".
 *   2. Se extrae el factor de conversión (píxeles por segundo) y se calcula el tiempo actual.
 *   3. Se obtiene la tasa de fotogramas (fps) desde EditorConfig (o se usa 30 fps por defecto).
 *   4. Se suma (o resta) 1/fps al tiempo actual para calcular el nuevo tiempo.
 *   5. Se actualiza la posición del cursor, se redibuja el estado de los clips y se actualiza la previsualización.
 *
 * Se expone globalmente la función stepFrames para poder ser llamada desde botones u otros atajos de teclado.
 */

(function () {
  "use strict";
  
  /**
   * Avanza o retrocede fotogramas en la línea de tiempo.
   *
   * @param {number} direction - Dirección del paso: 1 para avanzar (siguiente frame), -1 para retroceder (frame anterior)
   */
  function stepFrames(direction) {
    // Validar la dirección
    if (typeof direction !== "number" || (direction !== 1 && direction !== -1)) {
      console.error("stepFrames: La dirección debe ser 1 (adelante) o -1 (atrás).");
      return;
    }
    
    // Obtener el elemento del cursor de tiempo
    var timeCursor = document.getElementById("time-cursor");
    if (!timeCursor) {
      console.error("stepFrames: No se encontró el elemento 'time-cursor'.");
      return;
    }
    
    // Obtener el contenedor de la línea de tiempo para extraer el factor de conversión de píxeles a segundos.
    var timelineContainer = document.getElementById("timeline-container");
    if (!timelineContainer) {
      console.error("stepFrames: No se encontró el contenedor 'timeline-container'.");
      return;
    }
    
    // Factor de conversión: píxeles por segundo.
    var pixelsPerSecond = parseFloat(timelineContainer.getAttribute("data-pixels-per-second")) || 10;
    
    // Calcular el tiempo actual a partir de la posición del cursor.
    // Se toma el valor de la propiedad "left" (en píxeles) y se convierte en segundos.
    var currentLeft = parseFloat(timeCursor.style.left) || 0;
    var currentTime = currentLeft / pixelsPerSecond;
    
    // Obtener la tasa de fotogramas (fps) desde EditorConfig o usar 30 por defecto.
    var fps = (typeof EditorConfig !== "undefined" && EditorConfig.frameRate)
              ? EditorConfig.frameRate
              : 30;
              
    // Calcular el tiempo correspondiente a un fotograma.
    var frameStep = 1 / fps;
    
    // Calcular el nuevo tiempo.
    var newTime = currentTime + direction * frameStep;
    if (newTime < 0) {
      newTime = 0;
    }
    
    // Actualizar la posición del cursor, la visualización de los clips y la previsualización.
    if (typeof moveTimeCursorTo === "function") {
      moveTimeCursorTo(newTime);
    }
    if (typeof drawClipsAtTime === "function") {
      drawClipsAtTime(newTime);
    }
    if (typeof setPreviewTime === "function") {
      setPreviewTime(newTime);
    }
    
    console.log(`stepFrames: Movimiento ${direction === 1 ? "adelante" : "atrás"} a ${newTime.toFixed(2)} segundos.`);
  }
  
  // Exponer la función globalmente.
  window.stepFrames = stepFrames;
})();