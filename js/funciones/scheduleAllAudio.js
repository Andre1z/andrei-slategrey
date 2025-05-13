/**
 * scheduleAllAudio.js
 *
 * Este módulo se encarga de programar la reproducción de todos los clips de audio
 * presentes en la línea de tiempo. Para cada clip de audio (elementos con
 * data-clip-type="audio"), se obtiene la URL del archivo (data-src) y se programa
 * su inicio en función del tiempo (data-start) mediante el uso de la Web Audio API.
 *
 * Se asume que:
 *  - Cada clip de audio posee en sus datos:
 *      • data-start: tiempo de inicio (en segundos)
 *      • data-src: URL del recurso de audio
 *  - Se dispone (o se crea) de un AudioContext para procesar y reproducir el audio.
 */

(function () {
  "use strict";

  /**
   * Programa la reproducción de todos los clips de audio de la línea de tiempo.
   */
  function scheduleAllAudio() {
    // Verificar la existencia de la Web Audio API y obtener o crear un AudioContext.
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      console.error("La Web Audio API no está soportada en este navegador.");
      return;
    }

    // Si ya existe un audioContext global, lo usamos; de lo contrario, lo creamos.
    const audioContext = window.audioContext || new AudioContext();
    window.audioContext = audioContext; // Aseguramos que exista globalmente

    /**
     * Programa un clip de audio. Para ello:
     * 1. Se obtiene la configuración (start y source URL) desde los atributos data.
     * 2. Se carga el archivo de audio con fetch y se convierte a ArrayBuffer.
     * 3. Se decodifica el ArrayBuffer a un AudioBuffer.
     * 4. Se programa la reproducción con source.start() considerando el inicio relativo.
     *
     * @param {HTMLElement} clipElement - Elemento DOM del clip de audio.
     */
    function scheduleAudioClip(clipElement) {
      // Tiempo de inicio en la línea de tiempo (en segundos)
      const startTime = parseFloat(clipElement.dataset.start) || 0;

      // URL del recurso de audio
      const audioUrl = clipElement.dataset.src;
      if (!audioUrl) {
        console.warn("No se ha especificado la URL del audio en el clip:", clipElement);
        return;
      }

      // Utilizamos fetch para cargar el archivo de audio.
      fetch(audioUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error al cargar el audio desde ${audioUrl}`);
          }
          return response.arrayBuffer();
        })
        .then(arrayBuffer => {
          // Decodificar el contenido del audio.
          return audioContext.decodeAudioData(arrayBuffer);
        })
        .then(decodedData => {
          // Crear un BufferSource para reproducir el AudioBuffer.
          const source = audioContext.createBufferSource();
          source.buffer = decodedData;
          source.connect(audioContext.destination);

          // Calculamos el retardo hasta el inicio del clip.
          // Para este ejemplo, asumimos que la línea de tiempo comienza en 0 al momento de la programación.
          const now = audioContext.currentTime;
          const delay = startTime;

          console.log(`Programando audio (${audioUrl}) para iniciar en ${delay.toFixed(2)} segundos (audioContext.currentTime: ${now.toFixed(2)})`);

          // Programamos el inicio del audio.
          source.start(now + delay);
        })
        .catch(error => {
          console.error("Error al programar el clip de audio:", error);
        });
    }

    // Seleccionamos todos los clips de audio a partir de la clase y del atributo data-clip-type.
    const audioClips = document.querySelectorAll(".track-clip[data-clip-type='audio']");
    if (audioClips.length === 0) {
      console.log("No se han encontrado clips de audio para programar.");
      return;
    }

    // Programar cada clip de audio.
    audioClips.forEach(clip => {
      scheduleAudioClip(clip);
    });

    console.log("Todos los clips de audio han sido programados.");
  }

  // Exponer la función globalmente para que pueda ser llamada desde otros scripts o controles.
  window.scheduleAllAudio = scheduleAllAudio;
})();