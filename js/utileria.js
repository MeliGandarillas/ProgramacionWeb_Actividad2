//funciones puras
//boolean
function validarCorreo(correo){
    let correoValido= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return correoValido.test(correo);
}
//boolean
function soloLetras(texto){
    let letrasValidas= /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return letrasValidas.test(texto);
}
//boolean
function validarLongitud(numero, maxLongitud){
    let texto= numero.toString();
    let cantidadDigitos= texto.length;
    if(cantidadDigitos <= maxLongitud){
        return true;
    }else{
        return false;
    }
}
//numero entero
function calcularEdad(fechaNacimiento){
    let fechaHoy= new Date();
    let fechaCumple= new Date(fechaNacimiento);
    let edad= fechaHoy.getFullYear() - fechaCumple.getFullYear();
    let meses= fechaHoy.getMonth() - fechaCumple.getMonth();
    if(meses <0 ||(meses===0 && fechaHoy.getDate() <fechaCumple.getDate()) ){
        edad= edad - 1;
    }
    return edad;
}
//boolean
function esMayorDeEdad(fechaNacimiento){
    let edadPosible= calcularEdad(fechaNacimiento);
    if(edadPosible >= 18){
        return true;
    }else{ return false;}
}
//boolean
function validarPassword(password){
    if(password.length <8){return false}
    if(!/[A-Z]/.test(password)){ return false;}
    if(!/[a-z]/.test(password)){return false;}
    if(!/[0-9]/.test(password)){return false;}
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){return false;}
    return true;
}

//funciones extras
//validar que la fecha no sea del futuro, boolean
function validarFechaNoFuturo(fechaEnFormato){
    let edadCalculada= calcularEdad(fechaEnFormato);
    if(edadCalculada<0 || isNaN(edadCalculada)){return false;}
    return true;
}
//validar curp, boolean
function validarCurp(curp){
    let curpReal= curp.trim().toUpperCase();
    let curpPatron= /^[A-Z]{4}[0-9]{6}[A-Z]{6}[A-Z0-9]{2}$/;
    if(!curpPatron.test(curpReal)){return false;}
    //que la fecha no sea del futuro
    let ann= curpReal.substring(4,6);
    let mes= curpReal.substring(6,8);
    let dia= curpReal.substring(8,10);
    let annCompleto;
    if(parseInt(ann)<=26){annCompleto= "20" + ann;}
    else{annCompleto= "19" + ann;}
    let fechaFiltrada= annCompleto+"-"+mes+"-"+dia;
    return validarFechaNoFuturo(fechaFiltrada);
}
//validar y limpiar telefono, boolean
function validarTelefono(telefono){
    let telefonoReal= telefono.toString().trim().replace(/[- ]/g, "");
    let telefonoValido= /^[0-9]{10}$/;
    return telefonoValido.test(telefonoReal);
}
