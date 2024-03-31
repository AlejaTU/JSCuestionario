"use strict";

//ponemos los datos como objetos

const datos = [
  {
    question: "¿Cuántos brazos tiene una estrella de mar común?",
    option: ["uno", "siete", "cinco", "cuatro"],
    answer: "cinco",
  },
  {
    question: "¿Qué forma tienen los fósiles anmonoideos?",
    option: ["redonda", "espiral", "cuadrada", "triangular"],
    answer: "espiral",
  },
  {
    question: "¿Cuál es el pájaro más grande del mundo?",
    option: ["aguila", "avestruz", "golondrina", "condor"],
    answer: "avestruz",
  },
  {
    question:
      " ¿Porqué característica física de los gatos que llamó así al pez gato o siluro?",
    option: ["Por el pico", "por las patas", "por los ojos", "por los bigotes"],
    answer: "por los bigotes",
  },
];

//crear las variables que vamos a ir utiliando para referenciar los elementos del dom

const btnEmpezar = document.querySelector(".btn-empezar");
const comienzo = document.querySelector(".comienzo");

const siguiente = document.querySelector(".continuar");

const salir = document.querySelector(".salir");

const quizbox = document.querySelector(".quiz-box");
const opciones = document.querySelector(".opciones");

//el boton de empezar anadira y removera la clase hidden para mostrar la siguiente pantalla que son las preguntas
btnEmpezar.addEventListener("click", function () {
  comienzo.classList.add("hidden");
  quizbox.classList.remove("hidden");
  siguiente.classList.remove("hidden");
  salir.classList.remove("hidden");
  mostrarPregunta(preguntaActualIndex);
});

//boton para salir y volver a la pantalla inicial
salir.onclick = function () {
  quizbox.classList.add("hidden");
  comienzo.classList.remove("hidden");
  puntuacion = 0;
  preguntaActualIndex = 0;
  respuestaSeleccionada = false;
  siguiente.disabled = true;
  comienzo.classList.remove("hidden");
  document.querySelector(".resultado").classList.add("hidden"); // Ocultar resultados
  mostrarPregunta(preguntaActualIndex);
  quizbox.classList.add("hidden");
  siguiente.classList.remove("hidden");
};

// variables para ver el indice de las preguntas y la puntuacion de cada
let preguntaActualIndex = 0;
let puntuacion = 0;

// muestra la pregunta actual y sus opciones a traves de los datos guardados en los objetos
function mostrarPregunta(index) {
  const preguntaActual = datos[index];
  const quizBox = document.querySelector(".quiz-box");
  const questionElement = quizBox.querySelector(".question");
  const opcionesContainer = quizBox.querySelector("section.flex");

  // Limpia el contenedor de opciones para la nueva pregunta
  opcionesContainer.innerHTML = "";

  // Establece la pregunta y las opciones
  questionElement.innerHTML = preguntaActual.question;
  preguntaActual.option.forEach((opcion, opcionIndex) => {
    const opcionElement = document.createElement("div");
    opcionElement.classList.add(
      "opciones",
      "p-4",
      "mb-4",
      "bg-white",
      "w-96",
      "shadow-md",
      "hover:bg-yellow-400"
    );
    opcionElement.innerText = opcion;
    opcionElement.addEventListener("click", () =>
      seleccionarOpcion(opcion, preguntaActual.answer)
    );
    opcionesContainer.appendChild(opcionElement);
  });

  // Actualiza el contador de preguntas
  const header = quizBox.querySelector("header");
  header.querySelector("p").innerText = `Pregunta ${index + 1} de ${
    datos.length
  }`;
}

// Función para manejar la opcion seleccionada
// Variable global para controlar si ya se selecciono
let respuestaSeleccionada = false;

function seleccionarOpcion(opcion, respuestaCorrecta) {
  // Verificar si ya se seleccionó una opción
  if (respuestaSeleccionada) return;
  respuestaSeleccionada = true;

  const opciones = document.querySelectorAll(".opciones");
  opciones.forEach((op) => {
    op.disabled = true;
    if (op.innerText === opcion) {
      // Aplicar color solo a la  seleccionada
      op.classList.add(
        op.innerText === respuestaCorrecta ? "bg-green-500" : "bg-red-500"
      );
      if (op.innerText === respuestaCorrecta) {
        puntuacion++;
      }
    }
  });

  siguiente.disabled = false; // Habilitar el botón "Siguiente"
}

// Función para mostrar los resultados al finalizar el quiz
function mostrarResultados() {
  quizbox.classList.add("hidden");
  const resultado = document.querySelector(".resultado");
  const botonReiniciar = resultado.querySelector(".again");
  resultado.innerHTML = `<p>Tu puntuación es: ${puntuacion} de ${datos.length}</p>`;
  botonReiniciar.classList.remove("hidden");

  // Agrega funcionalidad al botón para reiniciar el quiz
  botonReiniciar.addEventListener("click", () => {
    puntuacion = 0;
    preguntaActualIndex = 0;
    comienzo.classList.remove("hidden");
    resultado.classList.add("hidden");
    botonReiniciar.classList.add("hidden");
    mostrarPregunta(preguntaActualIndex);
  });
}

siguiente.addEventListener("click", () => {
  if (preguntaActualIndex < datos.length - 1) {
    preguntaActualIndex++;
    mostrarPregunta(preguntaActualIndex);
    respuestaSeleccionada = false;
    siguiente.disabled = true; //
  } else {
    mostrarResultados();
  }
});

function mostrarResultados() {
  quizbox.classList.add("hidden"); // Ocultar el cuestionario
  salir.classList.add("hidden"); // Ocultar el boton salir
  siguiente.classList.add("hidden");
  const resultado = document.querySelector(".resultado");
  resultado.classList.remove("hidden");
  document.getElementById("finalScore").innerText = puntuacion;
}

document.querySelector(".again").addEventListener("click", function () {
  puntuacion = 0;
  preguntaActualIndex = 0;
  respuestaSeleccionada = false;
  siguiente.disabled = true;
  comienzo.classList.remove("hidden");
  document.querySelector(".resultado").classList.add("hidden");
  mostrarPregunta(preguntaActualIndex); //
  quizbox.classList.add("hidden");
  siguiente.classList.add("hidden");
});

// Inicia el quiz
mostrarPregunta(preguntaActualIndex);
