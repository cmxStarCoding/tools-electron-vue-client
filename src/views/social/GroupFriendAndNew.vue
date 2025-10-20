<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="250px">
                <div class="new_friend_area">
                    <div class="new_friend_area_head" @click="toggleNewFriend">
                        <div class="new_friend_area_head_top">
                            <svg t="1760618163960" class="icon" :class="{ rotated: newFriendCollapsed }"
                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4583"
                                width="15" height="15">
                                <path d="M320 230.8 361.4 192 704 512 361.4 832 320 793.4 621 512Z" p-id="4584"></path>
                            </svg>
                            <span class="title">新的朋友</span>
                        </div>
                        <div class="new_friend_num">1个</div>
                    </div>
                    <div class="new_friend_area_body" v-if="newFriendCollapsed">
                        <div class="new_friend_item" v-for="new_friend in new_friends" :key="new_friend.id">
                            <el-avatar shape="square" :size="35" fit="cover" :src="url" />
                            <span class="new_group_name">{{ new_friend.name }}</span>
                        </div>
                    </div>

                </div>

                <div class="group_area">
                    <div class="group_area_head" @click="toggleGroup">
                        <div class="group_area_head_top">
                            <svg t="1760618163960" class="icon" :class="{ rotated: groupCollapsed }"
                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4583"
                                width="15" height="15">
                                <path d="M320 230.8 361.4 192 704 512 361.4 832 320 793.4 621 512Z" p-id="4584"></path>
                            </svg>
                            <span class="title">群聊</span>
                        </div>
                        <div class="group_num">1个</div>
                    </div>
                    <div class="group_area_body" v-if="groupCollapsed">
                        <div class="group_item" v-for="group in groups" :key="group.id">
                            <el-avatar shape="square" :size="35" fit="cover" :src="url" />
                            <span class="group_name">{{ group.name }}</span>
                        </div>
                    </div>

                </div>
                <div class="friend_area">
                    <div class="friend_area_head" @click="toggleFriend">
                        <div class="friend_area_head_top">
                            <svg t="1760618163960" class="icon" :class="{ rotated: friendCollapsed }"
                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4583"
                                width="15" height="15">
                                <path d="M320 230.8 361.4 192 704 512 361.4 832 320 793.4 621 512Z" p-id="4584"></path>
                            </svg>
                            <span class="title">联系人</span>
                        </div>
                        <div class="friend_num">1个</div>
                    </div>
                    <div class="friend_area_body" v-if="friendCollapsed">
                        <span class="first_letter">A</span>
                        <div class="friend_item" v-for="friend in friends" :key="friend.id">
                            <el-avatar shape="square" :size="35" fit="cover" :src="url" />
                            <span class="group_name">{{ friend.name }}</span>
                        </div>
                    </div>

                </div>

            </el-aside>
            <el-container>
                <el-header></el-header>
                <el-main>
                    <div class="new_friend_detail" v-if="new_friend_detail_show">
                        <div class="new_friend_detail_head">
                            <el-avatar shape="square" :size="43" fit="cover" :src="url" />
                            <div class="nickname_area">
                                <span class="nickname">会飞的鱼</span>
                                <span class="new_friend_sex">
                                    <svg v-if="sex == 2" t="1760708257098" class="icon" viewBox="0 0 1024 1024"
                                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9423" width="13"
                                        height="13">
                                        <path d="M893.456828 709.055005" fill="#FB7373" p-id="9424"></path>
                                        <path d="M491.889987 337.939709" fill="#FB7373" p-id="9425"></path>
                                        <path d="M568.154951 338.993714" fill="#FB7373" p-id="9426"></path>
                                        <path
                                            d="M948.897511 786.207176 673.336502 664.326291c-22.270213-10.541077-20.563338-16.931624-18.828834-25.78834 2.018983-10.243295 8.904811-19.173688 18.046005-23.893176 17.030885-8.782014 42.979884-13.674441 83.593883-20.721951l6.099928-1.089821c15.011902-2.675946 27.946492-11.828396 35.440164-25.106818 7.43125-13.19144 8.597819-28.834722 3.172249-42.955324-15.494902-40.23026-25.793456-80.597643-30.624485-119.9233-1.858324-15.371082-4.270257-32.860409-6.932899-52.05968-4.384867-30.977525-10.117428-72.856331-15.679098-122.189923C735.657896 124.682697 644.050502 47.813982 529.35425 47.813982c-114.237811 0-205.846228 76.868715-217.811748 182.796256-5.67321 50.337455-11.345396 91.918479-15.668865 122.549104-2.675946 19.136849-5.066389 36.452213-6.935969 51.79976-4.805446 39.314401-15.111163 79.643921-30.606065 119.898741-5.425569 14.07046-4.285606 29.690206 3.133364 42.868343 7.493671 13.290701 20.412912 22.456455 35.536354 25.155936l6.15621 1.077541c40.577161 7.03523 66.316381 11.803837 83.532485 20.685111 9.228175 4.768607 16.188704 13.922081 18.158568 23.893176 1.771343 9.005095 3.059686 15.519462-18.034748 25.502837L112.818485 784.967952l-4.40738 1.238201c-8.534374 4.929266-24.806989 17.179264-24.806989 43.945885l0 75.072813c0 12.968359 8.380878 37.529755 49.615001 37.529755L925.94987 942.754604c36.452213 0 45.883003-16.696264 45.883003-37.542035l0-75.060533C971.832873 811.573913 964.367855 795.149848 948.897511 786.207176zM924.649248 891.590318 134.768403 891.590318l0-61.437258c0-0.35918 0-0.681522 0-0.966001l271.381827-119.007441c14.19428-6.712889 58.292638-27.16264 47.590901-81.452103-4.954849-25.169239-21.213137-47.291073-44.213991-59.168588-23.818475-12.274558-52.583612-17.724687-97.81784-25.565259l-6.145977-0.904603c16.994046-44.132126 28.370141-88.536452 33.683147-131.9758 1.845021-15.086603 4.213975-32.129768 6.839779-50.907437 4.360308-30.928407 10.120498-72.954569 15.85613-123.912148 9.165754-81.105203 78.002538-137.747247 167.865195-137.747247 89.404216 0 158.237931 56.642045 167.403684 137.734968 5.623068 49.965995 11.434423 92.302219 15.85613 123.552967 2.613524 18.814508 4.980431 36.007075 6.813173 51.142797 5.338588 43.500746 16.659425 87.917352 33.579793 131.901099l-5.969968 1.077541c-45.122687 7.816013-73.995271 13.240559-97.975429 25.602098-22.765493 11.742439-39.33896 33.864272-44.330648 59.168588-10.652618 54.016241 32.996508 74.664513 47.971571 81.736583L924.711669 827.045279 924.649248 891.590318z"
                                            fill="#FB7373" p-id="9427"></path>
                                    </svg></span>
                                <svg v-if="sex == 1" t="1760708366269" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="10529" width="13" height="13">
                                    <path d="M893.456828 709.055005" fill="#FB7373" p-id="10530"></path>
                                    <path d="M491.889987 337.939709" fill="#FB7373" p-id="10531"></path>
                                    <path d="M568.154951 338.993714" fill="#FB7373" p-id="10532"></path>
                                    <path
                                        d="M910.9789 710.390419l-152.501276-73.02927c-10.279111-4.861728-16.752546-13.895475-19.936051-24.7548-2.936889-10.007935-5.838985-20.225647-0.520863-28.752858 38.946011-62.367443 48.593741-140.382261 48.593741-192.606693l0-100.091626c0-166.642344-130.427538-241.22704-259.322164-241.22704-128.980583 0-259.494079 74.584696-259.494079 241.22704l0 100.091626c0 49.373501 19.222807 129.288598 58.735729 192.051037 5.219885 8.305153 9.117658 18.313088 6.229888 28.184923-3.233648 11.081383-9.80532 20.274766-20.269649 25.223474L151.250796 710.440561c-11.414981 5.034666-72.764234 32.31908-72.764234 75.794244l0 106.48422c0 28.579919 33.213449 47.991014 60.47228 47.991014l792.243659 0c28.592198 0 44.722574-20.398586 44.722574-47.991014l0-106.485243C975.926098 741.377154 924.380118 715.807802 910.9789 710.390419zM924.760788 891.644553c0 1.283226 7.528464-1.076518 6.220678-1.076518L140.106991 890.568035c-0.444115 0-10.455119 2.866281-10.455119 2.15099L129.651872 786.320763c12.279674-6.009877 23.311939-20.87954 43.500746-29.887704l159.78824-74.004481c23.569812-11.118222 42.472324-31.825846 49.753147-56.777121 6.997368-23.964808-0.632403-48.558949-13.675464-69.27783-33.775244-53.655014-50.055023-122.477472-50.055023-165.124781l0-100.091626c0-92.181469 54.533011-190.681854 208.328769-190.681854 100.757798 0 208.156854 50.088792 208.156854 190.681854l0 100.091626c0 43.153846-6.66991 112.469538-39.98876 165.841096-12.883425 20.632923-13.713326 46.053895-6.765077 69.734224 7.243985 24.692379 26.030863 45.177945 49.377594 56.247049l156.353001 73.362868-3.552919 0.604774c20.546965 8.268314 33.886785 23.211654 33.886785 29.196972l0 105.408725L924.760788 891.644553z"
                                        fill="#FB7373" p-id="10533"></path>
                                </svg>
                            </div>

                        </div>
                        <div class="new_friend_detail_remark">
                            <textarea>W.: 轻流 - 尉静文，看到您在我们官网有注册，注册过来在了解相关的软件吗</textarea>
                        </div>
                        <div class="new_friend_detail_source">
                            <span class="left">来源</span> <span class="right">通过手机号添加</span>
                        </div>
                        <div class="operate">
                            <button class="expire">已过期</button>
                            <button class="agree">同意</button>
                            <button class="refuse">拒绝</button>
                        </div>
                    </div>

                    <div class="group_detail" v-if="group_detail_show">
                        <div class="group_detail_head">
                            <el-avatar shape="square" :size="70" fit="cover" :src="url" />
                            <span class="group_name">28#509</span>
                            <button class="enter_group">进入群聊</button>
                        </div>
                        <div class="group_detail_bottom">
                            <span class="del_group">删除群聊</span>
                        </div>
                    </div>

                    <div class="friend_detail" v-if="friend_detail_show">
                        <div class="head">
                            <el-avatar shape="square" :size="40" fit="cover" :src="url" />
                            <div class="head_info">
                                <div class="head_nickname">
                                    <span>A00一汽丰田</span> <span><svg t="1760624224138" class="icon"
                                            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                            p-id="5590" width="15" height="15">
                                            <path
                                                d="M170.666667 437.333333c-41.386667 0-74.666667 33.28-74.666667 74.666667s33.28 74.666667 74.666667 74.666667 74.666667-33.28 74.666666-74.666667-33.28-74.666667-74.666666-74.666667zM512 437.333333c-41.386667 0-74.666667 33.28-74.666667 74.666667s33.28 74.666667 74.666667 74.666667 74.666667-33.28 74.666667-74.666667-33.28-74.666667-74.666667-74.666667zM853.333333 437.333333c-41.386667 0-74.666667 33.28-74.666666 74.666667s33.28 74.666667 74.666666 74.666667 74.666667-33.28 74.666667-74.666667-33.28-74.666667-74.666667-74.666667z"
                                                fill="#8D9297" p-id="5591"></path>
                                        </svg></span>
                                </div>
                                <span class="wechat_number">

                                </span>
                            </div>
                        </div>
                        <div class="remark">
                            <span>备注</span><input type="text" name="friend_remark">
                        </div>
                        <data class="source">
                            <span>来源</span> <span>通过搜索手机号添加</span>
                        </data>
                        <div class="operate">
                            <span>
                                <svg t="1760624517656" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="6601" width="15" height="15">
                                    <path
                                        d="M512 117.76c-225.28 0-409.6 161.28-409.6 358.4 0 112.64 58.88 215.04 153.6 279.04v181.76l179.2-110.08c25.6 5.12 51.2 7.68 76.8 7.68 225.28 0 409.6-161.28 409.6-358.4 0-199.68-184.32-358.4-409.6-358.4z m0 665.6c-30.72 0-58.88-2.56-87.04-10.24L304.64 844.8l2.56-117.76c-92.16-56.32-153.6-148.48-153.6-250.88 0-168.96 161.28-307.2 358.4-307.2s358.4 138.24 358.4 307.2-161.28 307.2-358.4 307.2z"
                                        p-id="6602" fill="#576B95"></path>
                                </svg>
                            </span>
                            <span>
                                发消息
                            </span>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

