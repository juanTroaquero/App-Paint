const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillcolor = document.querySelector("#fill-color"),
sizeSilder = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
downloadCanvas = document.querySelector(".download-canvas"),
//canvas1 = document.getElementById(".canvasId");
// canvas1 = document.getElementById("lienzo");
ctx = canvas.getContext("2d");

//variables globales con valor por defecto.
let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedToll = "brush",
brushWidth = 5, // definimos el ancho de la brocha.
selectedColor = "#000";


// function setCanvasBackground (canvasId) {
//     const canvas = document.getElementById("canvasId");
//     const ctx = canvas.getContext('2d');

//     const img = new Image();
//     img.src = "icons/Cuello_Utero_PNG.png";

//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//     img.onload = () => {
//         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//     };

//     canvas.addEventListener('mousedown', (e) => {
//         ctx.beginPath();
//         ctx.moveTo(e.clientX, e.clientY);
//         canvas.addEventListener('mousemove', draw);
//     });

//     canvas.addEventListener('mouseup', () => {
//         canvas.removeEventListener('mousemove', draw);
//     });

//     //startDraw();

//     function draw(e) {
//         ctx.lineTo(e.clientX, e.clientY);
//         ctx.stroke();
//     }

//     //setCanvasBackground('icons/Cuello_Utero_PNG.png');
//     //setCanvasBackground('path/to/Cuello_Utero_PNG.png', 'canvas');

// }



// let img = new Image();
// img.src = "icons/Cuello_Utero_PNG.png"; //Cuello_Utero_PNG

// ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

// img.onload = () => {
//     //ctx.fillStyle = ctx.createPattern(img, 'repeat');
//     //ctx.fillStyle = ctx.createPattern(img, 'repeat');
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//     //ctx.fillStyle = ctx.createPattern(img, 'repeat');
// };

// if (canvas1 && canvas1.getContext){
//     let ctx1 = canvas1.getContext("2d");
// 			if (ctx1) {
// 				ctx1.beginPath();
// 				ctx1.fillStyle = "#6a50b1";
// 				ctx1.fillRect(50, 40, 150, 120);
// 				ctx1.globalCompositeOperation = "destination-out";
// 				ctx1.fillRect(70, 60, 110, 60);
//     }
// }

const setCanvasBackground = () => {
    //configurando todo el fondo del lienzo en blanco, por lo que el fondo img descargado será blanco
    ctx.fillStyle = "#fff";
    //setCanvasBackground('icons/Cuello_Utero_PNG.png');
    //ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; //configurando el estilo de relleno de nuevo en el color seleccionado, será el color del pincel
}


window.addEventListener("load", () => {
    //configurando el ancho/alto del lienzo(canvas).. offsetwidth/height devuelve el ancho/alto visible de un elemento.
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e) => {
    //si el color de relleno no está marcado, dibuje un rect con borde; de ​​lo contrario, dibuje rect con fondo.
    if(!fillcolor.checked){
        //creando un círculo de acuerdo con el puntero del mouse.
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath(); //creando una nueva ruta para dibujar el círculo.
    //obtener el radio del círculo según el puntero del mouse.
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX),2) + Math.pow((prevMouseY - e.offsetY),2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); //creando un círculo de acuerdo con el puntero del mouse.
    fillcolor.checked ? ctx.fill() : ctx.stroke() //si el color de relleno está marcado, rellene el círculo, de lo contrario, dibuje el círculo del borde.
}

const drawTriangle = (e) => {
    ctx.beginPath(); // creando nuevo camino para el dibujo del teiangulo.
    ctx.moveTo(prevMouseX, prevMouseY); //moviendo el triángulo al puntero del mouse.
    ctx.lineTo(e.offsetX, e.offsetY); //creando la primera línea de acuerdo con el puntero del mouse.
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); //creando la línea inferior del triángulo.
    ctx.closePath(); //camino de cierre de un triángulo para que la tercera línea se dibuje automáticamente. / closing path of a triangle so the third line draw automatically
    fillcolor.checked ? ctx.fill() : ctx.stroke(); // si color de relleno esta marcado rellene el triangulo de lo contrario dibuje el borede del triangulo. / if fillcolor is checked fill triangle else draw border triangle.
}

