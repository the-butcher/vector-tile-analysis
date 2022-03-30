define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QuadLevelImpl = void 0;
    var QuadLevelImpl = /** @class */ (function () {
        function QuadLevelImpl(level, origin, norm) {
            this.level = level;
            this.origin = origin;
            this.norm = norm;
            // console.log(this.level, this.norm)
        }
        QuadLevelImpl.prototype.getOrigin = function () {
            return this.origin;
        };
        QuadLevelImpl.prototype.getNorm = function () {
            return this.norm;
        };
        return QuadLevelImpl;
    }());
    exports.QuadLevelImpl = QuadLevelImpl;
});
