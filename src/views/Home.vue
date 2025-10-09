<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="common-layout">
        <el-container>
            <el-aside :style="{ width: asideWidth + 'px' }" class="aside-resizable">
                <div class="input-container">
                    <el-input v-model="search_content" class="responsive-input" placeholder="搜索"
                        :prefix-icon="Search" />
                    <el-icon>
                        <Plus />
                    </el-icon>
                </div>
                <div class="conversation_list">

                    <el-avatar shape="square" :size="40" fit="cover" :src="url" />
                    <span class="new_msg">12</span>
                    <div class="conversation_info">
                        <div class="conversation_info_top">
                            <div>
                                <!-- <el-text class="mx-1" size="small">群聊</el-text> -->
                                <span style="font-size: 14px;">婷婷</span>
                            </div>
                            <el-text class="mx-1" size="small">19:21</el-text>
                        </div>
                        <div>
                            <el-text size="small" type="info">大家好啊</el-text>
                        </div>
                    </div>
                </div>
                <div class="conversation_list">

                    <el-avatar shape="square" :size="40" fit="cover" :src="url" />
                    <span class="new_msg">5</span>
                    <div class="conversation_info">
                        <div class="conversation_info_top">
                            <div>
                                <!-- <el-text class="mx-1" size="small">群聊</el-text> -->
                                <span style="font-size: 14px;">老妈</span>
                            </div>
                            <el-text class="mx-1" size="small">19:21</el-text>
                        </div>
                        <div>
                            <el-text size="small" type="info">吃饭了吗</el-text>
                        </div>
                    </div>
                </div>
                <!-- 拖拽条 -->
                <div class="drag-handle" @mousedown="startResize"></div>
            </el-aside>
            <el-container>
                <el-header height="40px">婷婷</el-header>
                <el-main :style="{ height: mainHeight + 'px' }" ref="mainContainer">
                    <div class="messages-wrapper" ref="messagesWrapper">
                        <div v-if="chat_Messages">
                            <div v-for="message in chat_Messages" :key="message.id" class="message-item">
                                <div
                                    :class="message.sender === 'self' ? 'message-content-self' : 'message-content-other'">
                                    <div class="message-avatar">
                                        <el-avatar :size="32" shape="square"
                                            :src="message.sender === 'self' ? url : message.avatar" />
                                    </div>
                                    <div class="message-info">
                                        <div class="text_content" v-if="message.msg_type == 1">
                                            {{ message.content }}
                                        </div>
                                        <div class="video_content" v-if="message.msg_type == 3">
                                            <videoPlay v-if="message.msg_type == 3" v-bind="options"
                                                src="https://cms-static.pengwin.com/data/video/20220321/2220321647849740898836.mp4" />
                                        </div>
                                        <div class="image_content" v-viewer v-if="message.msg_type == 2">
                                            <img v-for="src in images" :key="src" :src="src">
                                        </div>

                                        <div class="file_content" v-viewer v-if="message.msg_type == 4"
                                            @click="handleFileClick">
                                            <div class="file_info_area">
                                                <p class="file_name">测试文件上传123123123121.xlsx</p>
                                                <p class="file_size">8.8k</p>
                                            </div>
                                            <div class="file_icon">
                                                <svg t="1759156786577" class="icon" viewBox="0 0 1024 1024"
                                                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3454"
                                                    width="70" height="70">
                                                    <path
                                                        d="M903.2 315.4V950c0 15.7-12.7 28.4-28.4 28.4H217.3c-12 0-21.6-9.7-21.6-21.6V98.7c0-8.8 7.1-15.9 15.9-15.9h443.1c0.9 0 1.4 1.1 0.8 1.8-0.4 0.4-0.4 1.1 0.1 1.5l247.5 228.6c0 0.1 0.1 0.4 0.1 0.7z"
                                                        fill="#F4F4F4" p-id="3455"></path>
                                                    <path
                                                        d="M654.8 300.1V82.8L903.3 315H669.7c-8.2 0-14.9-6.7-14.9-14.9zM431.4 374.1H213.2c-58.4 0-105.7-47.3-105.7-105.7 0-58.4 47.3-105.7 105.7-105.7h218.2c58.4 0 105.7 47.3 105.7 105.7 0.1 58.3-47.3 105.7-105.7 105.7z"
                                                        fill="#4BC929" p-id="3456"></path>
                                                    <path
                                                        d="M386.1 275.1c-1.1-1.7-2.3-3.1-3.4-4.3-4.1-4.2-9.6-7.1-16.5-8.5-4.5-1.1-8.5-1.4-11-1.5h-64.3c-8.6 0.1-15-1.7-18.5-5.3-0.7-0.7-1.2-1.4-1.6-2.1v-0.3c-1.2-2-1.9-4.5-1.9-7.5v-1-1.1c0.1-4.2 1.3-7.5 3.9-9.9 5.4-5.1 15.5-5.8 18.6-5.7H383.3c4 0 7.3-3.3 7.3-7.3s-3.3-7.3-7.3-7.3h-91.4c-2.5-0.1-17.2-0.2-27.6 8.3h-0.4c-0.6 0.5-1.2 1.1-1.8 1.7-2 2.1-4.3 5.1-5.8 9.1v0.3c-1.3 3.4-1.9 7-1.9 11v0.5c-0.2 7.6 1.8 13.2 4.3 17.1 0.5 0.8 1 1.5 1.6 2.2v0.1l0.3 0.3c0.1 0.1 0.1 0.2 0.2 0.2l0.3 0.3 0.2 0.2 0.3 0.3c0 0.1 0.1 0.1 0.1 0.2 0.1 0.2 0.3 0.3 0.4 0.5 4.1 4.2 9.6 7.1 16.5 8.5 4.5 1.1 8.5 1.4 11 1.5H354c3.2 0 6.1 0.2 8.7 0.7 3.4 0.8 7 2.3 9.5 4.7 0.8 0.7 1.4 1.5 1.9 2.4 0.2 0.3 0.3 0.5 0.4 0.8 0 0.1 0.1 0.2 0.1 0.3 0.1 0.2 0.2 0.4 0.3 0.5 0 0.1 0.1 0.2 0.1 0.3 0.1 0.2 0.1 0.3 0.2 0.5 0 0.1 0.1 0.3 0.1 0.4 0.1 0.2 0.1 0.3 0.2 0.5 0 0.1 0.1 0.3 0.1 0.4 0 0.2 0.1 0.3 0.1 0.5 0 0.1 0 0.3 0.1 0.5 0 0.2 0.1 0.4 0.1 0.5v0.5c0 0.2 0 0.4 0.1 0.6V293c-0.1 4.2-1.3 7.5-3.9 9.9-2.5 2.4-6.1 3.8-9.5 4.7-2.6 0.5-5.5 0.7-8.7 0.7h-78.3c-0.7 0-1.5 0.1-2.1 0.3h-12c-4 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3h91.4c1.4 0.1 7 0.1 13.5-1.5 5.8-1.3 10.7-3.5 14.5-6.8 0.6-0.5 1.2-1.1 1.8-1.7 2-2.1 4.3-5.1 5.8-9.1 1.2-3.1 1.9-6.9 1.9-11.3v-0.7-0.5-0.2-0.1c0-7.1-1.9-12.4-4.3-16.2z"
                                                        fill="#FFFFFF" p-id="3457"></path>
                                                    <path
                                                        d="M716 509.4H369.6c-5.4 0-9.8 4.4-9.8 9.8v312.5c0 6.2 5.1 11.3 11.3 11.3h341.6c7.9 0 14.4-6.4 14.4-14.4v-308c0-6.2-5-11.2-11.1-11.2z m-11.2 22.3v83h-89.6v-83h89.6zM592.9 819.2h-99v-81.6h99v81.6zM494 715.3V637h99v78.4h-99z m-22.3 0h-88.9V637h88.9v78.3zM494 533.1h99v81.6h-99v-81.6zM615.2 637h88.9v78.4h-88.9V637zM382.1 531.7h89.6v83h-89.6v-83z m0 288.9v-83h89.6v83h-89.6z m322.7 0h-89.6v-83h89.6v83z"
                                                        fill="#4BC929" p-id="3458"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <!-- 拖拽条 -->
                    <div class="drag-handle-top" @mousedown="startResizeFooter"></div>

                    <div class="menu">
                        <Emoji class="emoji_ele" :data="emojiIndex" :emoji="selectedEmoji" :size="25"
                            @click="toggleSelectable" />
                        <el-icon class="folder" @click="handleClick">
                            <Folder />
                        </el-icon>
                        <el-upload ref="uploadRef" class="hidden-upload" :http-request="uploadFile"
                            :show-file-list="false" :before-upload="beforeUploadFile">
                        </el-upload>
                    </div>
                    <div v-if="show_emoji_toast" class="emoji_main" ref="emojiPopup"
                        v-click-outside="() => show_emoji_toast = false">
                        <Picker :data="emojiIndex" set="apple" @select="showEmoji" />
                    </div>

                    <div class="input_chat_main">
                        <textarea v-model="input_chat_content"></textarea>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>



