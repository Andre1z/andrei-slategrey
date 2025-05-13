/**
 * setPreviewTime.js
 *
 * Este módulo actualiza la previsualización de la línea de tiempo al tiempo especificado.
 * 
 * La función setPreviewTime:
 *   - Valida que el tiempo proporcionado es un número.
 *   - Si se ha definido una función global updatePreviewAtTime, la utiliza para actualizar la previsualización.
 *   - De lo contrario, busca un elemento en el DOM (por ejemplo, con id "preview-indicator")
 *     y actualiza su contenido para reflejar el tiempo actual en formato mm:ss.
 * 
 * Puedes adaptar este comportamiento para actualizar una imagen, un canvas o reproducir un frame
 * específico de un video, según las necesidades de tu editor multimedia.
 */

(function () {
  "use strict";

  /**
   * Actualiza la previsualización (preview) segun el tiempo dado.
   *
   * @param {number} time - Tiempo en segundos al que se debe actualizar el preview.
   */
  function setPreviewTime(time) {
    // Validar que el tiempo proporcionado es un número
    if (typeof time !== 'number' || isNaN(time)) {
      console.error("setPreviewTime: El tiempo debe ser un número válido.");
      return;
    }
    
    // Si existe una función global 'updatePreviewAtTime', la usamos.
    if (typeof updatePreviewAtTime === 'function') {
      updatePreviewAtTime(time);
      return;
    }
    
    // Sino, actualizamos un elemento de la interfaz que sirva como indicador.
    var previewIndicator = document.getElementById("preview-indicator");
    if (previewIndicator) {
      // Actualiza el contenido de texto con el tiempo formateado.
      previewIndicator.textContent = "Tiempo de previsualización: " + formatTime(time);
    } else {
      console.warn("setPreviewTime: No se encontró un elemento con id 'preview-indicator' para mostrar el preview.");
    }
  }

  /**
   * Formatea un tiempo en segundos a formato "mm:ss".
   *
   * @param {number} seconds - Tiempo en segundos.
   * @returns {string} Tiempo formateado como "mm:ss".
   */
  function formatTime(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
  }

  // Exponer la función globalmente para que pueda ser utilizada en otros módulos.
  window.setPreviewTime = setPreviewTime;
})();