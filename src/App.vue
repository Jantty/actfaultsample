<template>
    <div id="app">
        <el-container class="app-out-pannel">
            <el-header class="sys-header">
                WebGIS Demo
                <div class="user-info">
                    <i class="el-icon-user"></i>
                    <span>当前用户：</span>
                    <span @click="handleUserLogin">{{ username }}</span>
                </div>
            </el-header>
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
        <el-dialog title="用户登录/注册" :visible.sync="loginDialogVisible" width="30%">
            <div class="login-content">
                <el-input placeholder="请输入用户名" v-model="userNameInput" clearable> </el-input>
                <el-input placeholder="请输入密码" v-model="passwordInput" show-password></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="userLogin">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'App',
    components: {},
    data() {
        return {
            username: '未登录',
            loginDialogVisible: false,
            userNameInput: '',
            passwordInput: '',
        };
    },
    methods: {
        handleMenuSelect(index) {
            console.log(index);
            if (index === '1') {
                this.$router.push('/onemap');
            } else if (index === '2') {
                this.$router.push('/data');
            }
        },
        handleUserLogin() {
            // console.log('2');
            this.loginDialogVisible = true;
        },
        userLogin() {
            const _self = this;
            const name = this.userNameInput;
            // const psd = this.passwordInput;
            // console.log(name, psd);

            axios
                .get('http://localhost:3001/user/get', {
                    params: {
                        name,
                    },
                })
                .then(function (response) {
                    console.log(response);
                    if (response.data.status === 'success') {
                        const psd = response.data.data[0].password;
                        if (_self.passwordInput === psd) {
                            _self.$message({
                                message: '恭喜你，登录成功！',
                                type: 'success',
                            });
                            _self.username = response.data.data[0].name;
                            // _self.loginDialogVisible = false;
                        } else {
                            _self.$message.error('登录失败，用户名或密码错误');
                        }
                    }
                })
                .catch(function (error) {
                    _self.loginDialogVisible = false;
                    console.log(error);
                });
        },
    },
};
</script>

<style>
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
.user-info {
    font-size: 15px;
}
.user-info > span:last-child:hover {
    color: #409eff;
    cursor: pointer;
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
.login-content {
}
</style>
