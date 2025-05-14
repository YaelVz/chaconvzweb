let totalFinal = 0;

function calcularTotal() {
  const c1 = parseInt(document.getElementById("cant1").value) || null;
  const c2 = parseInt(document.getElementById("cant2").value) || null;
  const c3 = parseInt(document.getElementById("cant3").value) || null;
  const c4 = parseInt(document.getElementById("cant4").value) || null;
  const c5 = parseInt(document.getElementById("cant5").value) || null;
  const c6 = parseInt(document.getElementById("cant6").value) || 0;
  const c7 = parseInt(document.getElementById("cant7").value) || 0;
  const c8 = parseInt(document.getElementById("cant8").value) || 0;
  const c9 = parseInt(document.getElementById("cant9").value) || 0;
  const c10 = parseInt(document.getElementById("cant10").value) || 0;
  const c11 = parseInt(document.getElementById("cant11").value) || 0;

  const total = (c1 * 80) + (c2 * 80) + (c3 * 60) + (c4 * 80) + (c5 * 70) +
                (c6 * 80) + (c7 * 55) + (c8 * 35) + (c9 * 35) + (c10 * 45) + (c11 * 45);
  totalFinal = total;

  document.getElementById("total").innerText = `Total a pagar: $${total}`;
}

function generarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  if (!nombre || !email) {
    alert("Por favor completa los datos del cliente.");
    return;
  }

  calcularTotal(); // Asegura que el total esté actualizado antes de generar el PDF

  const productos = [
    ["Taco Undefined", document.getElementById("cant1").value],
    ["Scope de Suadero", document.getElementById("cant2").value],
    ["QuesaSwitch (Queso)", document.getElementById("cant3").value],
    ["QuesaSwitch (Proteína)", document.getElementById("cant4").value],
    ["Arraychera", document.getElementById("cant5").value],
    ["Imelda'special", document.getElementById("cant6").value],
    ["Bistek code", document.getElementById("cant7").value],
    ["Horchatml", document.getElementById("cant8").value],
    ["Agua de Java-maica", document.getElementById("cant9").value],
    ["SodaScript", document.getElementById("cant10").value],
    ["FizzBuzz Limón", document.getElementById("cant11").value]
  ];

  let y = 20;
  doc.text("Comprobante de Compra - TacoScript", 20, y); y += 10;
  doc.text(`Cliente: ${nombre}`, 20, y); y += 10;
  doc.text(`Correo: ${email}`, 20, y); y += 10;

  productos.forEach(([nombreProd, cantidad]) => {
    if (parseInt(cantidad) > 0) {
      doc.text(`${nombreProd}: ${cantidad}`, 20, y);
      y += 10;
    }
  });

  doc.text(`Total a pagar: $${totalFinal}`, 20, y + 5);

  doc.save("comprobante_TacoScript.pdf");
}