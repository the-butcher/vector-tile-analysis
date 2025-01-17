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
define(["require", "exports", "@amcharts/amcharts4/amcharts3merge", "@amcharts/amcharts4/amcharts3merge", "dijit/layout/ContentPane", "../util/Uid"], function (require, exports, am4core, am4charts, ContentPane_1, Uid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LayoutChart = void 0;
    am4core = __importStar(am4core);
    am4charts = __importStar(am4charts);
    ContentPane_1 = __importDefault(ContentPane_1);
    /**
     * implementation of ILayout around an amchart TreeMap element<br>
     * visit https://www.amcharts.com/ for more information
     *
     * @author h.fleischer
     * @since 09.10.2019
     */
    var LayoutChart = /** @class */ (function () {
        function LayoutChart(parent, region, title, style) {
            this.htmlElement = document.createElement('div');
            this.htmlElement.setAttribute('id', 'layout_div_' + Uid_1.Uid.random16());
            parent.getHtmlElement().appendChild(this.htmlElement);
            this.chartDiv = document.createElement('div');
            this.chartDiv.style.height = '100%';
            this.chartDiv.style.width = '100%';
            this.htmlElement.appendChild(this.chartDiv);
            var dojoElementArgs = {
                region: region,
                title: title,
                style: style,
                splitter: true
            };
            this.dojoElement = new ContentPane_1.default(dojoElementArgs, this.htmlElement);
            // @ts-ignore
            am4core = window['am4core'];
            // @ts-ignore
            am4charts = window['am4charts'];
            // @ts-ignore
            // am4themes_animated = window['am4themes_animated'];
            // @ts-ignore
            // am4themes_dark = window['am4themes_dark'];
            // am4core.useTheme(am4themes_dark);
            // am4core.useTheme(am4themes_animated);
        }
        LayoutChart.prototype.getHtmlElement = function () {
            return this.htmlElement;
        };
        LayoutChart.prototype.focusItem = function (itemId) {
            var foundItem = this.findItem(itemId);
            if (foundItem != null) {
                this.chart.zoomToChartDataItem(foundItem);
            }
        };
        LayoutChart.prototype.findRecursive = function (itemId, treeMapDataItem) {
            if (treeMapDataItem.id === itemId) {
                return treeMapDataItem;
            }
            if (treeMapDataItem.children) {
                for (var i = 0; i < treeMapDataItem.children.length; i++) {
                    var foundItem = this.findRecursive(itemId, treeMapDataItem.children.getIndex(i));
                    if (foundItem != null) {
                        return foundItem;
                    }
                }
            }
            return null;
        };
        LayoutChart.prototype.findItem = function (itemId) {
            for (var c0 = 0; c0 < this.chart.dataItems.length; c0++) {
                var foundItem = this.findRecursive(itemId, this.chart.dataItems.getIndex(c0));
                if (foundItem != null) {
                    return foundItem;
                }
            }
            return null;
        };
        LayoutChart.prototype.replaceData = function (dataItems) {
            if (this.chart != null) {
                this.chart.dispose();
            }
            this.chart = am4core.create(this.chartDiv, am4charts.TreeMap);
            this.chart.maxLevels = 1; //one level at a time
            this.chart.dataFields.value = 'value';
            this.chart.dataFields.name = 'name';
            this.chart.dataFields.children = 'children';
            this.chart.dataFields.color = 'hex';
            this.chart.dataFields.id = 'id';
            this.chart.homeText = 'tiles';
            this.chart.paddingLeft = 0;
            this.chart.paddingRight = 0;
            this.chart.paddingTop = 3;
            this.chart.paddingBottom = 0;
            //this.chart.background.fill = am4core.color('#DDDDDD'); //--page-background
            this.chart.zoomOutButton.disabled = true;
            // templates for the 3 levels in the tree chart (tiles|layers|layer-details)
            var level0SeriesTemplate = this.configureSeriesTemplate('0');
            var level1SeriesTemplate = this.configureSeriesTemplate('1');
            var level2SeriesTemplate = this.configureSeriesTemplate('2');
            var level3SeriesTemplate = this.configureSeriesTemplate('3');
            this.chart.data = dataItems;
            //if a single tile was loaded, wait for the chart to become ready, then expand immediately
            var _this = this;
            this.chart.events.on('ready', function (ev) {
                var _this_1 = this;
                setTimeout(function () {
                    if (dataItems.length == 1) {
                        _this_1.focusItem(dataItems[0].getId());
                    }
                }, 100);
            }, this);
            //have the tree open the respective node
            this.chart.events.on('toggled', function (ev) {
                setTimeout(function () {
                    //collect all ids needed to unfold the tree
                    var zoomableItem = ev.target.currentlyZoomed;
                    var uuids = [];
                    while (zoomableItem.id) {
                        uuids.push(zoomableItem.id);
                        zoomableItem = zoomableItem.parent;
                        //console.log('zoomable item', zoomableItem);
                    }
                    uuids.reverse();
                    for (var i = 0; i < uuids.length; i++) {
                        _this.itemSelectCallback.call(null, uuids[i]);
                    }
                }, 100);
            }, this.chart);
        };
        LayoutChart.prototype.configureSeriesTemplate = function (pIndex) {
            // level 0 series template
            var seriesTemplate = this.chart.seriesTemplates.create(pIndex);
            var columnTemplate = seriesTemplate.columns.template;
            seriesTemplate.stroke = am4core.color('#DDDDDD'); //--page-background
            seriesTemplate.strokeWidth = 2;
            seriesTemplate.strokeOpacity = 1;
            columnTemplate.tooltipPosition = 'pointer';
            columnTemplate.tooltipText = '{name}';
            columnTemplate.adapter.add('tooltipText', function (tooltipText, target) {
                var dataItem = target.dataItem;
                var value = dataItem['value'];
                if (value > 1048576) {
                    return '{name}\n' + Math.round(value * 100 / 1048576) / 100 + ' MB';
                }
                else if (value > 1024) {
                    return '{name}\n' + Math.round(value * 100 / 1024) / 100 + ' kB';
                }
                else if (value > 1) {
                    return '{name}\n' + value + ' bytes';
                }
                else {
                    return '{name}\n' + value + ' byte';
                }
            });
            seriesTemplate.tooltip.fontSize = 12;
            seriesTemplate.tooltip.numberFormatter.numberFormat = '#######.####';
            var seriesBullet = seriesTemplate.bullets.push(new am4charts.LabelBullet());
            //seriesBullet.locationX = 1;
            //seriesBullet.locationY = 1;
            //seriesBullet.dx = 5;
            //seriesBullet.dy = 5;
            // seriesBullet.horizontalCenter = 'left';
            seriesBullet.label.text = '{name}';
            seriesBullet.label.fontSize = 14;
            // seriesBullet.label.horizontalCenter = 'right';
            seriesBullet.label.verticalCenter = 'bottom';
            return seriesTemplate;
        };
        return LayoutChart;
    }());
    exports.LayoutChart = LayoutChart;
});
