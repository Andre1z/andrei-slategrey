/**
 * transitions.js
 *
 * Este módulo gestiona la aplicación de transiciones entre clips en la línea de tiempo.
 * Cada clip puede definir los siguientes atributos:
 *   - data-transition: El tipo de transición ("fade", "slide", "wipe" o "none").
 *   - data-transition-duration: La duración (en segundos) de la transición.
 *
 * La función global applyTransition se encarga de leer estos atributos y ejecutar el efecto.
 */

(function() {
  "use strict";

  /**
   * Aplica una transición de desvanecimiento (fade) al elemento.
   * Disminuye la opacidad hasta 0 y luego la restaura a 1.
   *
   * @param {HTMLElement} element - Elemento DOM sobre el que se aplica la transición.
   * @param {number} duration - Duración de la transición en segundos.
   */
  function fadeTransition(element, duration) {
    element.style.transition = "opacity " + duration + "s";
    element.style.opacity = "0";
    setTimeout(function() {
      element.style.opacity = "1";
    }, duration * 1000);
  }
  
  /**
   * Aplica una transición de deslizamiento (slide) al elemento.
   * Desplaza el elemento 50 píxeles hacia la izquierda y luego lo regresa a su posición original.
   *
   * @param {HTMLElement} element - Elemento DOM sobre el que se aplica la transición.
   * @param {number} duration - Duración de la transición en segundos.
   */
  function slideTransition(element, duration) {
    // Se asume que el elemento tiene posicionamiento 'absolute' o 'relative'.
    var originalLeft = parseFloat(element.style.left) || 0;
    element.style.transition = "left " + duration + "s";
    element.style.left = (originalLeft - 50) + "px";
    setTimeout(function() {
      element.style.left = originalLeft + "px";
    }, duration * 1000);
  }
  
  /**
   * Aplica una transición de barrido (wipe) al elemento.
   * Reduce progresivamente el ancho del elemento a 0 y luego lo restaura.
   *
   * @param {HTMLElement} element - Elemento DOM sobre el que se aplica la transición.
   * @param {number} duration - Duración de la transición en segundos.
   */
  function wipeTransition(element, duration) {
    var originalWidth = element.offsetWidth;
    element.style.transition = "width " + duration + "s";
    element.style.width = "0px";
    setTimeout(function() {
      element.style.width = originalWidth + "px";
    }, duration * 1000);
  }
  
  /**
   * Aplica la transición definida en el atributo data-transition del clip.
   *
   * @param {HTMLElement} clipElement - Elemento DOM del clip.
   */
  function applyTransition(clipElement) {
    if (!clipElement) {
      console.error("applyTransition: No se proporcionó un elemento.");
      return;
    }
    
    // Leer el tipo de transición y la duración, con valores por defecto en caso de no estar definidos.
    var transitionType = clipElement.getAttribute("data-transition") || "none";
    var duration = parseFloat(clipElement.getAttribute("data-transition-duration")) || 1;
    
    switch (transitionType.toLowerCase()) {
      case "fade":
        fadeTransition(clipElement, duration);
        break;
      case "slide":
        slideTransition(clipElement, duration);
        break;
      case "wipe":
        wipeTransition(clipElement, duration);
        break;
      case "none":
      default:
        console.log("applyTransition: No se aplica ninguna transición o tipo no reconocido.");
        break;
    }
  }
  
  // Exponer funciones globalmente para que otros módulos puedan utilizarlas.
  window.applyTransition = applyTransition;
  window.fadeTransition = fadeTransition;
  window.slideTransition = slideTransition;
  window.wipeTransition = wipeTransition;
})();