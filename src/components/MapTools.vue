<template>
    <div class="maptools-view">
        <span class="maptools-item" @click="handleMapTools" id="xzqhquery">行政区查询</span>
        <span class="maptools-item" @click="handleMapTools" id="maptree">专题图层</span>
        <el-dropdown trigger="click" class="maptools-item" @command="handleCommand">
            <span class="el-dropdown-link">地图测量<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus" command="distance">距离测量</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus" command="area">面积测量</el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit" command="diymeasurement_distance"
                    >自定义测量(长度)</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-edit" command="diymeasurement_area">自定义测量(面积)</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" class="maptools-item" @command="handleCommand">
            <span class="el-dropdown-link">更多功能<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-search" command="spacequery">空间查询</el-dropdown-item>
                <el-dropdown-item icon="el-icon-film" command="morescreen">多屏对比</el-dropdown-item>
                <el-dropdown-item icon="el-icon-reading" command="swipanalyst">卷帘分析</el-dropdown-item>
                <el-dropdown-item icon="el-icon-picture-outline" command="printmap">地图打印</el-dropdown-item>
                <el-dropdown-item icon="el-icon-view" command="openPopup">开启图层弹窗</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span class="maptools-item" @click="handleMapToolsitemClick" id="clear">清屏</span>
    </div>
</template>

