<template>
    <div class="maptools-view">
        <div class="basemap-toggle"></div>
        <span class="maptools-item">专题图</span>
        <span class="maptools-item">距离测量</span>
        <span class="maptools-item">面积测量</span>
        <span class="maptools-item">清屏</span>
    </div>
</template>

<script>
export default {
    name: 'MapTools',
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
