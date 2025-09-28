<template>
    <CommonTopHeader></CommonTopHeader>
    <!-- <CommonHeader> </CommonHeader> -->
    <div class="project_content">
        <div class="project_left">
            <div>
                <div class="left_top">
                    <div>
                        <el-avatar shape="square" :src="squareUrl" />
                    </div>

                    <div class="nav" @click="this.$router.push({ path: '/home' })"
                        :class="{ 'active': $route.path == '/home' }">
                        <div class="new_msg">
                            <el-icon>
                                <ChatDotRound />
                            </el-icon>
                            <span>{{ new_msg_data.new_msg_num }}</span>
                        </div>
                    </div>
                    <div class="nav" @click="this.$router.push({ path: '/group_friend_and_new_friend' })">
                        <el-icon>
                            <User />
                        </el-icon>
                    </div>
                    <div class="nav">
                        <el-icon>
                            <Tools />
                        </el-icon>

                    </div>
                </div>
            </div>
            <div class="left_bottom">
                <div class="nav" @click="this.$router.push({ path: '/system_setting' })"
                    :class="{ 'active': $route.path == '/system_setting' }">
                    <el-icon>
                        <Operation />
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="project_right">
            <router-view @updateNewMsgData="new_msg_data = $event"></router-view>
        </div>


        <!-- <div class="fixed-icons" @click="close_fixed_icons_list">
            <div class="float_icon">
                ?
            </div>
        </div> -->
    </div>
</template>

<script>
// const { remote } = require('electron');
// const mainProcessEnv = remote.getGlobal('process.env');
// import HelloWorld from './components/HelloWorld.vue'
// console.log(process.env.VUE_APP_API_URL, 'asdasdasd111')
import CommonTopHeader from './views/common/CommonTopHeader.vue'
// import CommonHeader from './views/common/CommonHeader.vue'
import apiService from './models/axios'

export default {
    name: 'App',
    components: {
        CommonTopHeader,
        // CommonHeader

    },

    mounted() {
        // this.getToolsList()
    },
    data() {
        return {
            new_msg_data: {},
            show_fixed_bottom_ul: false,
            squareUrl: "https://cms-static.pengwin.com/data/crm/default/d4/e4/dc/d4e4dc60b1ef06ddc57e7c9185e584e1.jpg",
            recommend_tools_list_data: []
        }
    },
    methods: {
        getToolsList() {
            apiService.ToolsListApi({
                is_recommend: 1
            }).then((response) => {
                this.recommend_tools_list_data = response.data
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
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

.project_content {
    display: flex;
    height: calc(100vh - 30px);

}

.project_left {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(250, 250, 250);
    border-right: 1px solid #eee;

    .left_top {
        display: flex;
        flex-direction: column;
        // justify-content: flex-start;
        align-items: center;
    }

    .el-avatar {
        margin: 13px 0px 13px 0px;
    }

    .el-icon {
        font-size: 23px;
    }

    .left_top,
    .left_middle,
    .left_bottom {
        width: 80px;
        color: #495366;
        cursor: pointer;

        .nav {
            // font-size: 11px;
            text-align: center;
            height: 50px;
            // padding-top: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            // width: 80%;
            img {
                width: 24px;
            }

            p {
                margin-top: 4px;
            }

            .new_msg {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding-left: 18px;

                span {
                    background-color: rgb(235, 5, 5);
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 10px;
                    padding-left: 2px;
                    /* 添加以下代码实现完美居中 */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: white;
                    font-size: 10px;
                    position: relative;
                    left: -6px;
                    top: -7px;
                }
            }

        }

    }

    .left_bottom {
        margin-bottom: 10px;
    }

}

.project_right {
    flex: 1;
    border-right: 1px solid #eee;
    // background-color: rgb(243, 244, 248);
    background-color: rgb(243, 244, 248);
    overflow: auto;
    // padding-top: 15px;
    // padding-left: 20px;
    width: 100%;
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

.download_new_version {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    padding: 8px 12px;
}

.nav.active {
    /* 这里是你想要应用的样式 */
    //   background-color:#DCDFE6;
    //   border-radius: 10%;
    font-weight: bold;
    //   padding-bottom: 3px;
    /* 添加其他样式 */
}

/* 定义路由切换的过渡效果 */
</style>
