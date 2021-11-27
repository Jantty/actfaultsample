<template>
    <div class="mapview-pannel">
        <div id="mapview"></div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
const options = {
    url: 'https://js.arcgis.com/4.18/init.js',
    css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};
export default {
    name: 'Mapview',
    components: {},
    mounted: function () {
        // console.log(this.$store.state._defaultView);
        this._createMapView();
    },
    methods: {
        async _createMapView() {
            // document.getElementById('basemapToggle').innerHTML = '';
            // document.getElementById('scaleBar').innerHTML = '';
            // document.getElementById('zoom').innerHTML = '';
            const [Map, MapView, Basemap, TileLayer] = await loadModules(
                [
                    'esri/Map',
                    'esri/views/MapView',
                    'esri/Basemap',
                    'esri/layers/TileLayer',
                    // 'esri/widgets/BasemapToggle',
                    // 'esri/widgets/ScaleBar',
                    // 'esri/widgets/Zoom',
                ],
                options,
            );

            let basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
                        title: 'Basemap',
                    }),
                ],
                title: 'basemap',
                id: 'basemap',
            });

            const map = new Map({
                basemap,
            });

            const mapView = new MapView({
                container: 'mapview',
                map: map,
                zoom: 10,
                center: [104.072745, 30.663774],
            });

            mapView.ui.components = [];
            // this.$store.ommit('_setDefaultView', mapView);
            console.log(mapView);
        },
    },
};
</script>

<style>
.mapview-pannel,
#mapview {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
