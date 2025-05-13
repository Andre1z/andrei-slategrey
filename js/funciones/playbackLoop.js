/**
 * playbackLoop.js
 *
 * Este módulo implementa el bucle de reproducción (playback loop) para la línea de tiempo.
 * Utiliza requestAnimationFrame para actualizar de forma continua:
 *   - La posición del cursor de tiempo (a través de moveTimeCursorTo).
 *   - El estado visual de los clips (por ejemplo, añadiendo o removiendo la clase "active" mediante drawClipsAtTime).
 * Además, se comprueba si se ha alcanzado el final de la línea de tiempo usando getTimelineMaxTime.
 *
 * Se exponen tres funciones globales:
 *   - playbackLoop()  : Inicia la reproducción.
 *   - stopPlayback()    : Detiene (pausa) la reproducción.
 *   - resetPlayback()   : Reinicia la reproducción al inicio.
 */

(function () {
  "use strict";

  // Variables de estado para la reproducción.
  let isPlaying = false;      // Indica si la reproducción está activa.
  let startTimestamp = null;  // Marca temporal (en ms) cuando se inició este ciclo.
  let playbackTime = 0;       // Tiempo acumulado en segundos hasta el inicio del ciclo actual.

  /**
   * Función principal del bucle de reproducción.
   * Se actualiza el tiempo actual y se invocan las funciones de actualización visual.
   */
  function playbackLoop() {
    if (!isPlaying) {
      return;
    }

    const currentTimestamp = performance.now();
    if (!startTimestamp) {
      startTimestamp = currentTimestamp;
    }
    // Delta de tiempo en segundos desde el inicio del ciclo actual.
    const deltaTime = (currentTimestamp - startTimestamp) / 1000;
    const currentTime = playbackTime + deltaTime;

    // Actualizar la posición del cursor de tiempo.
    if (typeof moveTimeCursorTo === "function") {
      moveTimeCursorTo(currentTime);
    }
    // Actualizar visualmente el estado de los clips.
    if (typeof drawClipsAtTime === "function") {
      drawClipsAtTime(currentTime);
    }

    // Verificar si se alcanzó el final del timeline (opcional).
    if (typeof getTimelineMaxTime === "function") {
      const maxTime = getTimelineMaxTime();
      if (currentTime >= maxTime) {
        stopPlayback();
        console.log("Playback alcanzó el final de la línea de tiempo.");
        return;
      }
    }

    // Continuar el bucle.
    window.requestAnimationFrame(playbackLoop);
  }

  /**
   * Inicia el ciclo de reproducción.
   * Se actualizan las variables de estado y se inicia el bucle con requestAnimationFrame.
   */
  function startPlayback() {
    if (!isPlaying) {
      isPlaying = true;
      startTimestamp = null;
      window.requestAnimationFrame(playbackLoop);
      console.log("Reproducción iniciada.");
    }
  }

  /**
   * Detiene (pausa) el ciclo de reproducción.
   * Se actualiza el tiempo de reproducción acumulado para poder reanudar desde la misma posición.
   */
  function stopPlayback() {
    if (isPlaying) {
      isPlaying = false;
      const currentTimestamp = performance.now();
      if (startTimestamp) {
        const deltaTime = (currentTimestamp - startTimestamp) / 1000;
        playbackTime += deltaTime;
      }
      console.log("Reproducción pausada en:", playbackTime.toFixed(2), "segundos.");
    }
  }

  /**
   * Reinicia la reproducción volviendo al inicio.
   * Esto resetea el tiempo acumulado y actualiza visualmente la posición inicial.
   */
  function resetPlayback() {
    playbackTime = 0;
    startTimestamp = null;
    if (typeof moveTimeCursorTo === "function") {
      moveTimeCursorTo(playbackTime);
    }
    if (typeof drawClipsAtTime === "function") {
      drawClipsAtTime(playbackTime);
    }
    console.log("Reproducción reiniciada.");
  }

  // Exponemos las funciones globalmente para utilizarlas en los controles de la aplicación.
  window.playbackLoop = startPlayback;
  window.stopPlayback = stopPlayback;
  window.resetPlayback = resetPlayback;
})();