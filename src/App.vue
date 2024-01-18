<template>
    <common-header> </common-header>
    <div class="content">
        <div class="left">
            <div>
                <div class="left_top">
                    <div class="nav" @click="this.$router.push({ path: '/home' })">
                        <img src="./assets/home.png">
                        <p>首页</p>
                    </div>
                </div>
                <div class="left_middle">
                    <div class="nav" @click="routeJump">
                        <img src="./assets/pic.png">
                        <p>模块1</p>
                    </div>
                    <div class="nav">
                        <img src="./assets/pic.png">
                        <p>模块2</p>
                    </div>
                    <div class="nav">
                        <img src="./assets/pic.png">
                        <p>模块3</p>
                    </div>
                    <div class="nav">
                        <img src="./assets/pic.png">
                        <p>模块4</p>
                    </div>
                    <div class="nav">
                        <img src="./assets/pic.png">
                        <p>模块5</p>
                    </div>
                </div>
            </div>
            <div class="left_bottom" @click="this.$router.push({ path: '/system_setting' })">
                <div class="nav">
                    <img src="./assets/system.png">
                    <p>设置</p>
                </div>
            </div>
        </div>
        <div class="right">
            <router-view></router-view>

        </div>

        <div class="fixed-icons-list">
            <ul v-if="show_fixed_bottom_ul">
                <li @click="this.show_fixed_bottom_ul = false; this.$router.push({ path: '/update_log' });"><svg
                        t="1705382394535" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="14501">
                        <path
                            d="M768.1 547c-105.5 0-191 85.5-191 191s85.5 191 191 191 191-85.5 191-191-85.5-191-191-191z m104.7 264.7c-4.1 0-8.2-0.7-12.3-2.2l-103.8-37.4c-14.3-4.8-24.6-18.3-24.6-34.1V628.7c0-19.9 16.1-36 36-36s36 16.1 36 36v84.1l81 29.1c18.7 6.8 28.3 27.5 21.5 46.1-5.3 14.6-19.1 23.7-33.8 23.7z"
                            p-id="14502"></path>
                        <path
                            d="M511.3 854.4H187.9c-12.9 0-23.9-14.3-23.9-31.1V258.9c0-16.9 10.9-31.1 23.9-31.1h96.4v42.6c0 19.9 16.1 36 36 36s36-16.1 36-36v-42.6h311.8v42.6c0 19.9 16.1 36 36 36s36-16.1 36-36v-42.6h96.2c12.9 0 23.9 14.3 23.9 31.1v216c0 19.9 16.1 36 36 36s36-16.1 36-36v-216c0-56.9-43-103.1-95.9-103.1h-96.2v-54.3c0-19.9-16.1-36-36-36s-36 16.1-36 36v54.3H356.3v-54.3c0-19.9-16.1-36-36-36s-36 16.1-36 36v54.3h-96.4C135 155.8 92 202 92 258.9v564.3c0 56.9 43 103.1 95.9 103.1h323.4c19.9 0 36-16.1 36-36s-16.1-35.9-36-35.9z"
                            p-id="14503"></path>
                        <path
                            d="M598.2 461.2c0-19.9-16.1-36-36-36H321.8c-19.9 0-36 16.1-36 36s16.1 36 36 36h240.4c19.9 0 36-16.1 36-36zM449.3 676c19.9 0 36-16.1 36-36s-16.1-36-36-36H321.8c-19.9 0-36 16.1-36 36s16.1 36 36 36h127.5z"
                            p-id="14504"></path>
                    </svg><span>更新日志</span></li>
                <li @click="this.show_fixed_bottom_ul = false; this.$router.push({ path: '/about_us' })"><svg
                        t="1705382424802" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="15511">
                        <path
                            d="M510.293637 60.72299c-247.537769 0-448.208115 200.670346-448.208115 448.208115 0 247.538793 200.670346 448.208115 448.208115 448.208115 247.538793 0 448.208115-200.670346 448.208115-448.208115C958.501752 261.392312 757.83243 60.72299 510.293637 60.72299zM664.825153 874.792747c-48.916083 20.690228-100.908224 31.181163-154.531516 31.181163s-105.614409-10.490935-154.531516-31.181163c-47.273676-19.99438-89.73986-48.629557-126.220726-85.110423-0.058328-0.059352-0.11461-0.118704-0.172939-0.178055 48.310286-113.693412 158.834518-186.952926 282.632055-186.952926 121.626082 0 233.232972 73.65758 281.588283 184.526667-0.850367 0.865717-1.684362 1.744737-2.542916 2.604314C754.565013 826.163189 712.098829 854.798367 664.825153 874.792747zM511.999488 532.465101c-70.532403 0-127.914298-57.381895-127.914298-127.913275 0-70.53138 57.381895-127.913275 127.914298-127.913275 70.53138 0 127.912251 57.381895 127.912251 127.913275C639.91174 475.083206 582.530868 532.465101 511.999488 532.465101zM829.959144 744.498238c-26.631544-51.340295-65.291029-95.443769-113.349581-128.948861-36.33351-25.330922-76.510558-43.442418-118.842689-53.833069 55.555294-30.439266 93.310176-89.473801 93.310176-157.164482 0-98.743932-80.33363-179.078585-179.077561-179.078585-98.744955 0-179.079608 80.33363-179.079608 179.078585 0 67.692728 37.756929 126.72931 93.315292 157.167552-41.219797 10.122545-80.416518 27.567869-115.981525 51.853995-50.135864 34.235732-90.362031 80.069617-117.597325 133.654023-19.404955-25.794479-35.555797-53.81158-48.224328-83.764775-20.689205-48.917106-31.18014-100.908224-31.18014-154.531516 0-53.622268 10.490935-105.614409 31.18014-154.531516 19.995403-47.273676 48.63058-89.73986 85.110423-126.220726s78.94705-65.11502 126.220726-85.110423c48.916083-20.689205 100.908224-31.18014 154.531516-31.18014s105.615433 10.490935 154.531516 31.18014c47.273676 19.995403 89.73986 48.63058 126.220726 85.110423s65.116043 78.94705 85.110423 126.220726c20.690228 48.916083 31.181163 100.908224 31.181163 154.531516 0 53.623291-10.490935 105.614409-31.181163 154.531516C863.930863 692.364881 848.46052 719.458959 829.959144 744.498238z"
                            fill="#272636" p-id="15512"></path>
                    </svg><span>关于我们</span></li>
            </ul>
        </div>

        <div class="fixed-icons" @click="close_fixed_icons_list">
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
import CommonHeader from './views/common/CommonHeader.vue'
export default {
    name: 'App',
    components: {
        "common-header": CommonHeader
    },
    data() {
        return {
            show_fixed_bottom_ul: false
        }
    },
    methods: {
        routeJump() {
            this.$router.push({ path: '/pic_paste' })
        },
        close_fixed_icons_list() {
            this.show_fixed_bottom_ul = !this.show_fixed_bottom_ul
            setTimeout(() => {
                if (this.show_fixed_bottom_ul) {
                    this.show_fixed_bottom_ul = false
                }
            }, 7000);
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
    height: calc(100vh - 65px);
}

.left {
    display: flex;
    height: 100%; // 新增这行
    flex-direction: column; // 新增这行
    justify-content: space-between;
    background-color: rgb(250, 250, 250);
    border-right: 1px solid #eee;

    .left_top,
    .left_middle,
    .left_bottom {
        width: 80px;
        color: #495366;

        .nav {
            font-size: 11px;
            text-align: center;
            padding-top: 10px;
            cursor: pointer;

            img {
                width: 24px;
            }

            p {
                margin-top: 0px;
            }
        }

    }

}

.right {
    flex: 1;
    border-right: 1px solid #eee;
    // background-color: rgb(243, 244, 248);
    background-color: rgb(243, 244, 248);
    overflow: auto;
    padding-top: 15px;
    padding-left: 20px;
    /* 显示滚动条，只有内容溢出时才会显示 */
}

.fixed-icons-list {
    position: fixed;
    bottom: 55px;
    right: 20px;
    font-size: 13px;
    display: flex;
    flex-direction: column;

    ul {
        list-style: none;

        li {
            border: 1px solid rgb(239, 239, 239);
            cursor: pointer;
            flex-direction: row;
            /* 纵向排列 */
            align-items: center;
            /* 在交叉轴上居中对齐 */
            height: 50px;
            line-height: 50px;
            text-align: left;
            display: flex;
            padding: 0px 10px 0px 10px;

            svg {
                display: flex;
                width: 20px;
                height: auto;
                margin-right: 10px;
            }
        }
    }

    .fixed-icons-supplement {
        display: flex;
        height: 20px;
    }
}

.fixed-icons {
    position: fixed;
    bottom: 15px;
    right: 20px;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    .float_icon {
        width: 40px;
        height: 40px;
        background-color: blue;
        color: white;
        border-radius: 20px;
        text-align: center;
        align-items: center;
        line-height: 40px;
    }


}

/* 定义路由切换的过渡效果 */</style>
