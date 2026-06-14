// const canvas = document.querySelector("#wallpaper");
// const gl = canvas.getContext("webgl");

// if (!gl) {
//     alert('Seu navegador não roda OpenGL')
//     window.open('https://youtu.be/dQw4w9WgXcQ?si=Y7L0RtQy0-JVGBm9&autoplay=1','_self')
// } else {
//     console.log('seu navegador é bom')
// }

// const vertex = ` // eu ODEIO não poder importar esse conteúdo em pleno 2026
// attribute vec4 vertexPosition;
// attribute vec3 vertexColor;

// uniform mat4 projection;
// uniform vec4 location;
// varying vec4 pos;

// void main() {
// 	gl_Position.w = 1.0;
// 	gl_Position = (location + vertexPosition) * projection;
// 	pos = gl_Position;
// }`;

// const fragment = `
// precision mediump float;
// varying vec4 pos;
// void main() {
// 	// gl_FragColor = vec4(0,128.0/255.0,128.0/255.0,1);
// 	gl_FragColor.a = 1.0;
// 	float k = 10.0;
// 	if( 1.0 < mod((pos.x+1.0)*k,2.0)){
// 		if( sin(pos.y*8.0) < mod((pos.x+1.0)*k,1.0) * 2.0 - 1.0 ){
// 			gl_FragColor.b = 1.0;
// 			gl_FragColor.a = 0.2;
// 		} else {
// 			gl_FragColor.a = 0.0;
// 		}
// 	} else {
// 		if( sin(-pos.y*8.0 + radians(180.0)) > mod((pos.x+1.0)*k,1.0) * 2.0 - 1.0 ){
// 			gl_FragColor.b = 1.0;
// 			gl_FragColor.a = 0.2;
// 		} else {
// 			gl_FragColor.a = 0.0;
// 		}
// 	}
	
// }
// `;

// const POLYGON = [
// 	-1,-1, 0,
// 	-1, 1, 0,
// 	 1, 1, 0,
// 	-1,-1, 0,
// 	 1,-1, 0,
// 	 1, 1, 0
// ];

// canvas.height = 800
// canvas.width = 800

// gl.clearColor(0,0,0,0);
// gl.enable(gl.DEPTH_TEST);
// gl.enable(gl.BLEND)
// gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

// gl.viewport(0,0,gl.canvas.width,gl.canvas.height)

// let aspectRatio = gl.canvas.width/gl.canvas.height;

// let vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertex);
// let fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragment);

// let shaderProg = compileProgram(gl, vertexShader, fragmentShader);
// let buffer = gl.createBuffer();

// let polygon = new Renderable(
//     POLYGON,
//     null
// ,shaderProg);

// let iteration = 0;


// let projectionMatrix = [
//     1,0,0,0,
//     0,aspectRatio,0,0,
//     0,0,1,0,
//     0,0,.5,1
// ];

// function render() {
// 	// gl.clearColor(1,0,0,0);
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
// 	polygon.draw(projectionMatrix, 1,  gl.TRIANGLES);
//     iteration++;
// }

// setInterval(function() {
//     render()
// }, 1000.0/60.0);