export default {
    name: "GroupFriendAndNew",
    components: {

    },
    setup() {

    },
    mounted() {

    },
    data() {
        return {
            new_friends: [
                { id: 1, name: '张三' },
                { id: 2, name: '李四' },
                { id: 3, name: '王五' }
            ],
            groups: [
                { id: 1, name: '张三' },
                { id: 2, name: '李四' },
                { id: 3, name: '王五' }
            ],
            friends: [
                { id: 1, name: '张三' },
                { id: 2, name: '李四' },
                { id: 3, name: '王五' }
            ],
            url: "https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg",
            groupCollapsed: false, // 默认展开
            friendCollapsed: true,
            newFriendCollapsed: false,
            friend_detail_show: true,
            group_detail_show: false,
            new_friend_detail_show: false,
            sex: 1,
        }
    },
    methods: {
        toggleNewFriend() {
            this.newFriendCollapsed = !this.newFriendCollapsed;
        },
        toggleGroup() {
            this.groupCollapsed = !this.groupCollapsed;
        },
        toggleFriend() {
            this.friendCollapsed = !this.friendCollapsed;
        },
    }
}
</script>

<style lang="scss" scoped>
.icon {
    transition: transform 0.2s;
}

.icon.rotated {
    transform: rotate(90deg);
    /* 向下 */
}

