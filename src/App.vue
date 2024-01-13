<template>
    <v-header> </v-header>
    <div class="content">
        <div class="left">
            <div class="left_top">
                <div class="nav" @click="routeJump">
                    <img src="./assets/pic.png">
                    <p>首页</p>
                </div>
          
            </div>
            <div class="left_middle">
                <div class="nav" @click="routeJump">
                    <img src="./assets/pic.png">
                    <p>贴图工具</p>
                </div>
                <div class="nav">
                    <img src="./assets/pic.png">
                    <p>贴图工具</p>
                </div>
                <div class="nav">
                    <img src="./assets/pic.png">
                    <p>贴图工具</p>
                </div>
                <div class="nav">
                    <img src="./assets/pic.png">
                    <p>贴图工具</p>
                </div>
                <div class="nav">
                    <img src="./assets/pic.png">
                    <p>贴图工具</p>
                </div>
            </div>
            <div class="left_bottom">
                <div class="nav">
                    <img src="./assets/pic.png">
                    <p>贴图1具</p>
                </div>
            </div>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>

        <div class="fixed-icons">
            <div class="float_icon">
                ?
            </div>
        </div>
    </div>
</template>

<script>
// const { remote } = require('electron');
// const mainProcessEnv = remote.getGlobal('process.env');
// import HelloWorld from './components/HelloWorld.vue'
// console.log(process.env.VUE_APP_API_URL, 'asdasdasd111')
import HeaderView from './views/common/Header.vue'
export default {
    name: 'App',
    components: {
        "v-header": HeaderView
    },
    methods: {
        routeJump() {
            this.$router.push({ path: '/pic_paste' })
        }
    }
}
</script>

<style lang="scss">
body {
    margin: 0px;
    overflow: hidden;
}

/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */

.content {
    display: flex;
    height: 100vh;
}

.left {
    height: 100%; // 新增这行
    flex-direction: column; // 新增这行
    background-color: rgb(250, 250, 250);
    border-right: 1px solid #eee;
    .left_top,.left_middle,.left_bottom{
        width: 80px;
        color: #495366;
        display: flex;
        flex-direction: column;
        .nav {
            font-size: 11px;
            text-align: center;
            padding-top: 20px;

            img {
                width: 24px;
            }
            p{
                margin-top: 0px;
            }
        }

    }
    .left_bottom {
        display: flex;
        margin-top: auto;
    
    }

}


.right {
    flex: 1;
    border-right: 1px solid #eee;
    // background-color: rgb(243, 244, 248);
    background-color: rgb(243, 244, 248);
    overflow: auto;
    /* 显示滚动条，只有内容溢出时才会显示 */
}

.fixed-icons {
    position: fixed;
    bottom: 15px;
    right: 20px;
    display: flex;
    flex-direction: column;

    .float_icon {
        width: 40px;
        height: 40px;
        background-color: blue;
        color: white;
        border-radius: 20px;
        text-align: center;
        align-items: center;
        line-height: 40px;
        margin-top: 15px;
        /* Set your desired background color */
        /* Adjust spacing between icons if needed */
        /* Add your icon background image or icon font */
    }
}
</style>
