let correctas = [2, 1, 1, 1, 1];
let opcion_elegida = [];
let cantidad_correctas = 0;

function respuesta(num_pregunta, seleccionada) {
    opcion_elegida[num_pregunta] = seleccionada.value;

    let labels = document.querySelectorAll(`#p${num_pregunta} label`);
    labels.forEach(label => label.style.backgroundColor = "white");

    seleccionada.parentNode.style.backgroundColor = "#cec0fc";
}

function corregir() {
    cantidad_correctas = 0;

    for (let i = 0; i < correctas.length; i++) {
        let labels = document.querySelectorAll(`#p${i} label`);
        labels.forEach(label => label.style.backgroundColor = "white");

        if (correctas[i] != opcion_elegida[i]) {
            labels.forEach(label => {
                if (label.querySelector('input').value == opcion_elegida[i]) {
                    label.style.backgroundColor = "lightcoral";
                }
            });
        } else {
            cantidad_correctas++;
        }
    }

    if (cantidad_correctas === 0) {
        document.getElementById("resultado").innerText = "Por favor contesta las preguntas.";
    } else {
        document.getElementById("resultado").innerText = `${cantidad_correctas} de ${correctas.length}`;
    }
}



function reiniciar() {
    opcion_elegida = [];
    cantidad_correctas = 0;

    let labels = document.querySelectorAll('label');
    labels.forEach(label => label.style.backgroundColor = "white");

    document.getElementById("resultado").innerText = "";

    let radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.checked = false);
}