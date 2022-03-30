var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/Graphic", "esri/geometry/Polygon", "esri/geometry", "./BoundaryFields"], function (require, exports, Graphic_1, Polygon_1, geometry_1, BF) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TileGraphicFactory = void 0;
    Graphic_1 = __importDefault(Graphic_1);
    Polygon_1 = __importDefault(Polygon_1);
    BF = __importStar(BF);
    /**
     * helper type that creates tile-boundary-graphics ready to be added to a tile-boundary layer
     *
     * @author h.fleischer
     * @since 22.09.2019
     */
    var TileGraphicFactory = /** @class */ (function () {
        function TileGraphicFactory(layerId, layerUrl, tileServers) {
            this.layerId = layerId;
            this.layerUrl = layerUrl;
            this.tileServers = tileServers;
        }
        TileGraphicFactory.prototype.createGraphic = function (quadKey, quadTree) {
            var tileRing = quadTree.getRing(quadKey);
            var geometry = new Polygon_1.default({
                spatialReference: new geometry_1.SpatialReference({
                    wkid: 32632 // 3857
                }),
                rings: [
                    tileRing
                ]
            });
            //console.log('geometry', geometry);
            var randomTileServerIndex = Math.floor(Math.random() * this.tileServers.length);
            var randomTileServer = this.tileServers[randomTileServerIndex];
            var tileUrl = randomTileServer.replace('{z}', quadKey.getLod().toString()).replace('{x}', quadKey.getCol().toString()).replace('{y}', quadKey.getRow().toString());
            var attributes = {};
            attributes[BF.BOUNDARY_FIELD_REF_LAYER_ID.name] = this.layerId;
            attributes[BF.BOUNDARY_FIELD_REF_TILE_URL.name] = tileUrl,
                attributes[BF.BOUNDARY_FIELD_REF_TILE_ID.name] = quadKey.getId(),
                attributes[BF.BOUNDARY_FIELD_REF_TILE_LOD.name] = quadKey.getLod(),
                attributes[BF.BOUNDARY_FIELD_REF_TILE_ROW.name] = quadKey.getRow(),
                attributes[BF.BOUNDARY_FIELD_REF_TILE_COL.name] = quadKey.getCol();
            //console.log('attributes', attributes);
            return new Graphic_1.default({
                attributes: attributes,
                geometry: geometry
            });
        };
        return TileGraphicFactory;
    }());
    exports.TileGraphicFactory = TileGraphicFactory;
});
