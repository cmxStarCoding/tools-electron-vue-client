<template>
    <div class="contaier">
        <div class="title">
            <span>批量贴图工具</span>
            <span class="use_mark"> ps：想象下，你有1000个二维码需要一一放到同一张图片的固定位置，产生1000张具有不同二维码的新图片，你会怎么办？</span>
        </div>
        <AlertComponent :config="alertConfig"></AlertComponent>
        <div class="top">
            <div class="top_left">
                <div class="top_left_top">
                    <!-- <span>底图(demo)</span> -->
                    <img :src="stretegyFormData.original_image_url" alt="" class="ditu">
                    <!-- 隐藏的文件上传字段 -->
                    <input type="file" ref="originalFileInputRef" accept=".jpg, .jpeg, .png," style="display: none"
                        @change="handleOriginalFileChange">
                    <span>{{ original_image_wh }}</span>

                    <button @click="triggerOriginalFileInput">更换底图</button>
                </div>
                <div class="top_left_bottom">
                    <!-- <span>贴图(demo)</span> -->
                    <div class="top_left_bottom_paste">
                        <img :src="stretegyFormData.stick_img_url" alt="" class="paste">
                        <span>{{ stick_image_wh }}</span>
                    </div>

                    <input type="file" ref="stickFileInputRef" accept=".jpg, .jpeg, .png," style="display: none"
                        @change="handleStickFileChange">

                    <button @click="triggerStickFileInput">更换贴图</button>
                </div>
            </div>

            <div class="top_effect" v-show="effect_image">
                <span>效果图预览</span>
                <img :src="effect_image" alt="">
            </div>
            <div class="top_form">
                <div class="top_form_top">
                    <span class="debug_form_title">{{ title }}</span>
                    <span class="demo_strategy" @click="useDemoStrategy">不知道怎么用？用demo策略数据看下效果吧</span>
                </div>
                <div class="top_form_body">
                    <div class="debug_form">
                        <div class="form_item">
                            <span class="form_item_title">
                                <label>策略名称:</label>
                                <button @mouseover="showPopover($event, 'name')" @mouseout="hidePopover"
                                    class="popoverTips">!</button>
                            </span>
                            <input class="form_input" v-model="stretegyFormData.name" type="text" />
                        </div>
                        <div class="form_item">
                            <span class="form_item_title">
                                <label>贴图背景区域形状:</label>
                                <button @mouseover="showPopover($event, 'bc_shape')" @mouseout="hidePopover"
                                    class="popoverTips">!</button>
                            </span>
                            <select v-model="stretegyFormData.bc_shape">
                                <option value=0>不需背景区域</option>
                                <option value=1>圆形</option>
                                <option value=2>方形</option>
                            </select>
                        </div>
                        <div class="form_item" v-if="stretegyFormData.bc_shape > 0">
                            <span class="form_item_title">
                                <label>贴图背景区域颜色:</label>
                                <button @mouseover="showPopover($event, 'bc_color')" @mouseout="hidePopover"
                                    class="popoverTips">!</button>
                            </span>
                            <div class="form_input" style="border: none;">
                                <pick-colors v-model:value="stretegyFormData.bc_color" @change="changeColor" />
                            </div>
                        </div>

                        <div class="form_item" v-if="stretegyFormData.bc_shape == 1">
                            <span class="form_item_title">
                                <label>背景区域半径:</label>
                                <button @mouseover="showPopover($event, 'r')" @mouseout="hidePopover"
                                    class="popoverTips">!</button>
                            </span>
                            <input class="form_input" v-model="stretegyFormData.r" type="number" />
                        </div>
                        <div class="form_item" v-if="stretegyFormData.bc_shape == 2">
                            <span class="form_item_title">
                                <label>背景区域边长:</label>
                                <button @mouseover="showPopover($event, 'side_length')" @mouseout="hidePopover"
                                    class="popoverTips">!</button>
                            </span>
                            <input class="form_input" v-model="stretegyFormData.side_length" type="number" />
                        </div>
                        <div class="form_item">
                            <span class="form_item_title">
                                <label>x轴坐标:</label>
                                <button @mouseover="showPopover($event, 'x')" @mouseout="hidePopover"
                                    class="popoverTips">!</button>
                            </span>

                            <input class="form_input" v-model="stretegyFormData.x" type="number" />

                        </div>
                        <div class="form_item">
                            <span class="form_item_title">
                                <label>y轴坐标:</label>
                                <button @mouseover="showPopover($event, 'y')" @mouseout="hidePopover"
                                    class="popoverTips">!</button>
                            </span>
                            <input class="form_input" v-model="stretegyFormData.y" type="number" />
                        </div>
                        <div class="form_item">
                            <span class="form_item_title">
                                <label>贴图缩放:</label>
                            </span>
                            <select v-model="stretegyFormData.type" @change="changeScalin">
                                <option value=0>无缩放</option>
                                <option value=1>放大</option>
                                <option value=2>缩小</option>
                            </select>
                        </div>
                        <div class="form_item" v-show="stretegyFormData.type > 0">
                            <span class="form_item_title">
                                <label>{{ multiple_text }}</label>
                            </span>
                            <input class="form_input" v-model="stretegyFormData.multiple" type="number" />
                        </div>
                        <div class="form_item">
                            <span class="form_item_title">
                                <label></label>
                            </span>
                            <div class="form_button">
                                <button @click="previewEffect">预览</button>
                                <button v-if="stretegyFormData.id" @click="addOrUpdateStrategy('edit')">保存</button>
                                <button v-if="!stretegyFormData.id" @click="addOrUpdateStrategy('add')">新增</button>
                                <button @click="resetStretegy">重置</button>
                            </div>
                        </div>
                        <div class="demo_tips" v-if="show_demo_tips">
                            <span>点击预览看看效果吧</span>
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
                        <th>名称</th>
                        <th>背景区域形状</th>
                        <th>半径(px)</th>
                        <th>边长(px)</th>
                        <th>x轴坐标</th>
                        <th>y轴坐标</th>
                        <th>贴图缩放倍数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in tableData" :key="key">
                        <td>{{ ((currentPage - 1) * pageSize) + (key + 1) }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.shape_text }}</td>
                        <td>{{ item.x }}</td>
                        <td>{{ item.side_length }}</td>
                        <td>{{ item.r }}</td>
                        <td>{{ item.y }}</td>
                        <td>{{ item.type_text }}</td>
                        <td>
                            <button :disabled="item.id == stretegyFormData.id" @click="editStrategy(item)">调整</button>
                            <!-- <button v-if="item.id == stretegyFormData.id" @click="saveStrategy(item)">保存</button>
                            <button v-if="item.id == stretegyFormData.id" @click="cancelSaveStrategy()">取消</button> -->
                            <button :disabled="item.id == stretegyFormData.id" @click="deleteStrategy(item)">删除</button>
                            <button :disabled="item.id == stretegyFormData.id"
                                @click="AddStrategyTask(item)">添加策略任务</button>
                        </td>
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
        <PopupForm :visible="AddStrategyTaskFormConfig.isVisible" :title="AddStrategyTaskFormConfig.title"
            :confirmButtonText="AddStrategyTaskFormConfig.confirmButtonText"
            :cancelButtonText="AddStrategyTaskFormConfig.cancelButtonText" @confirm="AddStrategyTaskConfirm"
            @cancel="AddStrategyTaskCancel" @update:visible="updatAddStrategyTaskFormVisible">
            <!-- 直接传入HTML代码 -->
            <template #form>
                <div class="add_strategy_from">
                    <div class="form_item">
                        <span class="compress_form_item_title">
                            <label>贴图压缩包文件：</label>
                        </span>
                        <div>
                            <input type="file" accept=".zip" @change="handleCompressFileChange" />
                        <span v-if="compress_progress >0 ">上传进度：{{compress_progress}}%</span>
                        </div>
                 
                    </div>
                    <div class="form_item">
                        <span class="compress_form_item_title">
                                <label>提示：</label>
                            </span>
                        <div>
                            <span class="compress_form_tips">将您的所有贴图文件，放置在一个文件夹中压缩为zip格式的压缩包进行上传<br>提交任务后可在右上角任务记录中查看和下载结果</span>
                        </div>
                        
                    </div>
                </div>
            </template>
        </PopupForm>
        <PopoverTips :content="popoverContent" ref="popoverRef"></PopoverTips>
    </div>
