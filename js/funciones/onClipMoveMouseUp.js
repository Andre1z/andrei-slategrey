/**
 * onClipMoveMouseUp.js
 *
 * Este módulo gestiona el evento de finalización del arrastre (mouseup) de un clip.
 * Cuando el usuario suelta el botón del mouse, se detiene el movimiento del clip,
 * se eliminan los manejadores asociados al movimiento y se limpia el estado global.
 *
 * Se asume que al iniciar el arrastre se ha definido en window.currentClipMove
 * un objeto con:
 *   - clipElement: Elemento DOM del clip movido.
 *   - startMouseX: Posición horizontal del mouse al inicio del arrastre.
 *   - startLeft: Posición "left" inicial del clip.
 */

(function () {
  "use strict";

  /**
   * Función que se ejecuta al soltar el botón del mouse, finalizando el movimiento.
   *
   * @param {MouseEvent} event - Evento mouseup.
   */
  function onClipMoveMouseUp(event) {
    // Verificar que exista un clip en arrastre.
    if (!window.currentClipMove || !window.currentClipMove.clipElement) {
      return;
    }

    // Eliminar los manejadores de eventos globales para mousemove y mouseup.
    document.removeEventListener("mousemove", window.onClipMoveMouseMove);
    document.removeEventListener("mouseup", window.onClipMoveMouseUp);

    // Opcional: Podrías actualizar valores finales o realizar cálculos adicionales.
    console.log("Movimiento del clip finalizado.");

    // Limpiar el estado global del arrastre.
    window.currentClipMove = null;
  }

  // Exponer la función globalmente para poder referenciarla desde otros módulos.
  window.onClipMoveMouseUp = onClipMoveMouseUp;
})();