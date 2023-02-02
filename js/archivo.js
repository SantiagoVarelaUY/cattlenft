let resultado = 8;
let meses = 10;
function sumar (numerouno, numerodos) {
    return numerouno * numerodos
}
let socio = prompt ("¿Ya sos socio? S/N");
while (socio !="S"){
    let cuota = prompt ("Eliga una suscripcion. Anual (A), mensual (M).");
    if (cuota=="M") {
        alert ("El precio de la suscripcion mensual son 8 USD por mes");
        resultado = 8;
        socio = "S";
        alert ("Debera abonar: " + resultado);
    }
    else {
        alert ("Eligio la suscrpicon anual, se le aplica una promocion de 2 meses de regalo.");
        resultado = sumar (resultado,meses);
        socio = "S";
        alert ("Debera abonar: " + resultado);
    }

} 

alert ("¡GRACIAS POR ELEGIRNOS!")