<template>
    <div class="contaier">
        <div class="title">
            <span>批量贴图工具</span>
        </div>
        <AlertComponent :config="alertConfig"></AlertComponent>
        <div class="top">
            <div class="top_left_content">
                <div class="top_left">
                    <span>底图(demo)</span>
                    <img src="../../assets/images/ditu.jpg" alt="" class="ditu">
                    <button>更换底图</button>
                </div>
                <div class="top_middle">
                    <span>贴图(demo)</span>
                    <img src="../../assets/images/paste.png" alt="" class="paste">
                    <button>更换贴图</button>
                </div>
            </div>
            <div class="top_right_content">
                <div class="debug_form_top">
                    <span class="debug_form_title">添加策略</span>
                    <span class="demo_strategy">不知道怎么用？用demo策略数据看下效果吧</span>
                </div>
                <div class="top_right">

                    <div class="debug_form">

                        <div class="form_item">
                            <span class="form_item_title">
                                <label>贴图区域形状:</label>
                            </span>
                            <select value="1">
                                <option value="0">圆形</option>
                                <option value="1">方形</option>
                            </select>
                        </div>

                        <div class="form_item">
                            <span class="form_item_title">
                                <label>x轴坐标:</label>
                            </span>
                            <input class="form_input" v-model="stretegyFormData.username" type="text" />
                        </div>
                        <div class="form_item">
                            <span class="form_item_title">
                                <label>y轴坐标:</label>
                            </span>
                            <input class="form_input" v-model="stretegyFormData.password" type="password" />
                        </div>
                        <div class="form_item">
                            <span class="form_item_title">
                                <label>半径:</label>
                            </span>
                            <input class="form_input" v-model="stretegyFormData.password" type="new_password" />
                        </div>
                        <div class="form_item">
                            <span class="form_item_title">
                                <label>贴图放大:</label>
                            </span>
                            <select value=0>
                                <option value="0">不放大</option>
                                <option value="1">放大</option>
                                <option value="2">缩小</option>
                            </select>
                        </div>
                        <div class="form_item" v-if="true">
                            <span class="form_item_title">
                                <label>{{ multiple_text }}</label>
                            </span>
                            <input class="form_input" v-model="stretegyFormData.password" type="new_password" />
                        </div>
                        <div class="form_item">
                            <span class="form_item_title">
                                <label>边长:</label>
                            </span>
                            <input class="form_input" v-model="stretegyFormData.password" type="new_password" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom">
            <div class="bottom_title">
                <span>我的策略</span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>贴图区域形状</th>
                        <th>x轴坐标</th>
                        <th>y轴坐标</th>
                        <th>半径</th>
                        <th>贴图放大/缩小</th>
                        <th>贴图放大/缩小倍数</th>
                        <th>变长</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in tableData" :key="key">
                        <td>{{ ((currentPage - 1) * pageSize) + (key + 1) }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.age }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.age }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.age }}</td>
                        <td>{{ item.name }}</td>
                        <td>
                            <button>123</button>
                            <button>添加此策略任务</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 分页 -->
            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
            </div>
        </div>
    </div>
</template>

<script>
import AlertComponent from '../../components/AlertComponent.vue';

export default {
    components: {
        AlertComponent
    },
    data() {
        return {
            stretegyFormData: {

            },
            tableData: [
                { id: 1, name: 'John', age: 25 },
                { id: 2, name: 'Jane', age: 30 },
                // 其他数据...
            ],
            multiple_text: "贴图放大倍数",
            currentPage: 1,
            pageSize: 2, // 每页显示的行数
        }
    },
    computed: {
        currentTableData() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.tableData.slice(startIndex, endIndex);
        },
        totalPages() {
            return 2
            // return Math.ceil(this.tableData.length / this.pageSize);
        },
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }

            this.tableData = [
                { id: 3, name: '哈哈', age: 33 },
                { id: 4, name: '嘿嘿', age: 32 },
                // 其他数据...
            ]

        },
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/form.css";
@import "../../assets/css/table.css";

.contaier {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    font-size: 13px;
}

.title {
    padding: 15px 0px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #DCDFE6;
    margin-bottom: 10px;
}

.top {
    display: flex;
    padding: 0px 0px 10px 0px;
    width: 100%;
    height: 500px;
    justify-content: flex-start;
    border-bottom: 1px solid #DCDFE6;
}

.top_left_content {
    width: 60%;
    display: flex;
    height: 100%;
}

.top_left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
        padding: 4px 40px;
        background-color: #67C23A;
        border: none;
        border-radius: 5px;
        width: 100%;
        margin-top: 10px;
    }

    span {
        margin-bottom: 10px;
        font-weight: bold;
    }
}

.top_middle {
    padding: 0 20px;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #DCDFE6;
    // border-left: 1px solid #DCDFE6;
    // width: 350px;
    height: 100%;

    button {
        padding: 4px 40px;
        background-color: #67C23A;
        border: none;
        border-radius: 5px;
        margin-top: 10px;
    }

    span {
        margin-bottom: 10px;
        font-weight: bold;
    }
}


.top_right_content{
    display: flex;
    flex-direction: column;
    width: 100%;
}
.top_middle,
.top_right {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    width: 500px;
    height: 100%;
}


.ditu {
    height: 350px;
}

.paste {
    height: 150px;
}


.debug_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
}

.debug_form_top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 30px;

    .debug_form_title {
        margin-left: 10px;
    }

    .demo_strategy {
        margin-right: 10px;
        color: #67C23A;
        cursor: pointer;
    }

    // margin: 10px 0px;
}


.bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}

.bottom_title {
    width: 100%;
    display: flex;
    margin: 10px 0px;
    font-weight: bold;
}

.form_item_title{
    width: 30%;
}

select {
    width: 61%;
    height: 30px;
    border: 1px solid #DCDFE6;

    option {
        font-size: 34px;
        height: 30px;
        background-color: red;
    }
}</style>