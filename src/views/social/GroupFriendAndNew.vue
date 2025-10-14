<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="250px">
                <el-collapse :expand-icon-position="position" v-model="activeNames">
                    <el-collapse-item title="联系人" name="1">
                        <div class="friend-list">
                            <div v-for="friend in friends" :key="friend.id" class="friend-item"
                                @click="searchFriend(friend.id)">
                                <el-avatar shape="square" :size="35" fit="cover" :src="url" />
                                <span class="friend-name">{{ friend.name }}</span>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
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
            activeNames: ['1'],
            position: "left",
            friends: [
                { id: 1, name: '张三' },
                { id: 2, name: '李四' },
                { id: 3, name: '王五' }
            ],
            url: "https://cms-static.pengwin.com/data/crm/default/cf/b8/d0/cfb8d09d4f09ec93f205b315616d77b8.jpeg",

        }
    },
    methods: {
        searchFriend(id) {
            console.log(id)
        },
    }
}
</script>

<style lang="scss" scoped>

.el-aside {
    height: calc(100vh - 30px);
    // border: 1px solid grey;
    background-color: #F7F7F7;
    // height: calc(100vh);
    padding-left: 8px;
    /* 穿透 Element Plus 内部组件 */
    ::v-deep(.el-collapse-item__header) {
        border-bottom: none !important;
        background-color: #F7F7F7;
    }

    ::v-deep(.el-collapse-item__wrap) {
        background-color: #F7F7F7;
        border-bottom: none !important;
    }
    .friend-list {
        .friend-item {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 3px 0;

            .el-avatar {
                margin-right: 10px;
            }

            .friend-name {
                font-size: 14px;
                color: #333;
            }
        }
    }

}

.el-main {
    // border: 1px solid grey;
    // background-color: beige;
}
</style>