<script>
import { ipcRenderer } from 'electron'
import { Search } from '@element-plus/icons-vue'
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";

// Import data/twitter.json to reduce size, all.json contains data for
// all emoji sets.
import data from "emoji-mart-vue-fast/data/all.json";
// Import default CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";
// Vue 3, import components from `/src`:
import { Picker, Emoji, EmojiIndex } from "emoji-mart-vue-fast/src";
// Create emoji data index.
// We can change it (for example, filter by category) before passing to the component.
let emojiIndex = new EmojiIndex(data);

export default {
    components: {
        Picker,
        Emoji,
        videoPlay
    },
    directives: {
        clickOutside: {
            mounted(el, binding) {
                el.clickOutsideHandler = (event) => {
                    // 如果点击的是触发按钮（emoji_ele）或者点击在弹窗内部，就不关闭
                    if (el.contains(event.target) || event.target.closest(".emoji_ele")) {
                        return;
                    }
                    binding.value(event); // 关闭弹窗
                };
                document.addEventListener("click", el.clickOutsideHandler);
            },
            unmounted(el) {
                document.removeEventListener("click", el.clickOutsideHandler);
            }
        }
    },
    emits: ["updateNewMsgData"],
    mounted() {
        this.$emit("updateNewMsgData", { "new_msg_num": "99+" });
        this.$nextTick(() => {
            setTimeout(() => {
                this.scrollToBottom();
            }, 50); // 延迟 50ms
        });
    }, // 声明要发出的事件
    computed: {
        Search() {
            return Search
        },
    },
    watch: {
        chat_Messages() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.scrollToBottom();
                }, 50); // 延迟 50ms
            });
        }
    },
    data() {
        return {
            asideWidth: 250, // 默认宽度
            isResizing: false,

            mainHeight: 500,
            isResizingFooter: false,
            startY: 0,
            startMainHeight: 0,

            images: [
                "https://cms-static.pengwin.com/data/crm/default/08/84/e5/0884e5bc3600bfd9a06d267ae282adea.jpg",
            ],
            selectedEmoji: emojiIndex.findEmoji(':smile:'),
            selectableVisible: true,
            show_emoji_toast: false,
            emojiIndex: emojiIndex,
            emojisOutput: "",
            search_content: '',
            input_chat_content: "",
            url: "https://cms-static.pengwin.com/data/crm/default/cf/b8/d0/cfb8d09d4f09ec93f205b315616d77b8.jpeg",
            chat_Messages: [
                {
                    id: 4,
                    nickname: "婷婷",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                    sender: 'other',
                    content: '',
                    time: new Date(Date.now() - 45 * 60 * 1000),
                    image_url: "https://cms-static.pengwin.com/data/images/20240117/4948751705487415326981.png",
                    msg_type: 4
                },
                {
                    id: 4,
                    nickname: "银尘",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                    sender: 'self',
                    content: '',
                    time: new Date(Date.now() - 45 * 60 * 1000),
                    image_url: "https://cms-static.pengwin.com/data/images/20240117/4948751705487415326981.png",
                    msg_type: 4
                },
                {
                    id: 1,
                    nickname: "婷婷",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                    sender: 'other',
                    content: '大家好，今天天气不错啊',
                    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    msg_type: 1
                },
                {
                    id: 2,
                    nickname: "银尘",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/cf/b8/d0/cfb8d09d4f09ec93f205b315616d77b8.jpeg',
                    sender: 'self',
                    content: '是啊，适合出去走走',
                    time: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
                    msg_type: 1
                },
                {
                    id: 5,
                    nickname: "婷婷",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                    sender: 'other',
                    content: '听起来不错，我可以一起去吗？',
                    time: new Date(Date.now() - 30 * 60 * 1000),
                    msg_type: 1
                },
                {
                    id: 5,
                    nickname: "婷婷",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                    sender: 'other',
                    content: '',
                    vieo_url: 'https://cms-static.pengwin.com/data/video/20220321/2220321647849740898836.mp4',
                    time: new Date(Date.now() - 30 * 60 * 1000),
                    msg_type: 3//视频
                },
                {
                    id: 5,
                    nickname: "银尘",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                    sender: 'self',
                    content: '',
                    vieo_url: 'https://cms-static.pengwin.com/data/video/20220321/2220321647849740898836.mp4',
                    time: new Date(Date.now() - 30 * 60 * 1000),
                    msg_type: 3//视频
                },
                {
                    id: 3,
                    nickname: "婷婷",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                    sender: 'other',
                    content: '你有什么计划吗？',
                    time: new Date(Date.now() - 60 * 60 * 1000),
                    msg_type: 1
                },
                {
                    id: 4,
                    nickname: "银尘",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/cf/b8/d0/cfb8d09d4f09ec93f205b315616d77b8.jpeg',
                    sender: 'self',
                    content: '还没想好，可能去公园吧',
                    time: new Date(Date.now() - 45 * 60 * 1000),
                    msg_type: 1
                },
                {
                    id: 4,
                    nickname: "银尘",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/cf/b8/d0/cfb8d09d4f09ec93f205b315616d77b8.jpeg',
                    sender: 'self',
                    content: '',
                    time: new Date(Date.now() - 45 * 60 * 1000),
                    image_url: "https://cms-static.pengwin.com/data/images/20240117/4948751705487415326981.png",
                    msg_type: 2
                },
                {
                    id: 4,
                    nickname: "银尘",
                    avatar: 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                    sender: 'other',
                    content: '',
                    time: new Date(Date.now() - 45 * 60 * 1000),
                    image_url: "https://cms-static.pengwin.com/data/images/20240117/4948751705487415326981.png",
                    msg_type: 2
                }
            ],
            options: {
                // width: "200px", //播放器宽度
                // height: "120px", //播放器高度
                color: "#409eff", //主题色
                title: "", //视频名称
                // src: "https://cms-static.pengwin.com/data/video/20220321/2220321647849740898836.mp4", //视频源
                muted: false, //静音
                webFullScreen: false,
                speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
                autoPlay: false, //自动播放
                loop: true, //循环播放
                mirror: false, //镜像画面
                ligthOff: true, //关灯模式
                volume: 0.3, //默认音量大小
                control: true, //是否显示控制
                controlBtns: [
                    // "audioTrack",
                    // "quality",
                    // "speedRate",
                    "volume",
                    // "setting",
                    // "pip",
                    "pageFullScreen",
                    // "fullScreen",
                ], //显示所有按钮,
            }
        }
    },

    methods: {
        handleClick() {
            // 手动触发隐藏的 input
            this.$refs.uploadRef.$el.querySelector("input").click();
        },
        beforeUploadFile(file) {
            // 获取文件扩展名（小写）
            const ext = file.name.split('.').pop().toLowerCase();

            // 定义三类
            let category = 'other'; // 默认“其他文件”

            // 判断类别
            if (file.type.startsWith('image/') || ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(ext)) {
                category = 'image';
            } else if (file.type.startsWith('video/') || file.type.startsWith('audio/') || ['mp4', 'mov', 'avi', 'mkv', 'mp3', 'wav'].includes(ext)) {
                category = 'video';
            }

            console.log('文件名:', file.name);
            console.log('扩展名:', ext);
            console.log('文件类型分类:', category);

            // 返回 true 表示允许上传
            return true;
        },
        async uploadFile(options) {
            const { file } = options;
            const formData = new FormData();
            formData.append("file", file);

            // await axios.post("/api/upload", formData, {
            //     onUploadProgress: (e) => {
            //     this.progress = Math.round((e.loaded * 100) / e.total);
            //     },
            // });
        },
        //遍历文件数据时需要调用该方法判断本地文件是否存在
        async handleFileClick() {
            // 调用主进程方法
            ipcRenderer.send('is_exist_spec_file', { "file_name": "1.txt" });
            // 监听主进程的回复                              
            ipcRenderer.on('is_exist_spec_file_response', (event, result) => {
                console.log(result); // 处理主进程返回的结果
            });

        },
        formatMessageTime(time) {
            const messageTime = new Date(time);
            return messageTime.toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        //输入框赋值添加选择的表情
        showEmoji(emoji) {
            //发丝空格
            this.input_chat_content += emoji.native + '\u200A';
        },
        selectableSelectEmoji(emoji) {
            this.selectedEmoji = emoji
        },
        //表情区域显示
        toggleSelectable() {
            this.show_emoji_toast = !this.show_emoji_toast
        },
        show() {
            this.$viewerApi({
                images: this.images
            })
        },
        startResize(e) {
            this.isResizing = true;
            this.startX = e.clientX;
            this.startWidth = this.asideWidth;
            document.addEventListener("mousemove", this.resizeAside);
            document.addEventListener("mouseup", this.stopResize);
        },
        resizeAside(e) {
            if (this.isResizing) {
                const diff = e.clientX - this.startX;
                let newWidth = this.startWidth + diff;
                // 限制最小宽度和最大宽度
                newWidth = Math.max(150, Math.min(newWidth, 600));
                this.asideWidth = newWidth;
            }
        },

        stopResize() {
            this.isResizing = false;
            document.removeEventListener("mousemove", this.resizeAside);
            document.removeEventListener("mouseup", this.stopResize);
        },
        startResizeFooter(e) {
            this.isResizingFooter = true;
            this.startY = e.clientY;
            this.startMainHeight = this.mainHeight;

            document.addEventListener("mousemove", this.resizeFooter);
            document.addEventListener("mouseup", this.stopResizeFooter);
        },
        resizeFooter(e) {
            if (this.isResizingFooter) {
                const diff = e.clientY - this.startY; // 鼠标向下为正，向上为负
                let newHeight = this.startMainHeight + diff;
                newHeight = Math.max(200, Math.min(newHeight, window.innerHeight - 100));
                this.mainHeight = newHeight;
            }
        },
        stopResizeFooter() {
            this.isResizingFooter = false;
            document.removeEventListener("mousemove", this.resizeFooter);
            document.removeEventListener("mouseup", this.stopResizeFooter);
        },
        scrollToBottom() {
            const container = this.$refs.messagesWrapper;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.el-aside {
    // border: 1px solid gray;
    background-color: #F7F7F7;
    height: calc(100vh - 30px);
    padding-left: 10px;
    border-right: 1px solid #D5D5D5;
    min-width: calc(25vh);
    max-width: calc(50vh);

    .input-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        align-items: center;
        // border-bottom: 1px solid #ded5d5;
        height: 40px;
        margin-top: 5px;

        .el-input {
            width: 90%;
        }

        .el-icon {
            margin: 0px 5px 0px 5px;
            font-size: 15px;
            cursor: pointer;
            height: 25px;
            width: 25px;
            line-height: 10px;
            border-radius: 3px;
            background-color: white;
        }
    }


}

.aside-resizable {
    position: relative;
}

.drag-handle {
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 100%;
    cursor: col-resize;
    background: transparent;
}

.drag-handle:hover {
    background: #dcdcdc;
}


.drag-handle-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    cursor: row-resize;
    background: transparent;
    z-index: 10;
}

.drag-handle-top:hover {
    background: #dcdcdc;
}


.el-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    border-bottom: 1px solid #eee;
    background-color: #EDEDED;
}

