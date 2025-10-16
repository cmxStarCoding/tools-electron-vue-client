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
                            <el-avatar shape="square" :size="40" fit="cover" :src="url" />
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
                            <el-avatar shape="square" :size="40" fit="cover" :src="url" />
                            <span class="group_name">{{ friend.name }}</span>
                        </div>
                    </div>

                </div>

            </el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>

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
            url: "https://cms-static.pengwin.com/data/crm/default/cf/b8/d0/cfb8d09d4f09ec93f205b315616d77b8.jpeg",
            groupCollapsed: false, // 默认展开
            friendCollapsed: true,
            newFriendCollapsed: false
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
            .first_letter{
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