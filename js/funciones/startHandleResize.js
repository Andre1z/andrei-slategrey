/**
 * startHandleResize.js
 *
 * Esta función inicia el proceso de redimensionamiento de un clip en la línea de tiempo.
 * Cuando se hace clic (mousedown) sobre el "handle" del clip, se capturan los valores iniciales:
 *   - La posición horizontal del mouse (event.clientX).
 *   - El ancho actual del clip.
 *   - En caso de redimensionar hacia la izquierda, también se guarda la posición "left" inicial.
 * Además, se especifica la dirección del redimensionamiento ("right" por defecto o "left").
 * 
 * Una vez capturados estos valores, se asignan event listeners
 * para "mousemove" (gestión dinámica del resize) y "mouseup" (finalización del resize).
 *
 * @param {MouseEvent} event - Evento mousedown que inicia el resize.
 * @param {HTMLElement} clipElement - Elemento DOM del clip que se redimensionará.
 * @param {string} [direction="right"] - Dirección del resize ("right" o "left"). Por defecto es "right".
 */
(function () {
  "use strict";

  function startHandleResize(event, clipElement, direction) {
    if (!clipElement) {
      console.error("startHandleResize: No se proporcionó un elemento para redimensionar.");
      return;
    }
    
    // Prevenir el comportamiento por defecto.
    event.preventDefault();
    
    // Si no se especifica la dirección, se establece por defecto a "right".
    direction = direction || "right";
    
    // Obtener el ancho actual; si no está definido en el estilo inline, se usa offsetWidth.
    const initialWidth = parseFloat(clipElement.style.width) || clipElement.offsetWidth;
    
    // En caso de redimensionar desde la izquierda, se necesita la posición inicial left.
    const initialLeft = direction === "left"
      ? (parseFloat(clipElement.style.left) || clipElement.offsetLeft)
      : undefined;
      
    // Almacenar el estado inicial del redimensionamiento en una variable global.
    window.currentHandleResize = {
      clipElement: clipElement,
      startMouseX: event.clientX,
      initialWidth: initialWidth,
      direction: direction,
      initialLeft: initialLeft,
      minWidth: 20  // Valor mínimo en píxeles para evitar que el clip se haga demasiado pequeño.
    };

    // Agregar los event listeners para gestionar el movimiento y la finalización del redimensionamiento.
    document.addEventListener("mousemove", window.onHandleResizeMove);
    document.addEventListener("mouseup", window.onHandleResizeUp);
    
    console.log("Redimensionamiento iniciado para el clip:", clipElement, "Dirección:", direction);
  }

  // Exponer la función globalmente.
  window.startHandleResize = startHandleResize;
})();