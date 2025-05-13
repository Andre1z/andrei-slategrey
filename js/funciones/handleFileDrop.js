/**
 * handleFileDrop.js
 *
 * Este módulo gestiona el evento de "drag & drop" de archivos sobre un área designada,
 * evitando el comportamiento por defecto y procesando los archivos soltados.
 * Se detecta el tipo de archivo (audio, imagen, video) para aplicar acciones específicas.
 *
 * En este ejemplo, si el archivo es de audio se invoca:
 *   - decodeAudioFile(file): para decodificar el archivo a un AudioBuffer.
 *   - drawAudioWaveform(audioBuffer, canvas): para mostrar la forma de onda en un canvas
 *     (si se encuentra un elemento con id "audio-waveform-canvas").
 */

(function () {
  "use strict";

  /**
   * Maneja el evento de drop para archivos.
   *
   * @param {DragEvent} event - Evento de soltado de archivos.
   */
  function handleFileDrop(event) {
    // Prevenir comportamientos por defecto y la propagación del evento.
    event.preventDefault();
    event.stopPropagation();

    // Verificar que se hayan soltado archivos.
    const files = event.dataTransfer.files;
    if (!files || files.length === 0) {
      console.warn("No se han arrastrado archivos.");
      return;
    }

    // Procesar cada archivo soltado.
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`Archivo soltado: ${file.name} (${file.type})`);

      // Procesamiento para archivos de audio.
      if (file.type.startsWith("audio/")) {
        if (typeof decodeAudioFile === "function") {
          decodeAudioFile(file)
            .then(function (audioBuffer) {
              console.log("Archivo de audio decodificado:", audioBuffer);
              // Si existe un canvas designado para la forma de onda, se invoca su renderizado.
              const waveformCanvas = document.getElementById("audio-waveform-canvas");
              if (waveformCanvas && typeof drawAudioWaveform === "function") {
                drawAudioWaveform(audioBuffer, waveformCanvas);
              } else {
                console.warn("No se encontró un canvas para renderizar la forma de onda o drawAudioWaveform no está disponible.");
              }
            })
            .catch(function (error) {
              console.error("Error al decodificar el archivo de audio:", error);
            });
        } else {
          console.error("La función decodeAudioFile no está definida.");
        }
      }
      // Procesamiento para archivos de imagen.
      else if (file.type.startsWith("image/")) {
        console.log("Archivo de imagen detectado:", file.name);
        // Aquí puedes agregar la lógica para procesar imágenes, por ejemplo,
        // crear un clip de imagen en la línea de tiempo o mostrar una previsualización.
      }
      // Procesamiento para archivos de video.
      else if (file.type.startsWith("video/")) {
        console.log("Archivo de video detectado:", file.name);
        // Aquí puedes agregar la lógica para procesar videos, por ejemplo,
        // crear un clip de video en la línea de tiempo o cargar una vista previa.
      }
      // Otros tipos de archivos.
      else {
        console.log("Tipo de archivo no soportado:", file.type);
      }
    }
  }

  // Exponer la función globalmente para que pueda utilizarse en otros scripts.
  window.handleFileDrop = handleFileDrop;
})();