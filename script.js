// dentro del script.js
// todas nuestros textos de ejemplo
const textos = [
  'Cuando hayas eliminado lo imposible, lo que quede, por improbable que sea, debe ser la verdad.',
  'No hay nada más engañoso que un hecho evidente.',
  'A estas alturas debería saber que cuando un hecho parece oponerse a una larga serie de deducciones, invariablemente demuestra ser capaz de soportar alguna otra interpretación.',
  'Nunca hago excepciones. Una excepción refuta la regla.',
  'Lo que un hombre puede inventar, otro puede descubrirlo.',
  'Nada aclara tanto un caso como explicárselo a otra persona.',
  'La educación nunca termina, Watson. Es una serie de lecciones, con la mayor para la última.',
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabraIndice = 0;

// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const textoElemento = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('texto-tipeado')
console.log(typedValueElement)
// en el final de nuestro archivo script.js
document.getElementById('inicio').addEventListener('click', () => {
  // elegimos el texto de ejemplo a mostrar
  let textoIndice = Math.floor(Math.random() * textos.length);
  console.log(textoIndice)
  const texto = textos[textoIndice];
  // separamos el texto en un array de palabras
  let palabras = texto.split(' ');
  // reestablemos el idice de palabras para el seguimiento
  textoIndice = 0;

  // Actualizamos la interfaz de usuario
  // Creamos una matriz con los elementos span de nuestro HTML para poder definirles una class
  const spanPalabras = palabras.map(function(palabra) { 
    return `<span>${palabra} </span>`;
  });
  // Convertimos a string y lo definimos como innerHTML en el texto de ejemplo a mostrar
  messageElement.innerHTML = spanPalabras.join('');
  // Resaltamos la primer palabra
  messageElement.childNodes[0].className = 'highlight';
  // Borramos los mensajes previos
  textoElemento.innerText = '';

  // Definimos el elemento textbox
  // Vaciamos el elemento textbox
  typedValueElement.value = '';
  // Definimos el foco en el elemento
  typedValueElement.focus();
  // Establecemos el manejador de eventos

  // Iniciamos el contador de tiempo
  startTime = new Date().getTime();
  
});

// al final de nuestro archivo script.js
typedValueElement.addEventListener('input', () => {
  // tomamos la palabra actual
  const currentWord = palabras[palabraIndice]
  // tomamos el valor actual
  const typedValue = typedValueElement.value;
  if (typedValue === currentWord && palabraIndice === palabras.length - 1) {
    // fin de la sentencia
    // Definimos el mensaje de éxito
    const elapsedTime = new Date().getTime() - startTime;
    const message = `FELICITACIONES! Finalizaste en ${elapsedTime / 1000} segundos.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // fin de la palabra
    // vaciamos el valor typedValueElement para la siguiente palabra
    typedValueElement.value = '';
    // movemos a la palabra siguiente
    palabraIndicea++;
    // reiniciamos el estado de todas las clases para los textos
    for (const palabraElement of textoElement.childNodes) {
      palabraElement.className = '';
    }
    // resaltamos la palabra actual
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // correcta actual
    // resaltar la siguiente palabra
    typedValueElement.className = '';
  } else {
    // estado error
    typedValueElement.className = 'error';
  }
});