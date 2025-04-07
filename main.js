// main.js

// Matrix functions
function mat4() { return new Float32Array(16); }
function identity(dest) {
    dest[0] = 1; dest[1] = 0; dest[2] = 0; dest[3] = 0;
    dest[4] = 0; dest[5] = 1; dest[6] = 0; dest[7] = 0;
    dest[8] = 0; dest[9] = 0; dest[10] = 1; dest[11] = 0;
    dest[12] = 0; dest[13] = 0; dest[14] = 0; dest[15] = 1;
    return dest;
}
function perspective(out, fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy / 2);
    const nf = 1 / (near - far);
    out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
    out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
    out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1;
    out[12] = 0; out[13] = 0; out[14] = 2 * far * near * nf; out[15] = 0;
    return out;
}
function rotateX(out, a, rad) {
    const s = Math.sin(rad), c = Math.cos(rad);
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
    out[4] = a10 * c + a20 * s; out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s; out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s; out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s; out[11] = a23 * c - a13 * s;
    out[12] = a[12]; out[13] = a[13]; out[14] = a[14]; out[15] = a[15];
    return out;
}
function rotateY(out, a, rad) {
    const s = Math.sin(rad), c = Math.cos(rad);
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    out[0] = a00 * c - a20 * s; out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s; out[3] = a03 * c - a23 * s;
    out[4] = a[4]; out[5] = a[5]; out[6] = a[6]; out[7] = a[7];
    out[8] = a00 * s + a20 * c; out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c; out[11] = a03 * s + a23 * c;
    out[12] = a[12]; out[13] = a[13]; out[14] = a[14]; out[15] = a[15];
    return out;
}
function translate(out, a, v) {
    out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
    out[4] = a[4]; out[5] = a[5]; out[6] = a[6]; out[7] = a[7];
    out[8] = a[8]; out[9] = a[9]; out[10] = a[10]; out[11] = a[11];
    out[12] = a[0] * v[0] + a[4] * v[1] + a[8] * v[2] + a[12];
    out[13] = a[1] * v[0] + a[5] * v[1] + a[9] * v[2] + a[13];
    out[14] = a[2] * v[0] + a[6] * v[1] + a[10] * v[2] + a[14];
    out[15] = a[15];
    return out;
}
function multiply(out, a, b) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
}

// Setup WebGL
const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');
if (!gl) {
    console.error('WebGL not supported');
    throw new Error('WebGL not supported');
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height);

// Create texture (4x4 checkerboard)
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
const atlasSize = 4;
const pixels = new Uint8Array(atlasSize * atlasSize * 4);
for (let i = 0; i < atlasSize * atlasSize; i++) {
    const offset = i * 4;
    const x = i % atlasSize;
    const y = Math.floor(i / atlasSize);
    const isWhite = (x % 2 === y % 2); // Checkerboard pattern
    pixels[offset] = isWhite ? 255 : 0;     // R
    pixels[offset + 1] = isWhite ? 255 : 0; // G
    pixels[offset + 2] = isWhite ? 255 : 0; // B
    pixels[offset + 3] = 255;               // A
}
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, atlasSize, atlasSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

// Initialize quad with full texture
const quad = new AtlasQuad(gl, atlasSize, atlasSize);
// Remove setTileUVs to use default UVs (0 to 1) from TexturedQuad
const projectionMatrix = mat4();
perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 100.0);
const matrixUniformLocation = gl.getUniformLocation(quad.program, 'uMatrix');

// Rotation control
let rotationSpeed = 1.0;
let rotation = 0;
document.getElementById('rotationSpeed').addEventListener('input', (e) => {
    rotationSpeed = parseFloat(e.target.value);
});

// Render loop with static checkerboard
function render() {
    gl.clearColor(0.2, 0.2, 0.2, 1.0); // Lighter background
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    rotation += 0.01 * rotationSpeed;
    let modelViewMatrix = mat4();
    modelViewMatrix = translate(modelViewMatrix, identity(mat4()), [0, 0, -3]);
    modelViewMatrix = rotateX(modelViewMatrix, modelViewMatrix, rotation * 0.7);
    modelViewMatrix = rotateY(modelViewMatrix, modelViewMatrix, rotation);

    const finalMatrix = mat4();
    multiply(finalMatrix, projectionMatrix, modelViewMatrix);

    gl.useProgram(quad.program);
    gl.uniformMatrix4fv(matrixUniformLocation, false, finalMatrix);
    quad.render(texture); // Renders full checkerboard

    requestAnimationFrame(render);
}

try {
    render();
} catch (e) {
    console.error('Render error:', e);
}