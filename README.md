# Utileria — Librería JS para la validación de formularios.

## General
**Utileria** es una librería de funciones JavaScript puras para validar datos básicos en formularios web: nombres, correos electrónicos, contraseñas, fechas de nacimiento, edad, telefono y CURP mexicano.

## Problema que resuelve:
Al crear un formulario de login se termina repitiendo código para validar que por ejemplo un correo electronico tenga el formato correcto, que la contraseña sea segura, que el usuario sea mayor de edad, etc. **Utileria** centraliza toda la lógica de validación en un solo archivo (`utileria.js`) con funciones puras, reutilizables y fáciles de probar, para no tener que reescribir validaciones en cada proyecto a desarrollar.

Este repositorio incluye dos vistas de ejemplo funcionando con la librería:
- `index.html` para formulario de registro de alumno (con modal de confirmación).
- `login.html` para formulario de login con validación de correo y contraseña segura.

---

## Instalación
Incluir el archivo `utileria.js` en el HTML antes del script donde se vayan a usar las funciones con:

```html
<script src="js/utileria.js"></script>
```

Como son funciones puras en JavaScript, no requieren ningún framework, ni dependencias externas.

---

## Uso

A continuación, ejemplos reales de cómo se usa cada función de la librería.

### Validar correo electrónico

```javascript
function validarCorreo(correo){
    let correoValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return correoValido.test(correo);
}

// Ejemplo de uso
validarCorreo("melissa@correo.com"); // true
validarCorreo("melissa@correo");     // false
```

### Validar que un texto contenga solo letras

```javascript
function soloLetras(texto){
    let letrasValidas = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return letrasValidas.test(texto);
}

// Ejemplo de uso
soloLetras("Melissa Gandarillas"); // true
soloLetras("Melissa123");          // false
```

### Validar longitud máxima de un número

```javascript
function validarLongitud(numero, maxLongitud){
    let texto = numero.toString();
    let cantidadDigitos = texto.length;
    if(cantidadDigitos <= maxLongitud){
        return true;
    }else{
        return false;
    }
}

// Ejemplo de uso
validarLongitud(9512234567, 10); // true
```

### Calcular edad a partir de una fecha de nacimiento

```javascript
function calcularEdad(fechaNacimiento){
    let fechaHoy = new Date();
    let fechaCumple = new Date(fechaNacimiento);
    let edad = fechaHoy.getFullYear() - fechaCumple.getFullYear();
    let meses = fechaHoy.getMonth() - fechaCumple.getMonth();
    if(meses < 0 || (meses === 0 && fechaHoy.getDate() < fechaCumple.getDate())){
        edad = edad - 1;
    }
    return edad;
}

// Ejemplo de uso
calcularEdad("2000-05-14"); // 26 (dependiendo de la fecha actual)
```

### Validar que sea mayor de edad

```javascript
function esMayorDeEdad(fechaNacimiento){
    let edadPosible = calcularEdad(fechaNacimiento);
    if(edadPosible >= 18){
        return true;
    }else{
        return false;
    }
}

// Ejemplo de uso
esMayorDeEdad("2010-01-01"); // false
```

### Validar contraseña segura

```javascript
function validarPassword(password){
    if(password.length < 8){return false}
    if(!/[A-Z]/.test(password)){ return false;}
    if(!/[a-z]/.test(password)){return false;}
    if(!/[0-9]/.test(password)){return false;}
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)){return false;}
    return true;
}

// Ejemplo de uso
validarPassword("Melissa123!"); // true
validarPassword("melissa");     // false
```

### Validar que una fecha no sea del futuro

```javascript
function validarFechaNoFuturo(fechaEnFormato){
    let edadCalculada = calcularEdad(fechaEnFormato);
    if(edadCalculada < 0 || isNaN(edadCalculada)){return false;}
    return true;
}

// Ejemplo de uso
validarFechaNoFuturo("2030-01-01"); // false
```

### Validar CURP mexicano

```javascript
function validarCurp(curp){
    let curpReal = curp.trim().toUpperCase();
    let curpPatron = /^[A-Z]{4}[0-9]{6}[A-Z]{6}[A-Z0-9]{2}$/;
    if(!curpPatron.test(curpReal)){return false;}

    let ann = curpReal.substring(4,6);
    let mes = curpReal.substring(6,8);
    let dia = curpReal.substring(8,10);
    let annCompleto;
    if(parseInt(ann) <= 26){annCompleto = "20" + ann;}
    else{annCompleto = "19" + ann;}
    let fechaFiltrada = annCompleto + "-" + mes + "-" + dia;
    return validarFechaNoFuturo(fechaFiltrada);
}

// Ejemplo de uso
validarCurp("GARM000514HOCNXL05"); // true o false según la fecha
```

### Validar teléfono celular (10 dígitos)

```javascript
function validarTelefono(telefono){
    let telefonoReal = telefono.toString().trim().replace(/[- ]/g, "");
    let telefonoValido = /^[0-9]{10}$/;
    return telefonoValido.test(telefonoReal);
}

// Ejemplo de uso
validarTelefono("951 223 4567"); // true
```

---

## Capturas de pantalla
