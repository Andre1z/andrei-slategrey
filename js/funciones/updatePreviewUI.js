/**
 * updatePreviewUI.js
 *
 * Este módulo actualiza la interfaz de previsualización (preview) en función del tiempo actual de la línea de tiempo.
 * La función updatePreviewUI:
 *   - Obtiene el factor de conversión (píxeles/segundo) del contenedor de la timeline.
 *   - Calcula, a partir de la posición del cursor, el tiempo actual en segundos.
 *   - Actualiza un elemento de texto (por ejemplo, con id "time-display") para mostrar el tiempo formateado (mm:ss).
 *   - Llama a la función global updatePreviewAtTime (si existe) para sincronizar otros elementos de previsualización.
 */

(function () {
  "use strict";

  /**
   * Convierte un número de segundos en un string con formato "mm:ss".
   *
   * @param {number} seconds - Tiempo en segundos.
   * @returns {string} Tiempo formateado.
   */
  function formatTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
  }

  /**
   * Actualiza la interfaz de previsualización de la línea de tiempo.
   *
   * Extrae el tiempo actual a partir de la posición del cursor (time-cursor) y actualiza:
   *   - Un display de tiempo (time-display).
   *   - La vista previa delegando la actualización a updatePreviewAtTime (si está definida).
   */
  function updatePreviewUI() {
    // Obtener el contenedor de la timeline donde se define el factor de conversión.
    var timelineContainer = document.getElementById("timeline-container");
    if (!timelineContainer) {
      console.error("updatePreviewUI: No se encontró el contenedor 'timeline-container'.");
      return;
    }
    var pixelsPerSecond = parseFloat(timelineContainer.getAttribute("data-pixels-per-second")) || 10;

    // Obtener el elemento que representa el cursor de tiempo.
    var timeCursor = document.getElementById("time-cursor");
    if (!timeCursor) {
      console.error("updatePreviewUI: No se encontró el elemento 'time-cursor'.");
      return;
    }

    // Usar getComputedStyle para obtener el estilo aplicado al cursor.
    var computedStyle = window.getComputedStyle(timeCursor);
    var currentLeft = parseFloat(computedStyle.left) || 0;
    var currentTime = currentLeft / pixelsPerSecond;

    // Actualizar el display de tiempo, si existe.
    var timeDisplay = document.getElementById("time-display");
    if (timeDisplay) {
      timeDisplay.textContent = "Tiempo actual: " + formatTime(currentTime);
    } else {
      console.warn("updatePreviewUI: No se encontró el elemento 'time-display' para mostrar el tiempo.");
    }

    // Delegar la actualización de la previsualización a updatePreviewAtTime (si está definida).
    if (typeof updatePreviewAtTime === "function") {
      updatePreviewAtTime(currentTime);
    }
    console.log("updatePreviewUI: Previsualización actualizada a " + formatTime(currentTime) + ".");
  }

  // Exponer la función globalmente para que otros módulos puedan llamarla.
  window.updatePreviewUI = updatePreviewUI;
})();