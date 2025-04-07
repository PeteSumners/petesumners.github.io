/**
 * TexturedQuad.js
 * A simple, reusable class for rendering a single textured quad in WebGL
 * with customizable UV mapping.
 */

class TexturedQuad {
  constructor(gl) {
      this.gl = gl;
      this.initShaders();
      this.initBuffers();
  }

  initShaders() {
      const gl = this.gl;

      const vsSource = `
          attribute vec4 aPosition;
          attribute vec2 aTexCoord;
          uniform mat4 uMatrix;
          varying vec2 vTexCoord;
          void main() {
              gl_Position = uMatrix * aPosition;
              vTexCoord = aTexCoord;
          }
      `;

      const fsSource = `
          precision mediump float;
          varying vec2 vTexCoord;
          uniform sampler2D uSampler;
          void main() {
              gl_FragColor = texture2D(uSampler, vTexCoord);
          }
      `;

      const vertexShader = this.loadShader(gl.VERTEX_SHADER, vsSource);
      const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, fsSource);

      this.program = gl.createProgram();
      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
          throw new Error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(this.program));
      }

      this.positionAttribLocation = gl.getAttribLocation(this.program, 'aPosition');
      this.texCoordAttribLocation = gl.getAttribLocation(this.program, 'aTexCoord');
      this.samplerUniformLocation = gl.getUniformLocation(this.program, 'uSampler');
  }

  loadShader(type, source) {
      const gl = this.gl;
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          const error = gl.getShaderInfoLog(shader);
          gl.deleteShader(shader);
          throw new Error('An error occurred compiling the shaders: ' + error);
      }

      return shader;
  }

  initBuffers() {
      const gl = this.gl;

      this.positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

      const positions = [
          -1.0, -1.0, 0.0,  // bottom left
           1.0, -1.0, 0.0,  // bottom right
           1.0,  1.0, 0.0,  // top right
          -1.0,  1.0, 0.0,  // top left
      ];

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

      this.texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);

      this.setUVs([
          0.0, 0.0,  // bottom left
          1.0, 0.0,  // bottom right
          1.0, 1.0,  // top right
          0.0, 1.0,  // top left
      ]);

      this.indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

      const indices = [
          0, 1, 2,    // first triangle
          0, 2, 3,    // second triangle
      ];

      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  }

  setUVs(uvs) {
      const gl = this.gl;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
  }

  setPositions(positions) {
      const gl = this.gl;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  }

  render(texture) {
      const gl = this.gl;

      gl.useProgram(this.program);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
      gl.vertexAttribPointer(this.positionAttribLocation, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.positionAttribLocation);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
      gl.vertexAttribPointer(this.texCoordAttribLocation, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(this.texCoordAttribLocation);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(this.samplerUniformLocation, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }
}

if (typeof module !== 'undefined') {
  module.exports = TexturedQuad;
}