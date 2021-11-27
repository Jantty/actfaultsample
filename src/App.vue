<template>
    <div id="app">
        <el-container class="app-out-pannel">
            <el-header class="sys-header">活断层项目系统</el-header>
            <el-container class="app-content-pannel">
                <el-aside width="200px" class="sys-menu">
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @select="handleMenuSelect"
                        @open="handleOpen"
                        @close="handleClose"
                        :collapse="true"
                    >
                        <el-menu-item index="1" class="sys-menu-item">
                            <i class="el-icon-map-location"></i>
                            <span slot="title">活断层专题图</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="sys-content">
                    <Mapview />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Mapview from './components/common/Mapview';
export default {
    name: 'App',
    components: {
        Mapview,
    },
    data() {
        return {
            // isCollapse: true,
        };
    },
};
</script>

<style>
/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
html,
body,
#app {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
}
.app-out-pannel,
.app-content-pannel {
    height: 100%;
}
.sys-header {
    background-color: #32373e;
    line-height: 60px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
}
.sys-menu {
    background-color: #545c64;
    width: 64px !important;
    overflow: hidden !important;
}
.sys-menu-item {
    background-color: #545c64;
    /* text-color: '#fff';
    active-text-color: '#ffd04b'; */
}
.sys-content {
    padding: 5px !important;
}
</style>
