<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="update_log_content">
        <div class="title">
            <span>使用记录</span>
        </div>
        <table>
            <thead>
                <tr>
                    <th>序号</th>
                    <th>版本</th>
                    <th>发布时间</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in tableData" :key="key">
                    <td>{{ ((currentPage- 1) * pageSize) + (key+1) }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.age }}</td>
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
</template>
  
<script>
export default {
    data() {
        return {
            tableData: [
                { id: 1, name: 'John', age: 25 },
                { id: 2, name: 'Jane', age: 30 },
                // 其他数据...
            ],
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
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.update_log_content {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    .title{
        flex-direction: row;
        justify-content: flex-start;
        padding: 10px 0px 10px 0px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
        th,
        td {
            border: 1px solid rgb(239, 239, 239);
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    }

    .pagination {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        display: flex;
        margin-top: 20px;

        button {
            padding: 4px;
            margin: 0 3px;
            cursor: pointer;
        }
    }


}
</style>
  