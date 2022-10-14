// dentro del script.js
// todas nuestros textos de ejemplo
const textos = [
    'WHEN YOU HAVE ELIMINATED THE IMPOSSIBLE, WHATEVER REMAINS, HOWEVER IMPROBABLE, MUST BE THE TRUTH.',
    'THERE IS NOTHING MORE DECEPTIVE THAN AN OBVIOUS FACT.',
    'I OUGHT TO KNOW BY THIS TIME THAT WHEN A FACT APPEARS TO BE OPPOSED TO A LONG TRAIN OF DEDUCTIONS IT INVARIABLY PROVES TO BE CAPABLE OF BEARING SOME OTHER INTERPRETATION.',
    'I NEVER MAKE EXCEPTIONS. AN EXCEPTION DISPROVES THE RULE.',
    'WHAT ONE MAN CAN INVENT ANOTHER CAN DISCOVER.',
    'NOTHING CLEARS UP A CASE SO MUCH AS STATING IT TO ANOTHER PERSON.',
    'EDUCATION NEVER ENDS, WATSON. IT IS A SERIES OF LESSONS, WITH THE GREATEST FOR THE LAST.',
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;
// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const textoElemento = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('texto-tipeado');


// en el final de nuestro archivo script.js
document.getElementById('inicio').addEventListener('click', () => { /*del documento toma el elemento que tiene el id inicio y agregale un escuchador para captar cada vez que el usuario haga click entonces cuando el java detecte que el usuario hace click va a ejecutra toda la funcion que esta dentro de la llave, con el parentesis y la flechita le decimos que todo lo que esta dentro de las llaves es una funcion */
    // elegimos el texto de ejemplo a mostrar
    const textoIndice = Math.floor(Math.random() * textos.length); 
    const texto = textos[textoIndice];
    // separamos el texto en un array de palabras
    palabras = texto.split(' ');
    // reestablemos el idice de palabras para el seguimiento
    palabraIndice = 0;
  
    // Actualizamos la interfaz de usuario
    // Creamos una matriz con los elementos span de nuestro HTML para poder definirles una class
    const spanPalabras = palabras.map(function(palabra) { return `<span>${palabra} </span>`});
    // Convertimos a string y lo definimos como innerHTML en el texto de ejemplo a mostrar
    textoElemento.innerHTML = spanPalabras.join('');
    // Resaltamos la primer palabra
    textoElemento.childNodes[0].className = 'highlight';
    // Borramos los mensajes previos
    messageElement.innerText = '';
  
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
    const currentWord = palabras[palabraIndice];
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
      palabraIndice++;
      // reiniciamos el estado de todas las clases para los textos
      for (const palabraElemento of textoElemento.childNodes) {
        palabraElemento.className = '';
      }
      // resaltamos la palabra actual
      textoElemento.childNodes[palabraIndice].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // correcta actual
      // resaltar la siguiente palabra
      typedValueElement.className = '';
    } else {
      // estado error
      typedValueElement.className = 'error';
    }
  });