var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
define(["require", "exports", "esri/layers/GraphicsLayer", "esri/core/accessorSupport/decorators", "./ActiveTileLayerViewSyn"], function (require, exports, GraphicsLayer_1, asd, ActiveTileLayerViewSyn_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActiveTileLayerSyn = void 0;
    GraphicsLayer_1 = __importDefault(GraphicsLayer_1);
    asd = __importStar(asd);
    /**
     * extension to GraphicsLayer for drawing the boundaries of the currently active tile<br>
     *
     * @author h.fleischer
     * @since 18.10.2019
     */
    var ActiveTileLayerSyn = /** @class */ (function (_super) {
        __extends(ActiveTileLayerSyn, _super);
        function ActiveTileLayerSyn(title, color) {
            var _this = _super.call(this, {
                title: title
            }) || this;
            _this.needsTileUpdate = false;
            _this.color = color;
            return _this;
        }
        ActiveTileLayerSyn.prototype.setTile = function (tile) {
            this.needsTileUpdate = true;
            this.tile = tile;
        };
        ActiveTileLayerSyn.prototype.getTile = function () {
            return this.tile;
        };
        ActiveTileLayerSyn.prototype.getColor = function () {
            return this.color;
        };
        ActiveTileLayerSyn.prototype.isNeedsTileUpdate = function () {
            return this.needsTileUpdate;
        };
        ActiveTileLayerSyn.prototype.setNeedsTileUpdate = function (needsTileUpdate) {
            this.needsTileUpdate = needsTileUpdate;
        };
        ActiveTileLayerSyn.prototype.createLayerView = function (view) {
            if (view.type === "2d") {
                return new ActiveTileLayerViewSyn_1.ActiveTileLayerViewSyn({
                    view: view,
                    layer: this
                }, this);
            }
        };
        ActiveTileLayerSyn = __decorate([
            asd.subclass("ActiveTileLayerSyn")
        ], ActiveTileLayerSyn);
        return ActiveTileLayerSyn;
    }(asd.declared(GraphicsLayer_1.default)));
    exports.ActiveTileLayerSyn = ActiveTileLayerSyn;
});
