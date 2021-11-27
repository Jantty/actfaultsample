<template>
    <div id="mapview"></div>
</template>

<script>
import { loadModules } from 'esri-loader';
const options = {
    url: 'https://js.arcgis.com/4.21/init.js',
    css: 'https://js.arcgis.com/4.21/esri/themes/light/main.css',
};
export default {
    name: 'Mapview',
    components: {},
    mounted: function () {
        console.log(this.$store.state._defaultView);
        this._createMapView();
    },
    methods: {
        async _createMapView() {
            const [Map, Mapview] = await loadModules(['esrii/Map', 'esri/views/Mapview'], options);

            const map = new Map({
                basemap: 'osm',
            });

            const view = new Mapview({
                containser: 'mapview',
                map: map,
                zoom: 10,
                center: [104.072745, 30.663774],
            });

            view.ui.components = [];
            this.$store.ommit('_setDefaultView', view);
            console.log(view);
        },
    },
};
</script>

<style>
#mapview {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
