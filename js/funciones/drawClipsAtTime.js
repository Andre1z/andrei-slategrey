/**
 * drawClipsAtTime.js
 *
 * Función para actualizar la visualización de los clips en la línea de tiempo
 * según el tiempo actual de reproducción.
 * 
 * Cada clip se espera que tenga definidos o, al menos, se pueda calcular:
 * - Tiempo de inicio: definido en data-start o, de lo contrario, obtenido a partir de la propiedad inline "left".
 * - Duración: definida en data-duration o calculada a partir del ancho (style.width).
 *
 * Se requiere que el contenedor de la timeline (por ejemplo, 
 * con id "timeline-container") tenga asignado el atributo "data-pixels-per-second"
 * para convertir los valores de píxeles a segundos.
 */
(function () {
  "use strict";

  /**
   * Actualiza el estado visual de los clips en función del tiempo actual.
   *
   * @param {number} currentTime - Tiempo actual en segundos.
   */
  function drawClipsAtTime(currentTime) {
    // Obtener el contenedor de la timeline para determinar la conversión de píxeles a segundos.
    var timelineContainer = document.getElementById("timeline-container");
    if (!timelineContainer) {
      console.error("No se encontró el contenedor de la timeline.");
      return;
    }

    // Factor de conversión: píxeles por segundo.
    var pixelsPerSecond = parseFloat(timelineContainer.getAttribute("data-pixels-per-second")) || 10;

    // Obtener todos los clips presentes en la linea de tiempo.
    var clips = document.querySelectorAll(".track-clip");

    clips.forEach(function (clip) {
      // Se intenta obtener el tiempo de inicio y la duración desde atributos data.
      // Si no están definidos, se calculan usando los estilos inline (left y width).
      var startTime = clip.dataset.start
        ? parseFloat(clip.dataset.start)
        : (parseFloat(clip.style.left) / pixelsPerSecond);
      var duration = clip.dataset.duration
        ? parseFloat(clip.dataset.duration)
        : (parseFloat(clip.style.width) / pixelsPerSecond);

      // Verificar si el tiempo actual se encuentra dentro del rango de este clip.
      if (currentTime >= startTime && currentTime < startTime + duration) {
        clip.classList.add("active");
      } else {
        clip.classList.remove("active");
      }
    });

    console.log("Se han actualizado los clips para el tiempo: " + currentTime + " s");
  }

  // Exponemos la función globalmente para poder usarla desde otros scripts.
  window.drawClipsAtTime = drawClipsAtTime;

})();