function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault(); // Permitir que se suelte
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    var dropTarget = ev.target;

    // Verificar si el objetivo es una caja de caída
    if (dropTarget.className === "drop-box") {
        dropTarget.appendChild(draggedElement);
        draggedElement.setAttribute("draggable", "false"); // Deshabilitar arrastre después de soltar
        draggedElement.style.cursor = "default"; // Cambiar el cursor
    }
}

function checkAnswers() {
    let correct = 0;

    // Verificar la respuesta para la introducción
    if (document.getElementById("introduccion").contains(document.getElementById("c1"))) {
        document.getElementById("introduccion").classList.add("correct");
        correct++;
    } else {
        document.getElementById("introduccion").classList.add("incorrect");
        document.getElementById("c1").style.border = "2px solid red"; // Resaltar con borde rojo
    }

    // Verificar la respuesta para el desarrollo
    if (document.getElementById("desarrollo").contains(document.getElementById("c2"))) {
        document.getElementById("desarrollo").classList.add("correct");
        correct++;
    } else {
        document.getElementById("desarrollo").classList.add("incorrect");
        document.getElementById("c2").style.border = "2px solid red"; // Resaltar con borde rojo
    }

    // Verificar la respuesta para la conclusión
    if (document.getElementById("conclusion").contains(document.getElementById("c3"))) {
        document.getElementById("conclusion").classList.add("correct");
        correct++;
    } else {
        document.getElementById("conclusion").classList.add("incorrect");
        document.getElementById("c3").style.border = "2px solid red"; // Resaltar con borde rojo
    }

    // Mostrar un mensaje en lugar de alertas
    const resultadoText = correct === 3 
      ? "¡Felicidades! Has completado el juego correctamente." 
      : "Algunas respuestas son incorrectas. Intenta de nuevo.";
    
    document.getElementById('resultado').innerText = resultadoText;
}

function reiniciarJuego() {
    // Restablecer las respuestas seleccionadas
    const radios = document.querySelectorAll('input[type=radio]');
    radios.forEach(radio => {
        radio.checked = false; // Desmarcar todos los radio buttons
    });

    // Limpiar los mensajes de resultado
    document.getElementById('resultado').innerText = '';

    // Limpiar las cajas de arrastre y restaurar texto original
    const dropBoxes = document.querySelectorAll('.drop-box');
    dropBoxes.forEach(box => {
        box.innerHTML = box.querySelector('p').innerHTML; // Restaurar texto original
        box.classList.remove("correct", "incorrect"); // Eliminar clases de corrección
    });

    // Restaurar los elementos arrastrables a su contenedor original
    const draggableContainer = document.querySelector('.draggable-container');
    
    // Limpiar el contenedor actual
    draggableContainer.innerHTML = ''; 

   // Crear elementos arrastrables nuevamente
   const originalDraggables = [
       { id: "c1", text: "Presenta el tema y contexto." },
       { id: "c2", text: "Desarrolla los argumentos y evidencia." },
       { id: "c3", text: "Resume las ideas y cierra el tema." }
   ];

   originalDraggables.forEach(item => {
       const div = document.createElement('div');
       div.id = item.id;
       div.className = 'draggable';
       div.draggable = true;
       div.ondragstart = function(ev) { drag(ev); };
       div.textContent = item.text; // Agregar texto
       draggableContainer.appendChild(div); // Añadir al contenedor
   });
}

// Añadir la funcionalidad de soltar en los bloques.
const dropboxes = document.querySelectorAll('.drop-box');
dropboxes.forEach(box => box.addEventListener('drop', drop));
dropboxes.forEach(box => box.addEventListener('dragover', allowDrop));