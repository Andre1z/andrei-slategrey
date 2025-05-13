/**
 * onHandleResizeUp.js
 *
 * Este módulo gestiona el evento "mouseup" que finaliza el redimensionamiento de un clip.
 * Cuando se suelta el botón del mouse, se eliminan los event listeners asociados al redimensionamiento
 * y se limpia la variable global utilizada para almacenar el estado de la operación.
 *
 * Se asume que durante el inicio del redimensionamiento se ha almacenado un objeto en
 * window.currentHandleResize con, al menos, la siguiente información:
 *   - clipElement: Elemento DOM del clip.
 *   - startMouseX: Posición del mouse al iniciar el resize.
 *   - initialWidth: Ancho inicial del clip.
 *   - direction: Dirección de redimensionamiento ("right" o "left").
 *   - initialLeft: (Opcional) Posición left inicial para redimensionar desde la izquierda.
 */

(function () {
  "use strict";

  /**
   * Función que se ejecuta al soltar el botón del mouse para finalizar el resize.
   *
   * @param {MouseEvent} event - Evento mouseup.
   */
  function onHandleResizeUp(event) {
    // Verificar que exista un estado activo de redimensionamiento.
    if (!window.currentHandleResize || !window.currentHandleResize.clipElement) {
      return;
    }
    
    // Remover los event listeners agregados para el resize.
    document.removeEventListener("mousemove", window.onHandleResizeMove);
    document.removeEventListener("mouseup", window.onHandleResizeUp);

    // Registro opcional para confirmar el fin del resize.
    console.log("Redimensionamiento finalizado para el clip:", window.currentHandleResize.clipElement);

    // Limpiar el estado global utilizado para el redimensionamiento.
    window.currentHandleResize = null;
  }

  // Exponer la función globalmente para que otros módulos puedan utilizarla.
  window.onHandleResizeUp = onHandleResizeUp;
})();