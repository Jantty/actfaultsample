<template>
    <div class="sceneview-pannel">
        <div id="sceneview"></div>
        <div id="echarts01" class="echartsview"></div>
    </div>
</template>

<script>
import { loadModules } from 'esri-loader';
import * as echarts from 'echarts';
import config from './../config';

export default {
    name: 'Sceneview',
    components: {},
    mounted() {
        // console.log(this.$store.state._defaultView);
        this._createSceneView();
        this.initEcharts01();
    },
    methods: {
        async _createSceneView() {
            // document.getElementById('basemapToggle').innerHTML = '';
            // document.getElementById('scaleBar').innerHTML = '';
            // document.getElementById('zoom').innerHTML = '';
            const [Map, SceneView, Basemap, TileLayer] = await loadModules(
                ['esri/Map', 'esri/views/SceneView', 'esri/Basemap', 'esri/layers/TileLayer'],
                config.options,
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

            const mapView = new SceneView({
                container: 'sceneview',
                map: map,
                // zoom: 10,
                // center: [104.072745, 30.663774],
            });
            mapView.ui.components = [];
        },

        //实例化图表
        initEcharts01() {
            const myChart = echarts.init(document.getElementById('echarts01'));

            // const option = {
            //     tooltip: {
            //         trigger: 'axis',
            //         axisPointer: {
            //             // Use axis to trigger tooltip
            //             type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
            //         },
            //     },
            //     legend: {},
            //     grid: {
            //         left: '3%',
            //         right: '4%',
            //         bottom: '3%',
            //         containLabel: true,
            //     },
            //     xAxis: {
            //         type: 'value',
            //     },
            //     yAxis: {
            //         type: 'category',
            //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            //     },
            //     series: [
            //         {
            //             name: 'Direct',
            //             type: 'bar',
            //             stack: 'total',
            //             label: {
            //                 show: true,
            //             },
            //             emphasis: {
            //                 focus: 'series',
            //             },
            //             data: [320, 302, 301, 334, 390, 330, 320],
            //         },
            //         {
            //             name: 'Mail Ad',
            //             type: 'bar',
            //             stack: 'total',
            //             label: {
            //                 show: true,
            //             },
            //             emphasis: {
            //                 focus: 'series',
            //             },
            //             data: [120, 132, 101, 134, 90, 230, 210],
            //         },
            //         {
            //             name: 'Affiliate Ad',
            //             type: 'bar',
            //             stack: 'total',
            //             label: {
            //                 show: true,
            //             },
            //             emphasis: {
            //                 focus: 'series',
            //             },
            //             data: [220, 182, 191, 234, 290, 330, 310],
            //         },
            //         {
            //             name: 'Video Ad',
            //             type: 'bar',
            //             stack: 'total',
            //             label: {
            //                 show: true,
            //             },
            //             emphasis: {
            //                 focus: 'series',
            //             },
            //             data: [150, 212, 201, 154, 190, 330, 410],
            //         },
            //         {
            //             name: 'Search Engine',
            //             type: 'bar',
            //             stack: 'total',
            //             label: {
            //                 show: true,
            //             },
            //             emphasis: {
            //                 focus: 'series',
            //             },
            //             data: [820, 832, 901, 934, 1290, 1330, 1320],
            //         },
            //     ],
            // };
            // myChart.setOption(option);
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '柱状图',
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                    show: true,
                    name: '商品',
                    nameLocation: 'start',
                },
                yAxis: {
                    name: '频数',
                },
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        label: { show: true },
                        itemStyle: { color: '#41E9DA' },
                        data: [5, 20, 36, 10, 10, 20],
                    },
                ],
            });
        },
    },
};
</script>

<style>
.sceneview-pannel {
    position: relative;
    width: 100%;
    height: 100%;
}
#sceneview {
    width: 100%;
    height: 100%;
}

.echartsview {
    position: absolute;
    top: 20px;
    left: 15px;
    width: 300px;
    height: 300px;
}
</style>
