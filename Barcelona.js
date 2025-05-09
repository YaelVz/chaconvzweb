const respuestasCorrectas = ["1899", "Camp Nou", "5", "Lionel Messi", "Barça"];
let puntosPorPregunta = [];
let grafica = null;

document.getElementById("formulario-quiz").addEventListener("submit", function (e) {
  e.preventDefault();

  const datos = new FormData(this);
  let puntajeTotal = 0;
  puntosPorPregunta = [];

  respuestasCorrectas.forEach((respuestaCorrecta, indice) => {
    const respuestaUsuario = (datos.get("q" + (indice + 1)) || "").trim().toLowerCase();
    const respuestaValida = respuestaCorrecta.toLowerCase();

    if (respuestaUsuario === respuestaValida) {
      puntajeTotal++;
      puntosPorPregunta.push(1);
    } else {
      puntosPorPregunta.push(0);
    }
  });

  document.getElementById("puntaje").textContent = `Tu puntuación es: ${puntajeTotal}/5`;
  document.getElementById("boton-pdf").style.display = "block";

  mostrarGrafica(puntosPorPregunta);
  guardarResultado(puntajeTotal, puntosPorPregunta);
});

function mostrarGrafica(puntos) {
  const ctx = document.getElementById("grafica").getContext("2d");
  if (grafica) grafica.destroy();

  grafica = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["P1", "P2", "P3", "P4", "P5"],
      datasets: [{
        label: "Puntos por pregunta",
        data: puntos,
        backgroundColor: puntos.map(p => p ? "green" : "red")
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 1
        }
      }
    }
  });
}

function guardarResultado(puntaje, detalles) {
  const historial = JSON.parse(localStorage.getItem("resultadosFCB")) || [];
  const nuevoRegistro = {
    fecha: new Date().toLocaleString(),
    puntaje: puntaje,
    detalles: detalles
  };
  historial.push(nuevoRegistro);
  localStorage.setItem("resultadosFCB", JSON.stringify(historial));
}

function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Resultados del Quiz FC Barcelona", 10, 20);

  respuestasCorrectas.forEach((_, i) => {
    const resultado = puntosPorPregunta[i] ? "Correcto" : "Incorrecto";
    doc.text(`${i + 1}. ${resultado}`, 10, 30 + i * 10);
  });

  const total = puntosPorPregunta.reduce((a, b) => a + b, 0);
  doc.text(`Puntaje total: ${total}/5`, 10, 90);

  const canvas = document.getElementById("grafica");
  const imagen = canvas.toDataURL("image/png");
  doc.addImage(imagen, "PNG", 10, 100, 180, 80);

  doc.save("resultado_fcbarcelona.pdf");
}
