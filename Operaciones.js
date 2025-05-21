function sumar(){
	var n1=document.getElementById("num1").value;
	var n2=document.getElementById("num2").value;
	// parseInt()  parseFloat()
	var result=parseInt(n1)+parseInt(n2);
	document.getElementById("r").innerHTML=result;
}

function resta(){
	var n1=document.getElementById("num1").value;
	var n2=document.getElementById("num2").value;
	// parseInt()  parseFloat()
	var result=parseInt(n1)-parseInt(n2);
	document.getElementById("r").innerHTML=result;
}

function multiplicar(){
	var n1=document.getElementById("num1").value;
	var n2=document.getElementById("num2").value;
	// parseInt()  parseFloat()
	var result=parseInt(n1)*parseInt(n2);
	document.getElementById("r").innerHTML=result;
}
function dividir(){
	var n1=document.getElementById("num1").value;
	var n2=document.getElementById("num2").value;
	// parseInt()  parseFloat()
	var result=parseInt(n1)/parseInt(n2);
	document.getElementById("r").innerHTML=result;
}