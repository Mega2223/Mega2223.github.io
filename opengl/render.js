function compileShader(gl, type, src){
    let shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log("COULD NOT COMPILE SHADER " + type)
    console.log(gl.getShaderInfoLog(shader));
    console.log("DATA: \n" + src)
    gl.deleteShader(shader);
}

function compileProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

class Renderable {
    vertices; colors;
    vert_vbo = -1; color_vbo = -1;
    vert_loc = -1; colors_loc = -1;
    proj_mat_loc = -1;
    shaderProg;
    constructor(vertices, colors, shaderProgram) {
        this.vertices = vertices;
        this.colors = colors;
        this.shaderProg = shaderProgram;
        this.genBuffers();
    }
    genBuffers(){
        this.vert_loc =  gl.getAttribLocation(this.shaderProg,"vertexPosition");
        this.colors_loc = gl.getAttribLocation(this.shaderProg,"vertexColor");
        this.proj_mat_loc = gl.getUniformLocation(this.shaderProg,"projection")
        this.vert_vbo = gl.createBuffer();
        this.color_vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vert_vbo)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_vbo)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
    }
    setUniforms(){}
    draw(projMat){
        gl.useProgram(this.shaderProg);
        gl.uniformMatrix4fv(this.proj_mat_loc,false,projMat);
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.color_vbo)
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vert_vbo)
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length/3);
        gl.disableVertexAttribArray(1);
        gl.disableVertexAttribArray(0);
    }
}
