/**
 * decodeAudioFile.js
 *
 * Este módulo se encarga de decodificar archivos de audio utilizando la Web Audio API.
 * Recibe un objeto File, lo lee como ArrayBuffer y lo decodifica a un AudioBuffer.
 */

(function () {
  "use strict";

  // Comprueba la compatibilidad con AudioContext en el navegador.
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    console.error("Tu navegador no soporta la API Web Audio.");
    return;
  }

  // Crea una instancia del AudioContext.
  const audioContext = new AudioContext();

  /**
   * Decodifica un archivo de audio y retorna una promesa que se resuelve con un AudioBuffer.
   *
   * @param {File} file - Archivo de audio obtenido de un input file o mediante drag & drop.
   * @returns {Promise<AudioBuffer>} Promesa con el AudioBuffer decodificado.
   */
  function decodeAudioFile(file) {
    return new Promise((resolve, reject) => {
      // Se crea un FileReader para leer el contenido del archivo.
      const reader = new FileReader();

      // EventHandler para cuando la lectura se complete.
      reader.onload = function (e) {
        // Obtiene el ArrayBuffer del archivo.
        const arrayBuffer = e.target.result;

        // Utiliza decodeAudioData para decodificar el ArrayBuffer.
        audioContext.decodeAudioData(
          arrayBuffer,
          function (audioBuffer) {
            // Resolución exitosa de la promesa.
            resolve(audioBuffer);
          },
          function (error) {
            // Si ocurre un error durante la decodificación, se rechaza la promesa.
            console.error("Error al decodificar el archivo de audio:", error);
            reject(error);
          }
        );
      };

      // En caso de error al leer el archivo.
      reader.onerror = function (e) {
        console.error("Error al leer el archivo:", e);
        reject(e);
      };

      // Inicia la lectura del archivo como ArrayBuffer.
      reader.readAsArrayBuffer(file);
    });
  }

  // Expone la función globalmente para poder usarla en otros módulos.
  window.decodeAudioFile = decodeAudioFile;
})();