/**
 * fileToArrayBuffer.js
 *
 * Función para convertir un objeto File en un ArrayBuffer.
 * Utiliza FileReader para leer el contenido del archivo en formato de ArrayBuffer y retorna una Promise.
 */

(function () {
  "use strict";

  /**
   * Convierte un objeto File en un ArrayBuffer.
   *
   * @param {File} file - Objeto File que se desea leer.
   * @returns {Promise<ArrayBuffer>} Promesa que se resuelve con el ArrayBuffer del archivo.
   */
  function fileToArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
      if (!(file instanceof File)) {
        reject(new Error("El argumento proporcionado no es un objeto File."));
        return;
      }

      const reader = new FileReader();

      // Cuando la lectura se completa, se resuelve la promesa con el ArrayBuffer.
      reader.onload = function (e) {
        resolve(e.target.result);
      };

      // En caso de error durante la lectura se rechaza la promesa.
      reader.onerror = function (e) {
        reject(new Error("Error al leer el archivo: " + e.target.error.code));
      };

      // Inicia la lectura del archivo como ArrayBuffer.
      reader.readAsArrayBuffer(file);
    });
  }

  // Se expone la función globalmente para que pueda ser utilizada en otros módulos o scripts.
  window.fileToArrayBuffer = fileToArrayBuffer;
})();