const canvas = document.querySelector("#context");

var gl = canvas.getContext("webgl");

if (!gl) {
    window.open('https://youtu.be/dQw4w9WgXcQ?si=Y7L0RtQy0-JVGBm9&autoplay=1','_self')
    alert('seu navegador é ruim')
} else {
    console.log('seu navegador é bom')
}

function compileShader(gl, type, src){
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log("COULD NOT COMPILE SHADER " + type)
    console.log(gl.getShaderInfoLog(shader));
    console.log("DATA: \n" + src)
    gl.deleteShader(shader);
}

function compileProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

var vertexShader = compileShader(gl, gl.VERTEX_SHADER, document.querySelector("#vertex-shader").text)
var fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, document.querySelector("#fragment-shader").text)

var shaderProg = compileProgram(gl,vertexShader,fragmentShader)

var vLoc = gl.getAttribLocation(shaderProg,"vertPosAttSpace");
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

var positions = [];
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

console.log(positions)


gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

function generateRotationMatrix(rX, rY, rZ) {
    let sX = Math.sin(rX);
    let sY = Math.sin(rY);
    let sZ = Math.sin(rZ);
    let cX = Math.cos(rX);
    let cY = Math.cos(rY);
    let cZ = Math.cos(rZ);

    resultMat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    resultMat4[0] = cZ * cY;
    resultMat4[1] = cZ * sY * sX - sZ * cX;
    resultMat4[2] = cZ * sY * cX + sZ * sX;

    resultMat4[4] = sZ * cY;
    resultMat4[5] = sZ * sY * sX + cZ * cX;
    resultMat4[6] = sZ * sY * cX - cZ * sX;

    resultMat4[8] = -sY;
    resultMat4[9] = cY * sX;
    resultMat4[10] = cY * cX;

    resultMat4[15] = 1;
    return resultMat4
}

let rot = [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,0,1
]
const loc = gl.getUniformLocation(shaderProg,"rotation");

function render(){
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(.5,.5,.6,1);
    gl.useProgram(shaderProg);
    gl.uniformMatrix4fv(loc,false,rot);
    gl.enableVertexAttribArray(vLoc);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.vertexAttribPointer(vLoc, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINES, 0, positions.length/3);
}

rot = generateRotationMatrix(.5,.25,.5)
let g = 0.0
console.log(rot)
document.addEventListener("mousemove",() => {
    rot = generateRotationMatrix(g*0.01,g*0.007,0.00345)
    g++
    render()
})
render()