</template>

<script>
import AlertComponent from '../../components/AlertComponent.vue';
import PopoverTips from '../../components/PopoverTipsComponent.vue';
import apiService from '../../models/axios'
import PickColors from 'vue-pick-colors'
import PopupForm from '../../components/ToastFormComponent.vue';

export default {
    components: {
        AlertComponent,
        PopoverTips,
        PickColors,
        PopupForm
    },
    data() {
        return {
            
            original_image_wh: "",
            stick_image_wh: "",
            show_demo_tips: false,
            demoStretegyFormData: {
                name: "demo策略",
                original_image_url: "https://alitools.cmxstar.top/static/demo_ditu.jpg",
                stick_img_url: "https://alitools.cmxstar.top/static/demo_paste.png",
                bc_shape: 2,
                bc_color: '#1CA085',
                side_length: 85,
                x: 50,
                y: 600,
                type: 2,
                multiple: 5.7
            },
            defaultStretegyFormData: {
                original_image_url: "https://alitools.cmxstar.top/static/demo_ditu.jpg",
                stick_img_url: "https://alitools.cmxstar.top/static/demo_paste.png",
                bc_shape: 0,
                bc_color: '#1CA085',
                type: 0,
            },
            effect_image: "https://alitools.cmxstar.top/static/demo_ditu.jpg",
            popoverContent: "",
            stretegyFormData: {},
            tableData: [],
            type: 0,
            multiple_text: "缩放倍数",
            currentPage: 1,
            pageSize: 2, // 每页显示的行数
            total: 0,
            AddStrategyTaskFormConfig: {
                isVisible: false,
                title: '添加策略任务',
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                formData: {}, // 用于存储表单数据
            },
            strategy_id:0,
            compress_file_url:"",
            compress_progress:0,
        }
    },
    methods: {
        useDemoStrategy() {
            this.stretegyFormData = this.demoStretegyFormData
            this.show_demo_tips = true
        },
        changeColor(value) {
            console.log(value)
        },
        //调整策略
        editStrategy(item) {
            this.stretegyFormData = item
            this.previewEffect()
        },
        //重置
        resetStretegy() {
            this.stretegyFormData = this.defaultStretegyFormData,
                this.effect_image = this.defaultStretegyFormData.original_image_url
        },
        addOrUpdateStrategy(type) {
            console.log(type)
            apiService.UserPicPasteStrategySaveApi(this.stretegyFormData).then(() => {
                let message = this.stretegyFormData.id ? '修改成功' : '添加成功'
                this.showAlert(message)
                this.getUserStrategyList()
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        deleteStrategy(item) {
            console.log(item)
            apiService.UserPicPasteStrategyDeleteApi(item.id, {}).then(() => {
                this.showAlert("删除成功")
                if (item.id == this.stretegyFormData.id) {
                    this.resetStretegy()
                }
                this.getUserStrategyList()
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        //预览
        previewEffect() {
            this.stretegyFormData.bc_shape = parseInt(this.stretegyFormData.bc_shape)
            this.stretegyFormData.is_square = parseInt(this.stretegyFormData.is_square)
            this.stretegyFormData.type = parseInt(this.stretegyFormData.type)
            this.stretegyFormData.multiple = parseFloat(this.stretegyFormData.multiple ? this.stretegyFormData.multiple : 0)

            apiService.UserStrategyDebugApi(this.stretegyFormData).then((response) => {
                this.effect_image = response.data.image_url

            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        getUserStrategyList() {
            apiService.UserStrategyListApi({
                page: this.currentPage,
                limit: this.pageSize,
            }).then((response) => {
                this.tableData = response.data.list
                this.total = response.data.total
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        //上传底图
        handleOriginalFileChange(event) {
            const file = event.target.files[0];
            console.log(file)
            const formData = new FormData();
            formData.append('file', file);
            apiService.UploadFileApi(formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }).then((response) => {

                const img = new Image();
                // 设置图像的 src 属性为图片的 URL
                img.src = response.data.path;  // 替换为你的图片路径
                var that = this;
                // 设置图像加载完成后的回调函数
                img.onload = function () {
                    // 获取图像的宽度和高度
                    let width = img.width;
                    let height = img.height;
                    console.log('宽度:', width);
                    console.log('高度:', height);

                    if (width > 1399) {
                        that.showAlert("图片宽度不能大于1400px", 'fail')
                    } else if (height > 1399) {
                        that.showAlert("图片高度不能大于1400px", 'fail')
                    } else {
                        that.original_image_wh = width + '*' + height
                        that.stretegyFormData.original_image_url = response.data.path
                        that.effect_image = response.data.path
                    }
                };
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        //更换底图触发文件上传字段点击事件
        triggerOriginalFileInput() {
            this.$refs.originalFileInputRef.click();
        },
        //上传贴图
        handleStickFileChange(event) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            apiService.UploadFileApi(formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }).then((response) => {

                const img = new Image();
                // 设置图像的 src 属性为图片的 URL
                img.src = response.data.path;  // 替换为你的图片路径
                var that = this;
                // 设置图像加载完成后的回调函数
                img.onload = function () {
                    // 获取图像的宽度和高度
                    let width = img.width;
                    let height = img.height;
                    console.log('宽度:', width);
                    console.log('高度:', height);

                    if (width > 1399) {
                        that.showAlert("图片宽度不能大于1400px", 'fail')
                    } else if (height > 1399) {
                        that.showAlert("图片高度不能大于1400px", 'fail')
                    } else {
                        that.stick_image_wh = width + '*' + height
                        that.stretegyFormData.stick_img_url = response.data.path
                    }
                };

            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        // 更换贴图触发文件上传字段点击事件
        triggerStickFileInput() {
            this.$refs.stickFileInputRef.click();
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.getUserStrategyList()
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
            this.getUserStrategyList()
        },
        changeScalin() {
            this.multiple_text = this.type == 1 ? '放大倍数' : '缩小倍数';
        },
        showPopover(event, tip_type) {

            if (tip_type == 'x') {
                this.popoverContent = "贴图中心点的x轴坐标，ps:平面坐标系的起点以底图左上角为起点"
            } else if (tip_type == 'y') {
                this.popoverContent = "贴图中心点的y轴坐标，ps:平面坐标系的起点以底图左上角为起点"
            } else if (tip_type == 'r') {
                this.popoverContent = "圆形贴图区域的半径"
            } else if (tip_type == 'side_length') {
                this.popoverContent = "方形贴图区域的边长"
            } else if (tip_type == 'bc_shape') {
                this.popoverContent = "贴图背景区域的形状,圆形背景区域以x，y为圆心，r为半径画圆区域，方形则以x，y为背景区域左上角的起点，以边长画正方形区域，ps：存在背景区域时，贴图图片的中心点会背景区域的中心点重合"
            } else if (tip_type == 'bc_color') {
                this.popoverContent = "贴图背景区域的颜色"
            } else if (tip_type == 'name') {
                this.popoverContent = "您可自定义贴图策略的名称，方便后续查找使用"
            }
            this.$refs.popoverRef.showPopover();
            // 设置 Popover 的位置
            // 你可以根据需要调整这里的位置
            this.$refs.popoverRef.$el.style.left = event.clientX + 'px';
            this.$refs.popoverRef.$el.style.top = event.clientY + 'px';
        },
        hidePopover() {
            this.$refs.popoverRef.hidePopover();
        },
        handleCompressFileChange(event) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            apiService.UploadFileApi(formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                onUploadProgress: progressEvent => {
                    this.compress_progress= Math.round((progressEvent.loaded / progressEvent.total) * 100);
                }
            }).then((response) => {
                this.compress_file_url = response.data.path; 
                console.log(response)

            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        updatAddStrategyTaskFormVisible(value) {
            this.AddStrategyTaskFormConfig.isVisible = value;
        },
        AddStrategyTask(item){
            this.AddStrategyTaskFormConfig.isVisible = true
            this.strategy_id = item.id
            this.compress_progress = 0
        },
        AddStrategyTaskConfirm() {
            apiService.UserPasteApi({
                strategy_id:this.strategy_id,
                compress_file_url:this.compress_file_url
            }).then(() => {
                this.showAlert("添加成功")
                this.AddStrategyTaskFormConfig.isVisible = false;
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        AddStrategyTaskCancel() {
            // 处理取消按钮逻辑，可以根据需要调整
            console.log('Cancelled');
            this.AddStrategyTaskFormConfig.isVisible = false;
        },
    },
    mounted() {
        this.stretegyFormData = this.defaultStretegyFormData
        this.getUserStrategyList()
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.pageSize);
        },
        title() {
            return this.stretegyFormData.id ? '调整批量贴图策略' : '新增批量贴图策略';
        }
    },
    watch: {
        'stretegyFormData.original_image_url'(newValue, oldValue) {
            var that = this
            console.log('oldValue:', oldValue);
            this.getImageSize(newValue)
                .then((size) => {
                    that.original_image_wh = size.width + 'x' + size.height
                })
                .catch((error) => {
                    console.error(error.message);
                });
        },
        'stretegyFormData.stick_img_url'(newValue, oldValue) {
            console.log('oldValue:', oldValue);
            var that = this
            this.getImageSize(newValue)
                .then((size) => {
                    that.stick_image_wh = size.width + 'x' + size.height
                })
                .catch((error) => {
                    console.error(error.message);
                });
        },
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/form.css";
@import "../../assets/css/table.css";

.form_button {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    margin-top: 10px;

    button {
        width: 60px;
        color: #DCDFE6;
        cursor: pointer;
        padding: 4px 15px;
        margin-left: 40px;
        border-radius: 5px;
        border: none;
        background-color: #409EFF;
    }
}

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
    display: flex;

    .use_mark {
        margin-left: 100px;
        color: gray;
    }
}

.top {
    display: flex;
    padding: 0px 0px 10px 0px;
    width: 100%;
    height: 450px;
    border-bottom: 1px solid #DCDFE6;
}

.top_left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 80px;
    border-right: 1px solid #DCDFE6;
}

.top_left_top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
        padding: 4px 20px;
        background-color: #67C23A;
        border: none;
        border-radius: 5px;
        width: 100%;
        margin-top: 10px;
        color: white;
    }

    img {
        height: 250px;
        border-radius: 5%;
    }

    span {
        color: gray;
    }
}

.top_left_bottom {
    margin-top: 10px;
    border-top: 1px solid #DCDFE6;
    display: flex;
    align-items: center;
    padding: 0 5px;

    justify-content: center;
    height: 100%;

    .top_left_bottom_paste {
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
            color: gray;
        }
    }

    button {
        padding: 4px 20px;
        background-color: #67C23A;
        border: none;
        width: 100px;
        border-radius: 5px;
        margin-left: 20px;
        color: white;
    }

    img {
        height: 80px;
    }
}


.top_effect {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-right: 80px;
    border-right: 1px solid #DCDFE6;
    padding-left: 80px;

    img {
        height: 400px;
        border-radius: 5%;
    }

    span {
        padding: 0px 0px 5px 0px;
    }
}





.top_form_body {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    width: 450px;
}

.top_form {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.pagination {
    justify-content: flex-start;
}

.debug_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
}

.top_form_top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;

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
    margin-top: 5px;
}

.bottom_title {
    width: 100%;
    display: flex;
    margin: 10px 0px;
    font-weight: bold;
}

.form_item_title {
    width: 40%;
}

select {
    width: 61%;
    height: 30px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;

    option {
        font-size: 34px;
        height: 30px;
        background-color: red;
    }
}

.popoverTips {
    font-size: 10px;
    color: gray;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid gray;
}

button {
    cursor: pointer;
}

td {
    button {
        padding: 3px 7px;
        margin-right: 5px;
    }
}

.demo_tips {
    width: 100%;
    text-align: center;
    margin-top: 5px;
    color: gray;
}

.add_strategy_from {
    display: flex;
    flex-direction: column;
    width: 85%;
}
.compress_form_item_title{
    width: 26%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 15px;
}

.compress_form_tips{
    color: gray;
    font-size: 12px;
}
</style>