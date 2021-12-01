<template>
    <div class="multiscreens-view" v-show="this.$store.getters._getDefaultMultiScreensVisible">
        <div id="left-view" class="map-item"></div>
        <div id="right-view" class="map-item"></div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
// import config from './config';
const options = {
    url: 'https://js.arcgis.com/4.18/init.js',
    css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};

export default {
    name: 'MultiScreens',
    mounted: function () {
        this._initMap();
    },
    methods: {
        async _initMap() {
            const [Map, MapView, Basemap, TileLayer, watchUtils] = await loadModules(
                ['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/TileLayer', 'esri/core/watchUtils'],
                options,
            );

            const basemap = new Basemap({
                baseLayers: [
                    new TileLayer({
                        url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                        title: 'Basemap',
                    }),
                ],
                title: 'basemap',
                id: 'basemap',
            });

            // const basemap02 = new Basemap({
            //     baseLayers: [
            //         new TileLayer({
            //             url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
            //             title: 'Basemap',
            //         }),
            //     ],
            //     title: 'basemap02',
            //     id: 'basemap02',
            // });

            const map01 = new Map({
                basemap,
            });
            const mapView01 = new MapView({
                container: 'left-view',
                map: map01,
                zoom: 10,
                center: [104.072745, 30.663774],
            });
            // mapView01.map.add(basemap01);

            // const map02 = new Map({
            //     basemap,
            // });
            const mapView02 = new MapView({
                container: 'right-view',
                map: map01,
                zoom: 10,
                center: [104.072745, 30.663774],
            });
            // mapView01.map.add(basemap02);

            mapView01.ui.components = [];
            mapView02.ui.components = [];

            // this.$store.commit('_setDefaultMultiScreenLeftView', mapView01);
            // this.$store.commit('_setDefaultMultiScreenRightView', mapView02);

            //地图联动
            watchUtils.whenTrue(mapView01, 'stationary', function () {
                // Get the new center of the view only when view is stationary.
                if (mapView01.center) {
                    mapView02.goTo({
                        center: [mapView01.center.longitude, mapView01.center.latitude],
                        zoom: mapView01.zoom,
                    });
                }
                // Get the new extent of the view only when view is stationary.
                if (mapView01.extent) {
                    console.log(
                        mapView01.extent.xmin.toFixed(2),
                        mapView01.extent.xmax.toFixed(2),
                        mapView01.extent.ymin.toFixed(2),
                        mapView01.extent.ymax.toFixed(2),
                    );
                }
            });
        },
    },
};
</script>

<style>
.multiscreens-view {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    margin: bottom 2.5px;
}
.map-item {
    width: calc(50% - 2.5px);
    height: 100%;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
}
#left-view {
    margin-right: 2.5px;
}
#right-view {
    margin-left: 2.5px;
}
</style>