const drawFlecha = (e) => {
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY - (prevMouseY - e.offsetY));
    ctx.lineTo(prevMouseX, e.offsetY);
    ctx.lineTo(e.offsetX, e.offsetY + (prevMouseY - e.offsetY));
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillcolor.checked ? ctx.fill() : ctx.stroke();
};

canvas.addEventListener('mousemove', (e) => {
    ellipseWidth = e.offsetX - prevMouseX;
    ellipseHeight = e.offsetY - prevMouseY;
});

const drawElipse = (e) => {
    ctx.beginPath();
    ctx.ellipse(prevMouseX, prevMouseY, ellipseWidth, ellipseHeight, 0, 0, 2 * Math.PI);
    ctx.closePath();
    fillcolor.checked ? ctx.fill() : ctx.stroke();
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX //pasando la posición actual de mouseX como valor prevMouseX
    prevMouseY = e.offsetY //pasando la posición actual de mouseY como valor prevMouseY
    ctx.beginPath(); //creando un nuevo camino para dibujar.
    ctx.lineWidth = brushWidth; //pasando brushSize como ancho de línea.
    ctx.strokeStyle = selectedColor; //pasando el color seleccionado como estilo de trazo
    ctx.fillStyle = selectedColor; //pasando el color seleccionado como estilo de relleno
    //copiar datos de lienzo(canvas) y pasar como valor de instantánea(snapshot)... esto evita arrastrar la imagen.
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if(!isDrawing) return; //si isDrawing es falso volver desde aquí.
    ctx.putImageData(snapshot, 0,0); //agregar datos de lienzo(canvas) copiados en este lienzo(canvas).

    if(selectedToll === "brush" /*|| selectedToll === "eraser"*/) {
        //si la herramienta seleccionada es el borrador, establezca el estilo de trazo(strokeStyle) en blanco
        //para pintar el color blanco en el contenido del lienzo existente; de ​​lo contrario, establezca el color del trazo en el color seleccionado
        ctx.strokeStyle = selectedToll === "eraser"; //? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); //creando una línea de acuerdo con el puntero del mouse.
        ctx.stroke(); //línea de dibujo/archivo con color.
    } else if (selectedToll === "renctangulo"){
        drawRect(e);
    } else if (selectedToll === "circulo"){
        drawCircle(e);
    } else if (selectedToll === "triangle"){
        drawTriangle(e);
    } else if (selectedToll === "flecha"){
        drawFlecha(e);
    } else {
        drawElipse(e);
    }
}

toolBtns.forEach (btn => {
    btn.addEventListener("click", () => { //agregar evento de clic a todas las opciones.
        //eliminando la clase activa de la anterior y agregando la opción actual en la que se hizo clic.
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedToll = btn.id;
        console.log(selectedToll);
    });
});

sizeSilder.addEventListener("change", () => brushWidth = sizeSilder.value); //pasando el valor del control deslizante como brushSize

colorBtns.forEach (btn => {
    btn.addEventListener("click", () => { //agregando evento de clic a todos los botones de color
        //eliminando la clase activa de la anterior y agregando la opción actual en la que se hizo clic.
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        //pasando el color de fondo btn seleccionado como valor de color seleccionado(selectedColor)
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});


colorPicker.addEventListener ("change", () => {
    //pasar el valor de color elegido del selector de color al último fondo btn de color
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener ("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //limpiando todo el lienzo(canvas)
    setCanvasBackground();
});

downloadCanvas.addEventListener ("click", () => {
    const link = document.createElement("a"); //creando un elemento <a>
    link.download = `${Date.now()}.jpg`; //pasar la fecha actual como valor de descarga del enlace
    link.href = canvas.toDataURL(); //pasando canvasData como valor de enlace href
    link.click(); //haciendo clic en el enlace para descargar la imagen
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);