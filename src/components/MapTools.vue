<template>
    <div class="maptools-view">
        <div class="basemap-toggle">
            <span class="maptools-item" @click="handleMapTools" id="xzqhquery">行政区划导航</span>
            <span class="maptools-item" @click="handleMapTools" id="maptree">专题图层</span>
            <span class="maptools-item" @click="handleMapTools" id="swipe">卷帘分析</span>
            <span class="maptools-item" @click="handleMapTools" id="multiscreens">多屏对比</span>
            <span class="maptools-item" @click="handleMapTools" id="clear">清屏</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MapTools',
    methods: {
        handleMapTools(e) {
            console.log(e.target.id);
            switch (e.target.id) {
                case 'xzqhquery':
                    this.xzqhquery();
                    break;
                case 'maptree':
                    this.open();
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
        open() {
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
