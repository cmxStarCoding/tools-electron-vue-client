<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="update_log_content">
        <div class="title">
            <span>更新日志</span>
        </div>
        <table>
            <thead>
                <tr>
                    <th>序号</th>
                    <th>版本</th>
                    <th>更新内容</th>
                    <th>发布时间</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in tableData" :key="key">
                    <td>{{ ((currentPage - 1) * pageSize) + (key + 1) }}</td>
                    <td>{{ item.version }}</td>
                    <td>
                        {{ item.content.length > 20 ? item.content.slice(0, 20) + '...' : item.content }}
                        <button v-if="item.content.length > 20" @mouseover="showPopover($event,item.content)" @mouseout="hidePopover" class="popoverTips">
                            !
                        </button>
                    </td>
                    <td>{{ item.created_at }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <!-- 分页 -->
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage == 1" class="pagination_button">上一页</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage == totalPages" class="pagination_button">下一页</button>
        </div>
        <PopoverTips :content="popoverContent" ref="popoverRef"></PopoverTips> 
    </div>
</template>
  
<script>
import apiService from '../../models/axios'
import PopoverTips from '../../components/PopoverTipsComponent.vue';
export default {
    components: {
        PopoverTips,
    },
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10, // 每页显示的行数
            total: 0,
            popoverContent: 'This is a popover!',
        }
    },
    mounted() {
        this.getSystemUpdateLog()
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.pageSize);
        },
    },
    methods: {
        getSystemUpdateLog() {
            apiService.SystemUpdateLogApi({
                page: this.currentPage,
                limit: this.pageSize,
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
            this.getSystemUpdateLog()
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
            this.getSystemUpdateLog()
        },
        showPopover(event,content) {
            this.popoverContent = content
            this.$refs.popoverRef.showPopover();
            // 设置 Popover 的位置
            // 你可以根据需要调整这里的位置
            this.$refs.popoverRef.$el.style.left = event.clientX + 'px';
            this.$refs.popoverRef.$el.style.top = event.clientY + 'px';
        },
        hidePopover() {
            this.$refs.popoverRef.hidePopover();
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

    .title {
        flex-direction: row;
        justify-content: flex-start;
        padding: 10px 0px 10px 0px;
    }
    .popoverTips{
        font-size: 16px;
        color:gray;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid gray;
    }
}
</style>
  