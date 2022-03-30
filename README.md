# vector-tile-analysis
a tool implemented with esri's ArcGIS API for JavaScript that measures and visualizes data-quality of vector-tiles caches

# to install
* download code as zip and unpack to a location on your machine
* register the folder "vta_03" as a virtual folder in iis (internet information services)
* in the file vta_03/js_synergis/main.js replace https://your-server-name-here/arcgis1091/rest/services/Hosted/DBTR/VectorTileServer with the path to your VectorTileService (must end with VectorTileServer)
* app is build to work with epsg:32632 (WGS 84 / UTM zone 32N) only, if there is the need for a comparison with the esri basemap, please ask for instructions on how to do so
* upon start of the app you should something like this (please ask if it does not):

![preview](https://github.com/the-butcher/vector-tile-analysis/blob/master/vta_03/images/vta_preview.png?raw=true)