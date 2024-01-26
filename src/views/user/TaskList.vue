<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="update_log_content">
        <div class="title">
            <span>任务列表</span>
        </div>
        <table>
            <thead>
                <tr>
                    <th>序号</th>
                    <th>使用工具</th>
                    <th>任务状态</th>
                    <th>使用时间</th>
                    <th>操作</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in tableData" :key="key">
                    <td>{{ ((currentPage- 1) * pageSize) + (key+1) }}</td>
                    <td>{{ item.tools.name }}</td>
                    <td>{{ item.status_text }}</td>
                    <td>{{ item.created_at }}</td>
                    <td></td>

                </tr>
            </tbody>
        </table>
        <!-- 分页 -->
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage == 1" class="pagination_button">上一页</button>
            <span class="pagination_page_number">{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage == totalPages" class="pagination_button">下一页</button>
        </div>
    </div>
</template>
  
<script>
import apiService from '../../models/axios'
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10, // 每页显示的行数
            total:0
        }
    },
    mounted() {
        this.getTaskList()
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.pageSize);
        },
    },
    methods: {
        getTaskList() {
            apiService.UserTaskListApi({
                page:this.currentPage,
                limit:this.pageSize,
            }).then((response) => {
                this.tableData = response.data.list
                this.total = response.data.total
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.getTaskList()
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
            this.getTaskList()
        },
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets//css/table.css";  
.update_log_content {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    .title{
        flex-direction: row;
        justify-content: flex-start;
        padding: 10px 0px 10px 0px;
    }
}
</style>
  