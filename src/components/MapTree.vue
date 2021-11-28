<template>
    <div class="maptree-pannel" v-show="this.$store.getters._getDefaultMapTreeVisible">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';

const options = {
    url: 'https://js.arcgis.com/4.18/init.js',
    css: 'https://js.arcgis.com/4.18/esri/themes/light/main.css',
};
export default {
    data() {
        return {
            data: [
                {
                    label: '暖色系图层',
                    layerid: 'layerid',
                    layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                },
                {
                    label: '灰色系图层',
                    layerid: 'layerid',
                    layerurl: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer',
                },
                {
                    label: '行政区划',
                    children: [
                        {
                            label: '省界',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Sichuan_prov_proj/FeatureServer',
                        },
                        {
                            label: '县界',
                            layerid: 'layerid',
                            layerurl:
                                'https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Sichuan_county_proj/FeatureServer',
                        },
                    ],
                },
            ],
            defaultProps: {
                label: 'label',
                children: 'children',
            },
        };
    },
    methods: {
        async handleNodeClick(data) {
            console.log(data);
            if (data.layerurl) {
                const view = this.$store.getters._getDefaultMapView;
                const resultLayer = view.map.findLayerById('layerid');
                if (resultLayer) view.map.remove(resultLayer);

                const [TileLayer, FeatureLayer] = await loadModules(
                    ['esri/layers/TileLayer', 'esri/layers/FeatureLayer'],
                    options,
                );
                const c = data.layerurl.split('/');
                const serverType = c[c.length - 1];
                let layer = '';
                switch (serverType) {
                    case 'MapServer':
                        layer = new TileLayer({ url: data.layerurl, id: data.layerid });
                        break;
                    case 'FeatureServer':
                        layer = new FeatureLayer({ url: data.layerurl, id: data.layerid });
                        break;
                }

                // const layer = new TileLayer({ url: data.layerurl, id: data.layerid });
                view.map.add(layer);
            }
        },
    },
};
</script>
<style>
.maptree-pannel {
    position: absolute;
    top: 20px;
    left: 15px;
    width: 200px;
    height: 300px;
    background-color: #fff;
}
</style>