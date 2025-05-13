/**
 * drawAudioWaveform.js
 *
 * Este módulo se encarga de dibujar la forma de onda de un archivo de audio en un canvas.
 * Se utiliza el primer canal del AudioBuffer para extraer los datos y se resume la forma de onda
 * en función de la cantidad de píxeles disponibles en el canvas.
 */

(function () {
  "use strict";

  /**
   * Dibuja la forma de onda de un AudioBuffer en un elemento canvas.
   *
   * @param {AudioBuffer} audioBuffer - Objeto AudioBuffer obtenido tras decodificar el archivo.
   * @param {HTMLCanvasElement} canvas - Elemento canvas donde se dibujará la forma de onda.
   * @param {Object} options - Opcionales para configurar el renderizado (color, tamaño, etc.).
   *                           Por defecto:
   *                           {
   *                             color: '#42a7f5',
   *                             backgroundColor: '#222',
   *                             width: canvas.width,
   *                             height: canvas.height
   *                           }
   */
  function drawAudioWaveform(audioBuffer, canvas, options = {}) {
    if (!audioBuffer || !canvas) {
      console.error("AudioBuffer o canvas no proporcionados a drawAudioWaveform.");
      return;
    }

    // Valores por defecto y fusión de opciones
    const defaults = {
      color: '#42a7f5',         // Color de la onda
      backgroundColor: '#222',  // Color de fondo del canvas
      width: canvas.width,      // Ancho del renderizado
      height: canvas.height     // Alto del renderizado
    };

    const config = Object.assign({}, defaults, options);

    const ctx = canvas.getContext("2d");

    // Limpiar el canvas y pintar el fondo
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, config.width, config.height);

    // Se toma el primer canal de audio para generar la forma de onda
    const data = audioBuffer.getChannelData(0);

    // Se define el número de muestras que abarcará cada píxel en el eje X
    const step = Math.floor(data.length / config.width);
    const waveformPoints = [];

    // Recorremos el largo del canvas y para cada segmento calculamos min y max
    for (let i = 0; i < config.width; i++) {
      let min = 1.0;
      let max = -1.0;
      const start = i * step;
      const end = start + step;
      for (let j = start; j < end; j++) {
        const sample = data[j];
        if (sample < min) {
          min = sample;
        }
        if (sample > max) {
          max = sample;
        }
      }
      waveformPoints.push({ min, max });
    }

    // Dibujar la forma de onda en el canvas
    ctx.beginPath();
    ctx.strokeStyle = config.color;
    ctx.lineWidth = 1;

    // Transformamos valores de [-1,1] a coordenadas Y: -1 se mapea a config.height y 1 a 0.
    for (let x = 0; x < waveformPoints.length; x++) {
      const { min, max } = waveformPoints[x];
      // Se mapea el valor mínimo y máximo de la forma de onda
      const yMin = (1 - ((min + 1) / 2)) * config.height;
      const yMax = (1 - ((max + 1) / 2)) * config.height;
      ctx.moveTo(x, yMin);
      ctx.lineTo(x, yMax);
    }

    ctx.stroke();
  }

  // Exponer la función globalmente para que pueda ser utilizada en otros scripts.
  window.drawAudioWaveform = drawAudioWaveform;
})();