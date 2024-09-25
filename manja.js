let canvas = document.querySelector("#context");

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

var shaderPorg = compileProgram(gl,vertexShader,fragmentShader)

var vLoc = gl.getAttribLocation(shaderPorg,"vertPosAttSpace");
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)

var cube = [
    -1,-1,-1, -1,-1,1, -1,1,-1, -1,1,1,
    1,-1,-1, 1,-1,1, 1,1,-1, 1,1,1
]
for (let i = 0; i < cube.length; i++){
    cube[i] *= .5;
}

var positions = [
    .35,-.5,0,
    -.35,-.5,0,
    0,.5,0
];

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(.5,.5,.6,1);
gl.useProgram(shaderPorg);

gl.enableVertexAttribArray(vLoc);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.vertexAttribPointer(vLoc, 3, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, positions.length/3);