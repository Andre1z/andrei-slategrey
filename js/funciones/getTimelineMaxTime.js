/**
 * getTimelineMaxTime.js
 *
 * Este módulo se encarga de calcular el tiempo máximo de la línea de tiempo en segundos.
 * La función recorre todos los elementos que representan clips (con clase "track-clip") y,
 * utilizando sus valores de inicio y duración, determina el máximo tiempo final.
 *
 * Para la conversión de píxeles a segundos se utiliza el atributo "data-pixels-per-second"
 * definido en el elemento contenedor de la timeline (por ejemplo, con id "timeline-container").
 *
 * Se expone la función getTimelineMaxTime globalmente para que pueda ser utilizada en otros módulos.
 */

(function () {
  "use strict";

  /**
   * Calcula el tiempo máximo de la línea de tiempo en segundos.
   *
   * @returns {number} El tiempo máximo, calculado como el mayor valor (inicio + duración) entre todos los clips.
   */
  function getTimelineMaxTime() {
    // Obtenemos el contenedor de la timeline para extraer el factor de conversión.
    const timelineContainer = document.getElementById("timeline-container");
    if (!timelineContainer) {
      console.error("No se encontró el contenedor de la timeline.");
      return 0;
    }

    // Factor para convertir píxeles a segundos.
    const pixelsPerSecond = parseFloat(timelineContainer.getAttribute("data-pixels-per-second")) || 10;

    // Buscamos todos los clips de la línea de tiempo.
    const clips = document.querySelectorAll(".track-clip");
    let maxTime = 0;

    clips.forEach(function (clip) {
      // Se intentan obtener los valores desde data attributes.
      // Si no están definidos, se calculan a partir de las propiedades inline: left y width.
      let startTime = clip.dataset.start
        ? parseFloat(clip.dataset.start)
        : (parseFloat(clip.style.left) / pixelsPerSecond);
      let duration = clip.dataset.duration
        ? parseFloat(clip.dataset.duration)
        : (parseFloat(clip.style.width) / pixelsPerSecond);

      const clipEnd = startTime + duration;
      if (clipEnd > maxTime) {
        maxTime = clipEnd;
      }
    });

    console.log("Tiempo máximo de la timeline:", maxTime, "segundos");
    return maxTime;
  }

  // Exponer la función globalmente.
  window.getTimelineMaxTime = getTimelineMaxTime;
})();