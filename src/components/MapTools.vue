<template>
    <div class="maptools-view">
        <div class="basemap-toggle"></div>
        <span class="maptools-item" @click="handleMapTools" id="maptree">专题图层</span>
        <span class="maptools-item" @click="handleMapTools" id="distance">距离测量</span>
        <span class="maptools-item" @click="handleMapTools" id="area">面积测量</span>
        <span class="maptools-item" @click="handleMapTools" id="clear">清屏</span>
    </div>
</template>

<script>
export default {
    name: 'MapTools',
    methods: {
        handleMapTools(e) {
            console.log(e.target.id);
            switch (e.target.id) {
                case 'maptree':
                    this.open();
                    break;
                case 'distance':
                    console.log('openXZQHPannel()');
                    break;
                case 'area':
                    break;
                case 'clear':
                    break;
                default:
                    break;
            }
        },
        open() {
            let currentVisible = this.$store.getters._getDefaultMapTreeVisible;
            this.$store.commit('_setDefaultMapTreeVisible', !currentVisible);
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
