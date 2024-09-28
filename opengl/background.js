const canvas = document.querySelector("#context");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert('seu navegador é ruim')
    window.open('https://youtu.be/dQw4w9WgXcQ?si=Y7L0RtQy0-JVGBm9&autoplay=1','_self')
} else {
    console.log('seu navegador é bom')
}

canvas.height = 600
canvas.width = 600

gl.clearColor(0,0,0,0);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.BLEND)
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

gl.viewport(0,0,gl.canvas.width,gl.canvas.height)

let aspectRatio = gl.canvas.width/gl.canvas.height;

let vertexShader = compileShader(gl, gl.VERTEX_SHADER, document.querySelector("#vertex-shader").text)
let fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, document.querySelector("#fragment-shader").text)

let shaderProg = compileProgram(gl,vertexShader,fragmentShader)
gl.getAttribLocation(shaderProg,"vertexPosition");
let buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

let positions = [];
const square = [
    -1,-1,-1,
    -1,-1,1,
    -1,1,-1,
    -1,1,1,
    1,-1,-1,
    1,-1,1,
    1,1,-1,
    1,1,1
];

for (let i = 0; i < square.length; i+=3){
    for (let j = 0; j < square.length; j+=3){
        if(i===j){continue;}
        let x1 = square[i]; let y1 = square[i+1];
        let z1 = square[i+2];
        let x2 = square[j]; let y2 = square[j+1];
        let z2 = square[j+2];
        if(Math.sqrt((x1-x2)**2 + (y1-y2)**2 + (z1-z2)**2) > 2.3){continue;}
        positions.push(x1,y1,z1)
        positions.push(x2,y2,z2)
    }
}

for (let i =0; i < positions.length; i++){
    positions[i]*=.5;
}

cube = new Renderable(
    positions,
    positions
,shaderProg);

let projectionMatrix = [
    .5,0,0,0,
    0,.5/**aspectRatio*/,0,0,
    0,0,.5,0,
    0,0,.5,1
];

let objects = [cube]

let iteration = 0;
function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
projectionMatrix = generateRotationMatrix(Math.exp(1)+iteration*0.0033,2+iteration*0.0031,1.7+iteration*0.0028)
    for (let i = 0; i < objects.length; i++){
        objects[i].draw(projectionMatrix)
    }
    if(objects.length > 100){
        objects.shift()
    }
    iteration++;
}

// document.addEventListener("mousemove",()=>{
//     render()
// });
setInterval(function() {
    render()
}, 1000.0/60.0);