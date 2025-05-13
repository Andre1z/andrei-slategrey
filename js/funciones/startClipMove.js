/**
 * startClipMove.js
 *
 * Esta función inicializa el proceso de arrastre de un clip en la línea de tiempo.
 * Al hacer clic (mousedown) sobre el clip, se capturan la posición actual del mouse y
 * la posición inicial del clip (definida en su propiedad CSS "left"). Luego, se almacena esta información
 * en un objeto global (window.currentClipMove) para que otros módulos (como onClipMoveMouseMove y onClipMoveMouseUp)
 * puedan gestionar el movimiento y finalizar el arrastre.
 *
 * Se asume que:
 *   - La función será invocada con el evento mousedown y el elemento del clip.
 *   - Los módulos onClipMoveMouseMove.js y onClipMoveMouseUp.js están disponibles y asignados globalmente.
 *
 * @param {MouseEvent} event - El evento mousedown que inicia el arrastre.
 * @param {HTMLElement} clipElement - El elemento DOM correspondiente al clip que se va a mover.
 */
(function () {
  "use strict";

  function startClipMove(event, clipElement) {
    if (!clipElement) {
      console.error("startClipMove: No se proporcionó un elemento para mover.");
      return;
    }
    
    // Prevenir comportamientos por defecto del evento.
    event.preventDefault();
    
    // Almacenar el estado inicial del arrastre en una variable global.
    window.currentClipMove = {
      clipElement: clipElement,
      startMouseX: event.clientX,
      startLeft: parseFloat(clipElement.style.left) || 0
    };

    // Agregar event listeners al documento para manejar el movimiento y la finalización del arrastre.
    document.addEventListener("mousemove", window.onClipMoveMouseMove);
    document.addEventListener("mouseup", window.onClipMoveMouseUp);
    
    console.log("Arrastre iniciado para el clip:", clipElement);
  }

  // Exponer la función globalmente para que otros módulos puedan invocarla desde los eventos.
  window.startClipMove = startClipMove;
})();