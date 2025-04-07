// TextTerminal.js

class AtlasQuad extends TexturedQuad {
    constructor(gl, atlasWidth, atlasHeight) {
        super(gl);
        this.atlasWidth = atlasWidth;
        this.atlasHeight = atlasHeight;
        this.tileWidth = 1.0 / atlasWidth;
        this.tileHeight = 1.0 / atlasHeight;
    }

    setTileUVs(tileIndex) {
        const x = tileIndex % this.atlasWidth;
        const y = Math.floor(tileIndex / this.atlasWidth);
        const u0 = x * this.tileWidth;
        const v0 = y * this.tileHeight;
        const u1 = u0 + this.tileWidth;
        const v1 = v0 + this.tileHeight;

        const uvs = [u0, v0, u1, v0, u1, v1, u0, v1];
        this.setUVs(uvs);
    }
}

class TextTerminal extends AtlasQuad {
    constructor(gl, atlasWidth, atlasHeight) {
        super(gl, atlasWidth, atlasHeight);
        this.setTileUVs(0); // Just show the first tile
    }

    render(texture) {
        super.render(texture);
    }
}

if (typeof module !== 'undefined') {
    module.exports = TextTerminal;
}