/**
 * onHandleResizeMove.js
 *
 * Maneja el evento "mousemove" durante el redimensionamiento de un clip en la línea de tiempo.
 * Se espera que, al iniciar el redimensionamiento, se defina el objeto global:
 *
 * window.currentHandleResize = {
 *   clipElement: Elemento DOM del clip,
 *   startMouseX: Posición X inicial del mouse,
 *   initialWidth: Ancho original del clip (en píxeles),
 *   direction: "right" o "left" (opcional, por defecto "right"),
 *   initialLeft: Posición "left" del clip (opcional, necesaria para redimensionar hacia la izquierda),
 *   minWidth: Ancho mínimo permitido (opcional, por defecto 20)
 * }
 */

(function () {
  "use strict";

  function onHandleResizeMove(event) {
    // Verifica que exista un estado activo de redimensionamiento
    if (!window.currentHandleResize || !window.currentHandleResize.clipElement) {
      return;
    }

    const clip = window.currentHandleResize.clipElement;
    const initialMouseX = window.currentHandleResize.startMouseX;
    const initialWidth = window.currentHandleResize.initialWidth;
    const minWidth = window.currentHandleResize.minWidth || 20; // Ancho mínimo en píxeles
    const direction = window.currentHandleResize.direction || "right";

    if (direction === "right") {
      // Calcular el desplazamiento horizontal y nuevo ancho al redimensionar por la derecha.
      const deltaX = event.clientX - initialMouseX;
      let newWidth = initialWidth + deltaX;
      if (newWidth < minWidth) {
        newWidth = minWidth;
      }
      clip.style.width = newWidth + "px";
    } else if (direction === "left") {
      // Al redimensionar desde la izquierda, debemos ajustar tanto el ancho como la posición left.
      const deltaX = event.clientX - initialMouseX;
      let newWidth = initialWidth - deltaX;
      if (newWidth < minWidth) {
        newWidth = minWidth;
      }
      clip.style.width = newWidth + "px";

      // Se requiere la posición inicial para actualizar la posición left.
      if (typeof window.currentHandleResize.initialLeft !== "undefined") {
        const newLeft = window.currentHandleResize.initialLeft + deltaX;
        clip.style.left = newLeft + "px";
      } else {
        console.warn("No se encontró la propiedad initialLeft para el redimensionamiento desde la izquierda.");
      }
    }

    console.log(`onHandleResizeMove: Nuevo ancho del clip es ${clip.style.width}`);
  }

  // Exponer la función globalmente para que otros módulos o el manejo de eventos puedan utilizarla.
  window.onHandleResizeMove = onHandleResizeMove;
})();