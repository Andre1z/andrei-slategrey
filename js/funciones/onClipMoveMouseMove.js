/**
 * onClipMoveMouseMove.js
 *
 * Este módulo gestiona el evento de movimiento del mouse durante el arrastre de un clip
 * en la línea de tiempo. Se actualiza la posición horizontal del clip en función del desplazamiento
 * del mouse, permitiendo un movimiento dinámico.
 *
 * Se asume que al iniciar el arrastre se ha configurado un objeto global en window.currentClipMove
 * con las siguientes propiedades:
 *   - clipElement: Elemento DOM del clip en movimiento.
 *   - startMouseX: Posición X del mouse al inicio (en píxeles).
 *   - startLeft: Valor inicial de la propiedad left del clip (en píxeles).
 */

(function () {
  "use strict";

  /**
   * Evento mousemove para actualizar la posición del clip.
   *
   * @param {MouseEvent} event - Evento de movimiento del mouse.
   */
  function onClipMoveMouseMove(event) {
    // Verificar que exista un estado activo de arrastre.
    if (!window.currentClipMove || !window.currentClipMove.clipElement) {
      return;
    }

    var clip = window.currentClipMove.clipElement;
    var initialMouseX = window.currentClipMove.startMouseX;
    var initialLeft = window.currentClipMove.startLeft;

    // Calcular el desplazamiento horizontal en píxeles.
    var deltaX = event.clientX - initialMouseX;
    var newLeft = initialLeft + deltaX;

    // Asegurarse de no mover el clip fuera del área (por ejemplo, no permitir valores negativos).
    if (newLeft < 0) {
      newLeft = 0;
    }

    // Actualizar la posición del clip.
    clip.style.left = newLeft + "px";

    // Registro opcional para depuración.
    console.log(`onClipMoveMouseMove: deltaX = ${deltaX}, newLeft = ${newLeft}px`);
  }

  // Exponer la función globalmente para que pueda ser referenciada por otros módulos.
  window.onClipMoveMouseMove = onClipMoveMouseMove;
})();