const canvas = document.querySelector("#context");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert('seu navegador é ruim')
    window.open('https://youtu.be/dQw4w9WgXcQ?si=Y7L0RtQy0-JVGBm9&autoplay=1','_self')
} else {
    console.log('seu navegador é bom')
}

gl.clearColor(.5,.5,.6,1);
gl.enable(gl.DEPTH_TEST)

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
    0,.5,0,0,
    0,0,.5,0,
    0,0,.5,1
];

let objects = [cube]

document.addEventListener("mousemove",()=>{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for (let i = 0; i < objects.length; i++){
        objects[i].draw(projectionMatrix)
        objects[i].coords[2] += 0.1
    }
    if(Math.random() > .9){
        let obj = new Renderable(positions,positions,shaderProg);
        obj.coords[0] = 10*(Math.random() - .5)
        obj.coords[1] = 10*(Math.random() - .5)
        obj.coords[2] = -1
        console.log(obj.coords)
        objects.push(obj)
    }
});

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
cube.draw(
    projectionMatrix
)