.el-main {
    background-color: #fff;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .new_friend_detail {
        font-size: 14px;
        color: #2A2A2A;
        .new_friend_detail_head {
            margin-bottom: 20px;
            display: flex;

            .nickname_area {
                display: flex;
                flex-direction: row;
         
                .nickname{
                    margin-left: 13px;
                }
                svg{
                    position: relative;
                    top: 2px;
                    margin-left: 3px;
                }

            }
        }
        .new_friend_detail_remark{
            margin-bottom: 20px;
            textarea{
                width: 320px;
                height: 60px;
                font-size: 11px;
                flex: 1;
                border: none;
                color: #9E9E9E;
                outline: none;
                resize: none;
                background-color: #F2F2F2;
                border-radius: 3px;
            }
        }
        .new_friend_detail_source{
            height: 50px;
            border-top: 1px solid #EEEEEE;
            border-bottom: 1px solid #EEEEEE;
            display: flex;
            align-items: center;
            .left{
                color: #9E9E9E;
                margin-right: 50px;
                
            }
        }
        .operate{
            margin-top: 10px;
            display: flex;
            justify-content: center;
            .expire{
                background-color: #F2F2F2;
                padding: 5px 35px;
                border: none;
                border-radius: 3px;
                color: #9E9E9E;
            }
            .agree{
                background-color: #38E16E;
                padding: 5px 35px;
                border: none;
                border-radius: 3px;
                color: white;
            }
            .refuse{
                background-color: #F24159;
                padding: 5px 35px;
                border: none;
                border-radius: 3px;
                color: white;
            }
        }
    }
    .group_detail{
        height: 80vh;
        font-size: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .group_detail_head{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .group_name{
                padding: 15px 0px 15px 0px;
                font-size: 14px;
            }
            .enter_group{
                font-size: 12px;
                background-color: #06C160;
                color: white;
                padding: 5px 7px 5px 7px;
                border: none;
                border-radius: 3px;
            }
        }
        .group_detail_bottom{
            color: #566B95;
            .del_group{
                cursor: pointer;
                // &:hover{
                    // background-color: red;
                // }
            }
        }
    }
}
.el-header{
     background-color: #fff;
}
.el-aside {
    height: calc(100vh - 30px);
    background-color: #F7F7F7;
    padding-left: 8px;

    .group_area {
        font-size: 13px;
        display: flex;
        flex-direction: column;
        padding-right: 10px;

        .group_area_head {
            display: flex;
            height: 40px;
            justify-content: space-between;
            align-items: center;

            .group_area_head_top {
                display: flex;
                align-items: center;
            }

            .col_icon {
                color: #A1A1A1;
                margin-right: 4px;
                font-size: 15px;
            }
        }

        .group_area_body {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .group_item {
                padding: 3px 0px;
                display: flex;
                align-items: center;

                .el-avatar {
                    margin-right: 10px;
                }
            }
        }
    }

    .friend_area {
        font-size: 13px;
        display: flex;
        flex-direction: column;
        padding-right: 10px;

        .friend_area_head {
            display: flex;
            height: 40px;
            justify-content: space-between;
            align-items: center;

            .friend_area_head_top {
                display: flex;
                align-items: center;
            }

            .col_icon {
                color: #A1A1A1;
                margin-right: 4px;
                font-size: 15px;
            }
        }

        .friend_area_body {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .first_letter {
                color: #A1A1A1;
                margin-left: 15px;
                padding: 7px 0px;
            }

            .friend_item {
                padding: 3px 0px;
                display: flex;
                align-items: center;

                .el-avatar {
                    margin-right: 10px;
                }
            }
        }
    }

    .new_friend_area {
        font-size: 13px;
        display: flex;
        flex-direction: column;
        padding-right: 10px;

        .new_friend_area_head {
            display: flex;
            height: 40px;
            justify-content: space-between;
            align-items: center;

            .new_friend_area_head_top {
                display: flex;
                align-items: center;
            }

            .col_icon {
                color: #A1A1A1;
                margin-right: 4px;
                font-size: 15px;
            }
        }

        .new_friend_area_body {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .new_friend_item {
                padding: 3px 0px;
                display: flex;
                align-items: center;

                .el-avatar {
                    margin-right: 10px;
                }
            }
        }
    }

    .group_num {
        color: #A1A1A1;
        font-size: 12px;
        letter-spacing: 1px;
    }

    .friend_num {
        color: #A1A1A1;
        font-size: 12px;
        letter-spacing: 1px;
    }

    .new_friend_num {
        color: #A1A1A1;
        font-size: 12px;
        letter-spacing: 1px;
    }



}
</style>