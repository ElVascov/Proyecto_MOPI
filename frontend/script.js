const jugadores = document.querySelectorAll(".jugador");
const encuestas = document.querySelectorAll(".encuesta");

let imagenActual = null;

// ocultar todas las encuestas
function ocultarEncuestas() {
    encuestas.forEach(e => e.style.display = "none");
}

// detectar clic en cualquier imagen
jugadores.forEach(imagen => {
    imagen.addEventListener("click", () => {
        ocultarEncuestas();
        imagenActual = imagen;

        let encuesta;

        if (imagen.closest(".delanteros")) {
            encuesta = document.getElementById("encuesta-delanteros");
        } else if (imagen.closest(".centrocampistas")) {
            encuesta = document.getElementById("encuesta-centrocampistas");
        } else if (imagen.closest(".defensas")) {
            encuesta = document.getElementById("encuesta-defensas");
        } else if (imagen.closest(".portero")) {
            encuesta = document.getElementById("encuesta-portero");
        }

        if (encuesta) {
            const rect = imagen.getBoundingClientRect();

            encuesta.style.display = "block";
            encuesta.style.top = `${rect.bottom + window.scrollY + 10}px`;
            encuesta.style.left = `${rect.left + window.scrollX}px`;
        }
    });
});


// cambiar imagen según encuesta
encuestas.forEach(encuesta => {
    const select = encuesta.querySelector("select");

    select.addEventListener("change", () => {
        if (select.value === "" || !imagenActual) return;

        imagenActual.src = `../imagenes/${select.value}.png`;
        ocultarEncuestas();
        select.value = "";
    });
});

// deje de ver encuesta al dar fuera de las imagenes
document.addEventListener("click", (e) => {
    const clicEnImagen = e.target.classList.contains("jugador");
    const clicEnEncuesta = e.target.closest(".encuesta");

    if (!clicEnImagen && !clicEnEncuesta) {
        ocultarEncuestas();
        imagenActual = null;
    }
});
