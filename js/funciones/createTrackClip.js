/**
 * createTrackClip.js
 *
 * Función para crear un nuevo clip en una pista de la línea de tiempo.
 * Los clips pueden representar video, audio o imágenes, y se posicionan
 * en la pista de acuerdo a su tiempo de inicio y duración.
 *
 * Se espera que el contenedor de la pista (trackElement) tenga definido
 * el atributo "data-pixels-per-second" para convertir el tiempo en píxeles.
 */

(function() {
  'use strict';

  /**
   * Crea y posiciona un clip visual en la pista de la timeline.
   *
   * @param {Object} clipData - Objeto con los datos del clip. Ejemplo:
   *   {
   *     id: "clip1",
   *     type: "video",    // Valores esperados: "video", "audio", "image"
   *     startTime: 15,    // Tiempo de inicio en segundos
   *     duration: 10,     // Duración en segundos
   *     title: "Mi clip"  // Título o etiqueta descriptiva del clip
   *   }
   * @param {HTMLElement} trackElement - Elemento DOM de la pista donde se colocará el clip.
   * @returns {HTMLElement} El elemento clip creado.
   */
  function createTrackClip(clipData, trackElement) {
    // Crear contenedor para el clip.
    var clipElement = document.createElement('div');
    clipElement.classList.add('track-clip');
    clipElement.setAttribute('data-clip-id', clipData.id);
    clipElement.setAttribute('data-clip-type', clipData.type);

    // Se obtiene la escala de tiempo en píxeles por segundo, con un valor por defecto.
    var pixelsPerSecond = parseFloat(trackElement.getAttribute('data-pixels-per-second')) || 10;

    // Calcular dimensiones y posición.
    var clipWidth = clipData.duration * pixelsPerSecond;
    var clipLeft = clipData.startTime * pixelsPerSecond;

    // Configurar estilos básicos del clip.
    clipElement.style.position = 'absolute';
    clipElement.style.left = clipLeft + 'px';
    clipElement.style.width = clipWidth + 'px';
    clipElement.style.height = '100%';
    clipElement.style.backgroundColor = getClipColor(clipData.type);
    clipElement.style.border = '1px solid #333';
    clipElement.style.boxSizing = 'border-box';
    clipElement.style.cursor = 'pointer';

    // Agregar un label con el título o identificador del clip.
    var titleElement = document.createElement('span');
    titleElement.classList.add('clip-title');
    titleElement.textContent = clipData.title || clipData.id;
    titleElement.style.position = 'absolute';
    titleElement.style.top = '50%';
    titleElement.style.left = '50%';
    titleElement.style.transform = 'translate(-50%, -50%)';
    titleElement.style.color = '#fff';
    titleElement.style.fontSize = '12px';
    titleElement.style.pointerEvents = 'none'; // Para que no interfiiera con el drag
    clipElement.appendChild(titleElement);

    // Adjuntar el clip al track.
    trackElement.appendChild(clipElement);

    // Configurar el manejador para iniciar el movimiento (drag & drop).
    clipElement.addEventListener('mousedown', function(event) {
      startClipMove(event, clipElement);
    });

    return clipElement;
  }

  /**
   * Función auxiliar para obtener un color distintivo según el tipo de clip.
   *
   * @param {string} type - Tipo de clip ("video", "audio", "image").
   * @returns {string} Color en formato hexadecimal.
   */
  function getClipColor(type) {
    switch (type) {
      case 'video':
        return '#f56242'; // Rojo anaranjado para video.
      case 'audio':
        return '#42a7f5'; // Azul para audio.
      case 'image':
        return '#42f554'; // Verde para imágenes.
      default:
        return '#888';    // Gris por defecto.
    }
  }

  /**
   * Función para iniciar el movimiento (drag) del clip.
   * Se delega a una función global "startClipMove" definida en otro archivo, por ejemplo, startClipMove.js.
   *
   * @param {MouseEvent} event - El evento mousedown.
   * @param {HTMLElement} clipElement - Elemento del clip que se moverá.
   */
  function startClipMove(event, clipElement) {
    if (typeof window.startClipMove === 'function') {
      window.startClipMove(event, clipElement);
    } else {
      console.warn('La función startClipMove no está definida.');
    }
  }

  // Exponer la función globalmente para que otros scripts puedan utilizarla.
  window.createTrackClip = createTrackClip;

})();