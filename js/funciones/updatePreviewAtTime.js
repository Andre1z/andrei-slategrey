/**
 * updatePreviewAtTime.js
 *
 * Este módulo actualiza la previsualización (preview) de la línea de tiempo a un tiempo específico.
 * La función updatePreviewAtTime recibe el tiempo en segundos y actualiza la interfaz:
 *
 *  - Si existe un elemento <video> con id "preview-video", se establece su propiedad currentTime.
 *  - Si existe un <canvas> con id "preview-canvas", se limpia y se dibuja un texto indicativo con el tiempo.
 *
 * De esta forma, se proporciona una actualización visual del contenido en función del tiempo actual.
 */

(function () {
  "use strict";

  /**
   * Actualiza la previsualización al tiempo especificado.
   *
   * @param {number} time - Tiempo en segundos al que se debe actualizar el preview.
   */
  function updatePreviewAtTime(time) {
    // Validar que el tiempo sea un número válido.
    if (typeof time !== "number" || isNaN(time)) {
      console.error("updatePreviewAtTime: El tiempo debe ser un número válido.");
      return;
    }

    // Si existe un elemento de video de previsualización, actualiza su currentTime.
    var previewVideo = document.getElementById("preview-video");
    if (previewVideo && previewVideo.tagName.toLowerCase() === "video") {
      previewVideo.currentTime = time;
      console.log("updatePreviewAtTime: Se actualizó el video a " + time.toFixed(2) + " segundos.");
      return;
    }

    // Si existe un canvas de previsualización, se actualiza su contenido.
    var previewCanvas = document.getElementById("preview-canvas");
    if (previewCanvas && previewCanvas.getContext) {
      var ctx = previewCanvas.getContext("2d");
      // Limpiar el canvas.
      ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      // Ejemplo de renderizado: mostrar el tiempo actual en el canvas.
      ctx.fillStyle = "#333";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Preview a " + time.toFixed(2) + " s", 10, 10);
      console.log("updatePreviewAtTime: Se actualizó el canvas a " + time.toFixed(2) + " segundos.");
      return;
    }

    // Si no se encuentra ningún elemento de previsualización, se notifica en consola.
    console.warn("updatePreviewAtTime: No se encontró un elemento de previsualización (video o canvas).");
  }

  // Exponer la función globalmente para que pueda ser utilizada en otros módulos.
  window.updatePreviewAtTime = updatePreviewAtTime;
})();