.messages-wrapper {
    height: 100%;
    overflow-y: auto;
    .message-item{
        margin: 20px 0px 20px 0px;
    }

    &::-webkit-scrollbar {
        width: 8px;
        /* 垂直滚动条宽度 */
    }

    &::-webkit-scrollbar-track {
        background: #EDEDED;
        /* 和背景一致 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        /* 滑块颜色 */
        border-radius: 4px;
        border: 2px solid #EDEDED;
        /* 与轨道融合 */
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #aaa;
        /* 悬停颜色 */
    }
}

.el-main {
    background-color: #EDEDED;
    max-height: calc(72vh);

    .message-content-other {
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
        word-wrap: break-word; // 文本自动换行
    }

    .message-content-self {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 5px;
        word-wrap: break-word; // 文本自动换行
    }

    .video_content {
        margin: 0px 5px 0px 5px;
        max-width: 160px;
        .d-player-wrap {
            border-radius: 8px;
        }
    }

    .image_content {
        flex-wrap: wrap; // 多张图片换行
        margin: 0px 5px 0px 5px;
        gap: 5px;

        img {
            max-height: 280px; // 最大高度
            width: auto; // 保持比例
            height: auto; // 保持比例
            border-radius: 8px;
            object-fit: cover;
        }
    }

    .file_content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        width: 240px;
        padding: 5px 0px 5px 15px;
        margin: 0px 5px 0px 5px;
        border-radius: 9px;

        .file_info_area {
            .file_name {
                /* 自动换行相关 */
                word-wrap: break-word;
                /* 长单词自动换行 */
                word-break: break-all;
                /* 强制长串字符换行 */
                white-space: pre-wrap;
                /* 保留空格 + 自动换行 */
            }

            .file_size {
                color: #9E9E9E;
            }
        }
    }

    .text_content {
        padding: 10px;
        margin: 0px 5px 0px 5px;
        background-color: white;
        border-radius: 5px;
    }
}

