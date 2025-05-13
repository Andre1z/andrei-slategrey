Andrei | Slategrey
========================================

Descripción general
-------------------
Este proyecto es un editor multimedia web que permite construir, visualizar y 
editar una línea de tiempo compuesta por clips de video, audio e imágenes de forma 
concatenada. La aplicación se inspira en editores profesionales (como Adobe Premiere 
o DaVinci Resolve), ofreciendo funcionalidades como:
  • Arrastrar y soltar archivos (clips) en un panel de medios.
  • Un “time display” interactivo que actúa como scrubber mediante una aguja roja, 
    mostrando el tiempo actual en formato mm:ss (con separación para facilitar la lectura).
  • Controles de reproducción globales (Play, Pause, Reset, Step Back / Forward) 
    que operan tanto sobre la posición del video (o imagen) en la vista previa como 
    sobre la posición de la aguja.
  • Funcionalidades de redimensionamiento de clips.
  • Herramientas adicionales para aplicar transiciones y efectos.
  • Capacidad para guardar y cargar proyectos en formato JSON.
  • Ventanas adicionales (Monitor y Parámetros) para seguimiento y configuración.

Estructura del Proyecto
------------------------
```
C:\xampp\htdocs\andrei-slategrey\andrei-slategrey
├── .gitattributes
├── README.md           <-- Este archivo
├── css
│   └── estilo.css      <-- Hoja de estilos global con el look dark y profesional.
├── index.html          <-- Página principal del editor (timeline, panel de medios, 
|                         controles, time display y tracks).
├── js
│   ├── codigo.php      <-- Configuraciones básicas (por ejemplo, PIXELS_PER_SECOND = 50,
│   │                    EditorConfig, etc.).
│   └── funciones       <-- Todos los módulos de JavaScript:
│       ├── createTrackClip.js      <-- Función para crear y posicionar clips en la timeline.
│       ├── decodeAudioFile.js      <-- Decodificación de archivos de audio usando Web Audio API.
│       ├── doRender.js             <-- Función para renderizar la timeline en un canvas (para exportación).
│       ├── drawAudioWaveform.js    <-- Dibuja la forma de onda de clips de audio.
│       ├── drawClipsAtTime.js      <-- Actualiza visualmente los clips en la timeline según el tiempo actual.
│       ├── drawTimeScale.js        <-- Dibuja la escala temporal (ticks y etiquetas) en el timeScale.
│       ├── fileToArrayBuffer.js    <-- Convierte un objeto File en un ArrayBuffer.
│       ├── getTimelineMaxTime.js   <-- Calcula el tiempo máximo de la línea de tiempo.
│       ├── handleFileDrop.js       <-- Gestiona el evento drag & drop para archivos.
│       ├── moveTimeCursorTo.js     <-- Función para mover el cursor (no se usa en la nueva versión, 
│       │                            pues se utiliza el scrubber en el time-display).
│       ├── onClipMoveMouseMove.js  <-- Gestión del movimiento de clips en la timeline.
│       ├── onClipMoveMouseUp.js    <-- Finaliza el arrastre de clips.
│       ├── onHandleResizeMove.js   <-- Gestiona el redimensionamiento de clips.
│       ├── onHandleResizeUp.js     <-- Finaliza el redimensionamiento.
│       ├── playbackLoop.js         <-- Bucle de reproducción; para reproducir la secuencia global.
│       ├── scheduleAllAudio.js     <-- Programa la reproducción de clips de audio usando Web Audio API.
│       ├── setPreviewTime.js       <-- Actualiza la vista previa al tiempo especificado.
│       ├── startClipMove.js        <-- Inicia el arrastre (drag) de un clip.
│       ├── startHandleResize.js    <-- Inicia el proceso de redimensionamiento de un clip.
│       ├── stepFrames.js           <-- Avanza o retrocede fotogramas en la línea de tiempo.
│       ├── transitions.js          <-- Gestión de transiciones y efectos entre clips.
│       ├── updatePreviewAtTime.js  <-- Actualiza el contenido de la previsualización (video/canvas) al tiempo dado.
│       └── updatePreviewUI.js      <-- Actualiza la interfaz de previsualización global.
├── monitor.html        <-- Ventana Monitor para visualizar estado/logs del editor.
├── parameters.html     <-- Ventana de Parámetros para configuración global.
└── slategrey.png       <-- Imagen de logo utilizada en el encabezado.
```  
Requerimientos
--------------
• Servidor local (por ejemplo, XAMPP) para ejecutar PHP y servir los archivos.
• Navegador moderno que soporte HTML5, CSS3, JavaScript (incluyendo la Web Audio API y BroadcastChannel).

Instalación y Uso
-----------------
1. Coloca el proyecto en el directorio de tu servidor (por ejemplo: "C:\xampp\htdocs\andrei-slategrey\andrei-slategrey").
2. Asegúrate de que XAMPP (u otro servidor web) esté en funcionamiento.
3. Abre en tu navegador el archivo **index.html** para iniciar el editor.
4. Utiliza la zona “Media Panel” para arrastrar y soltar archivos. Los clips se agregarán en la línea de tiempo:
   - Al soltar un clip, si es el primero se carga automáticamente en la vista previa.
   - Para videos, al cargarse (loadedmetadata) se actualiza la duración real y se ajusta el ancho del clip.
5. El “Time Display” en la parte superior (con la aguja roja) es interactivo.  
   - Puedes arrastrar la aguja o hacer clic en el área para mover el cursor global, lo que también actualiza la reproducción del clip.
6. Los botones de reproducción (Play, Pause, Reset, Step Back/Forward) operan sobre el scrubber y sincronizan el video o imagen mostrado.
7. La función “Fit Timeline” se invoca al hacer clic en la zona vacía de la timeline, reajustando el zoom de la secuencia.
8. Utiliza los botones de “Guardar Proyecto” y “Cargar Proyecto” para gestionar tus proyectos en formato JSON.
9. Las ventanas Monitor y Parámetros se pueden abrir mediante sus botones respectivos para ver estado y ajustar configuraciones.

Notas Adicionales
-----------------
- El archivo **js/codigo.php** proporciona algunas configuraciones básicas (por ejemplo, PIXELS_PER_SECOND = 50).
- Las funciones de manejo de clips, redimensionamiento y arrastre se encuentran en la carpeta **js/funciones/**.
- La integración con transiciones y efectos está presente en **transitions.js**.
- Algunos módulos utilizan la Web Audio API para procesar audio.

Licencia
--------
Este proyecto es de uso libre. Si deseas compartir o modificar el código, recuerda respetar la licencia original si se encuentra definida en la documentación.

Contacto
--------
Si necesitas ayuda o tienes sugerencias para el proyecto, puedes ponerte en contacto mediante los canales habituales.