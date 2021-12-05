<template>
    <div id="app">
        <el-container class="app-out-pannel">
            <el-header class="sys-header"> WebGIS Demo</el-header>
            <!-- <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-submenu index="1">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-submenu>
            </el-menu> -->
            <el-container class="app-content-pannel">
                <el-aside width="200px" class="sys-menu">
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @select="handleMenuSelect"
                        :collapse="true"
                    >
                        <el-menu-item index="1" class="sys-menu-item">
                            <i class="el-icon-map-location"></i>
                            <span slot="title">活断层专题图</span>
                        </el-menu-item>
                        <el-menu-item index="2" class="sys-menu-item">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">数据统计</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="sys-content">
                    <router-view></router-view>
                    <!-- <Mapview /> -->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
// import Mapview from './components/common/Mapview';
export default {
    name: 'App',
    components: {},
    methods: {
        handleMenuSelect(index) {
            console.log(index);
            if (index === '1') {
                this.$router.push('/onemap');
            } else if (index === '2') {
                this.$router.push('/data');
            }
        },
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
