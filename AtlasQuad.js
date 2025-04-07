// AtlasQuad.js

class AtlasQuad extends TexturedQuad {
    constructor(gl, atlasWidth, atlasHeight) {
        super(gl);
        this.atlasWidth = atlasWidth;  // Number of tiles horizontally
        this.atlasHeight = atlasHeight; // Number of tiles vertically
        this.tileWidth = 1.0 / atlasWidth;
        this.tileHeight = 1.0 / atlasHeight;
        // Remove setTileUVs(0) to keep default full-texture UVs from TexturedQuad
    }

    setTileUVs(tileIndex) {
        const x = tileIndex % this.atlasWidth;
        const y = Math.floor(tileIndex / this.atlasWidth);
        const u0 = x * this.tileWidth;
        const v0 = y * this.tileHeight;
        const u1 = u0 + this.tileWidth;
        const v1 = v0 + this.tileHeight;

        const uvs = [
            u0, v0,  // bottom left
            u1, v0,  // bottom right
            u1, v1,  // top right
            u0, v1   // top left
        ];
        this.setUVs(uvs);
    }
}

if (typeof module !== 'undefined') {
    module.exports = AtlasQuad;
}