<script>
export default {
    name: 'MapTools',
    mounted: function () {
        const checkView = setInterval(() => {
            if (this.$store.getters._getDefaultMapView) {
                this._initSketchTool();
                clearInterval(checkView);
            }
        }, 200);
    },
    methods: {
        handleMapTools(e) {
            console.log(e.target.id);
            switch (e.target.id) {
                case 'xzqhquery':
                    this.xzqhquery();
                    break;
                case 'maptree':
                    this.maptree();
                    break;
                case 'distance':
                    console.log('openXZQHPannel()');
                    break;
                case 'multiscreens':
                    this.multiscreens();
                    break;
                case 'clear':
                    break;
                default:
                    break;
            }
        },
        handleCommand(command) {
            switch (command) {
                case 'distance':
                    this.initDistanceMap();
                    break;
                case 'area':
                    this.initAreaMap();
                    break;
                case 'diymeasurement_distance':
                    this.initDIYMeasurement('distance');
                    break;
                case 'diymeasurement_area':
                    this.initDIYMeasurement('area');
                    break;
                case 'spacequery':
                    this.initSpaceQuery();
                    break;
                case 'morescreen':
                    this.$router.push('/onemap/one');
                    break;
                case 'swipanalyst':
                    this._initSwipe();
                    break;
                case 'printmap':
                    this.handlePrintMap();
                    break;
                case 'openPopup':
                    this.openMapPopup();
                    break;
                default:
                    break;
            }
        },

        maptree() {
            let currentVisible = this.$store.getters._getDefaultMapTreeVisible;
            this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
        },
        xzqhquery() {
            let currentVisible = this.$store.getters._getDefaultXZQHVisible;
            this.$store.commit('_setDefaultXZQHVisible', !currentVisible);
        },
        multiscreens() {
            let currentVisible = this.$store.getters._getDefaultMultiScreensVisible;
            this.$store.commit('_setDefaultMultiScreensVisible', !currentVisible);
        },

        //初始化空间查询
        async initSpaceQuery() {
            const _self = this;
            const view = _self.$store.getters._getDefaultMapView;
            const [Graphic, GraphicsLayer] = await loadModules(
                ['esri/Graphic', 'esri/layers/GraphicsLayer'],
                config.options,
            );

            const resultLayer = view.map.findLayerById('polygonGraphicLayer');
            if (resultLayer) view.map.remove(resultLayer);
            _self.graphicsLayer = new GraphicsLayer({
                id: 'polygonGraphicLayer',
                elevationInfo: {
                    mode: 'on-the-ground',
                },
            });
            view.map.add(_self.graphicsLayer);

            _self.sketchViewModel.create('polygon');

            _self.sketchViewModel.on('create-complete', function (event) {
                const graphic = new Graphic({
                    geometry: event.geometry,
                    symbol: _self.sketchViewModel.graphic.symbol,
                });
                _self.graphicsLayer.add(graphic);
            });
            _self.sketchViewModel.on('create', function (event) {
                if (event.state === 'complete') {
                    // console.log(graphicsLayer);
                    // console.log(event);
                    //2、执行空间查询
                    _self.handleSpaceQuery(event.graphic);
                }
            });
        },
        handleSpaceQuery(graphic) {
            const _self = this;
            const view = _self.$store.getters._getDefaultMapView;

            const resultLayer = view.map.findLayerById('layerid');
            if (!resultLayer) {
                _self.$message({
                    message: '尚未添加业务图层，不能进行空间查询',
                    type: 'warning',
                });
                return;
            }

            const queryPoint = resultLayer.createQuery();
            queryPoint.geometry = graphic.geometry;
            resultLayer
                .queryFeatures(queryPoint)
                .then(function (results) {
                    let currentData = [];
                    if (results.features.length > 0) {
                        //符号化渲染图层
                        _self.renderResultLayer(results.features);
                        //实例化表格数据
                        results.features.map((item, index) => {
                            currentData.push({
                                name: item.attributes.name,
                                type: item.attributes.type,
                                tieluju: item.attributes.tieluju,
                                address: item.attributes.address,
                                lon: item.attributes.lon,
                                lat: item.attributes.lat,
                                key: index,
                            });
                        });
                    } else {
                        currentData.length = 0;
                    }
                    _self.$message({
                        message: `查询成功，共查到 ${results.features.length} 条数据`,
                        type: 'success',
                    });
                    _self.$store.commit('_setDefaultQueryResult', currentData);
                    _self.$store.commit('_setDefaultQueryResultVisible', true);
                })
                .catch(function (error) {
                    console.log(error);
                    _self.$message.error('空间查询失败，请联系管理员');
                });
        },
        async renderResultLayer(resultFeatures) {
            const view = this.$store.getters._getDefaultMapView;
            const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer'], config.options);

            const resultLayer = view.map.findLayerById('initResultLayer');
            if (resultLayer) view.map.remove(resultLayer);

            const resultData = this._translateLonLat(resultFeatures);
            //实例化弹窗
            let template = {
                title: '{name}-{tieluju}',
                content: [
                    {
                        type: 'fields',
                        fieldInfos: [
                            {
                                fieldName: 'name',
                                label: '名称',
                            },
                            {
                                fieldName: 'type',
                                label: '类型',
                            },
                            {
                                fieldName: 'tieluju',
                                label: '铁路局',
                            },
                            {
                                fieldName: 'address',
                                label: '地址',
                            },
                        ],
                    },
                ],
            };
            const queryResultLayer = new FeatureLayer({
                source: resultData,
                id: 'initResultLayer',
                objectIdField: 'ObjectID',
                renderer: {
                    type: 'simple', // autocasts as new SimpleRenderer()
                    symbol: {
                        type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                        url: `static/icon/train.png`,
                        width: '32px',
                        height: '32px',
                    },
                },
                fields: [
                    {
                        name: 'OBJECTID',
                        type: 'oid',
                    },
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'type',
                        type: 'string',
                    },
                    {
                        name: 'tieluju',
                        type: 'string',
                    },
                    {
                        name: 'address',
                        type: 'string',
                    },
                ],
                popupTemplate: template,
            });
            view.map.add(queryResultLayer);
        },
        //处理经纬度数据，返回features
        _translateLonLat(data) {
            const _self = this;
            if (data.length > 0) {
                _self.geoData = [];
                data.map((value, key) => {
                    _self.geoData.push({
                        geometry: {
                            type: 'point',
                            x: Number(value.attributes.lon),
                            y: Number(value.attributes.lat),
                        },
                        attributes: {
                            ObjectID: key + 1,
                            name: value.attributes.name,
                            type: value.attributes.type,
                            tieluju: value.attributes.tieluju,
                            address: value.attributes.address,
                        },
                    });
                });
            }

            return _self.geoData;
        },
    },
};
</script>

<style>
.maptools-view {
    position: absolute;
    padding: 0 15px;
    height: 30px;
    top: 20px;
    right: 15px;
    background: #fff;
}
.maptools-item {
    line-height: 30px;
    margin-left: 15px;
    color: black;
    cursor: pointer;
}
.maptools-item:hover {
    color: #409eff;
}
.maptools-item:first-child {
    margin-left: 0;
}
</style>
