<template>
    <div class="mapview-pannel">
        <div id="mapview"></div>
        <div id="basemapToggle"></div>
        <div id="scaleBar"></div>
        <div id="zoom"></div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import config from './../config';
// const options = {
//     url: 'https://js.arcgis.com/4.18/init.js',
//     css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
// };
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
            const [Map, MapView, Basemap, TileLayer, BasemapToggle, ScaleBar, Zoom] = await loadModules(
                [
                    'esri/Map',
                    'esri/views/MapView',
                    'esri/Basemap',
                    'esri/layers/TileLayer',
                    'esri/widgets/BasemapToggle',
                    'esri/widgets/ScaleBar',
                    'esri/widgets/Zoom',
                    // 'esri/widgets/BasemapToggle',
                    // 'esri/widgets/ScaleBar',
                    // 'esri/widgets/Zoom',
                ],
                config.options,
            );

            let basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
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

            //实例化底图切换
            const basemapToggle = new BasemapToggle({
                view: mapView,
                nextBasemap: 'hybrid',
                container: 'basemapToggle',
            });
            mapView.ui.add(basemapToggle);

            //实例化比例尺
            const scaleBar = new ScaleBar({
                view: mapView,
                container: 'scaleBar',
                unit: 'metric',
            });
            mapView.ui.add(scaleBar);

            //实例化地图缩放控件
            const zoom = new Zoom({
                view: mapView,
                container: 'zoom',
            });
            mapView.ui.add(zoom);

            mapView.ui.components = [];
            this.$store.commit('_setDefaultMapView', mapView);

            // console.log(mapView);
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
#basemapToggle {
    position: absolute;
    right: 15px;
    bottom: 15px;
}
#scaleBar {
    position: absolute;
    left: 15px;
    bottom: 15px;
}
#zoom {
    position: absolute;
    right: 15px;
    bottom: 100px;
}
</style>
