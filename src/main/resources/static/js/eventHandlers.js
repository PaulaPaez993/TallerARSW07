document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("blueprint-canvas");

    if (canvas) {
        // Manejador para eventos de puntero
        canvas.addEventListener("pointerdown", function(event) {
            console.log("Pointer down at: (" + event.clientX + ", " + event.clientY + ")");
            // Aquí puedes agregar el código para manejar el evento
        });

        // Manejador para eventos táctiles
        canvas.addEventListener("touchstart", function(event) {
            var touch = event.touches[0];
            console.log("Touch start at: (" + touch.clientX + ", " + touch.clientY + ")");
            // Aquí puedes agregar el código para manejar el evento
        });

        // Manejador para eventos de mouse
        canvas.addEventListener("mousedown", function(event) {
            console.log("Mouse down at: (" + event.clientX + ", " + event.clientY + ")");
            // Aquí puedes agregar el código para manejar el evento
        });
    } else {
        console.error("Canvas element not found!");
    }
});
