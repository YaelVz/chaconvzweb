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

  calcularTotal();

  const fechaHora = new Date().toLocaleString("es-MX");
  const numPedido = "TS" + Math.floor(100000 + Math.random() * 900000); // TS123456

  // Logo base64 (ejemplo de 60x60 px) o cambia por tu URL si prefieres
  const logoURL = "Logo.png"; // Usa una imagen en línea o tu propia en base64 si deseas evitar errores

  // Cargar imagen (usando promesa para esperar que cargue)
  const img = new Image();
  img.src = logoURL;
  img.onload = function () {
    doc.setFillColor(230, 230, 255); // Fondo encabezado
    doc.rect(0, 0, 210, 40, 'F'); // fondo azul claro

    // Agregar logo (ajusta posición/tamaño si es necesario)
    doc.addImage(img, 'PNG', 15, 10, 20, 20);

    // Título y encabezado
    doc.setTextColor(0, 0, 102); // Azul oscuro
    doc.setFontSize(20);
    doc.text("TacoScript", 105, 18, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Fecha y hora: ${fechaHora}`, 140, 10);
    doc.text(`Pedido No: ${numPedido}`, 140, 16);

    let y = 45;
    doc.setFontSize(12);
    doc.text(`Cliente: ${nombre}`, 20, y); y += 8;
    doc.text(`Correo: ${email}`, 20, y); y += 10;

    doc.setDrawColor(100);
    doc.line(20, y, 190, y); y += 10;

    doc.setTextColor(0, 0, 102);
    doc.setFont(undefined, "bold");
    doc.text("Producto", 20, y);
    doc.text("Cantidad", 170, y, { align: "right" });
    doc.setFont(undefined, "normal");
    doc.setTextColor(0); y += 7;

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

    productos.forEach(([prod, cantidad]) => {
      if (parseInt(cantidad) > 0) {
        doc.text(prod, 20, y);
        doc.text(`${cantidad}`, 170, y, { align: "right" });
        y += 7;
      }
    });

    y += 10;
    doc.setDrawColor(0);
    doc.line(20, y, 190, y); y += 10;

    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 100, 0); // Verde oscuro
    doc.setFontSize(14);
    doc.text(`Total a pagar: $${totalFinal}`, 20, y);

    // Descargar PDF
    doc.save("comprobante_TacoScript.pdf");

    // Enviar por EmailJS
    const pdfBase64 = doc.output("datauristring");
    emailjs.send("taco_script", "__ejs-test-mail-service__", {
      nombre: nombre,
      email: email,
      pdf: pdfBase64,
      pedido: numPedido,
      fecha: fechaHora
    })
    .then(() => {
      alert("¡Comprobante enviado al correo y descargado exitosamente!");
    })
    .catch((error) => {
      console.error("Error al enviar correo:", error);
      alert("Hubo un problema al enviar el comprobante.");
    });
  };

  img.onerror = function () {
    alert("Error al cargar el logotipo. Asegúrate que 'Logo.png' existe o usa una URL.");
  };
}