.el-footer {
    position: relative; // 关键
    display: flex;
    flex-direction: column;
    border-top: 1px solid #D5D5D5;

    padding: 0px;
    flex: 1;
    background-color: #EDEDED;

    .menu {
        display: flex;
        flex-direction: row;
        align-items: center;

        .emoji_ele {
            margin-left: 10px;
            margin-right: 10px;
            cursor: pointer;
        }

        .folder {
            font-size: 22px;
            cursor: pointer;
        }
    }

    .emoji_main {
        display: flex;
        position: absolute;
        left: 20px;
        top: -420px;
        z-index: 9999;
    }

    .input_chat_main {
        margin-left: 10px;
        display: flex;
        flex: 1;

        textarea {
            display: flex;
            flex: 1;
            border: none;
            outline: none;
            resize: none;
            /* 禁止拖拽调整大小 */
            background: transparent;
            box-shadow: none;
            padding: 0;
            margin: 0;
            letter-spacing: 1px;
        }

        textarea:focus {
            border: none;
            caret-color: #2FC160;
            box-shadow: none;
        }
    }
}

.conversation_list {
    height: 50px;
    display: flex;
    flex-direction: row;
    padding-top: 10px;

    .new_msg {
        background-color: rgb(235, 5, 5);
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
        position: relative;
        left: -12px;
        top: -5px;
    }

    .conversation_info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-right: 5px;
        flex: 1;

        .conversation_info_top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }
}
</style>