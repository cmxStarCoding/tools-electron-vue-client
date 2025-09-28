<!-- eslint-disable vue/multi-word-component-names -->

<!-- <button @click="this.$router.push({path:'/system_update'})">测试</button> -->
<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="280px">
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

            </el-aside>
            <el-container>
                <el-header height="40px">婷婷</el-header>
                <el-main height="800px">
                    <div v-if="chat_Messages">
                        <div v-for="message in chat_Messages" :key="message.id" class="message-item"
                            :class="message.sender === 'self' ? 'self' : 'other'">
                            <div class="message-content" v-if="message.sender === 'other'">
                                <div class="message-avatar">
                                    <el-avatar :size="32" shape="square" :src="message.sender === 'self' ? url : message.avatar" />
                                </div>
                                <div class="message-info">
                                    <div class="message-bubble-other" v-if="message.msg_type == 1">
                                        {{ message.content }}
                                    </div>
                                    <div class="video_content" v-if="message.msg_type == 3" >
                                        <videoPlay v-if="message.msg_type == 3" v-bind="options" 
                                        src="https://cms-static.pengwin.com/data/video/20220321/2220321647849740898836.mp4" 
                                        
                                        />
                                    </div>
                                    <div class="image_content" v-if="message.msg_type == 2" >
                                        <!-- <VuePictureSwipe :items="items"></VuePictureSwipe> -->
                                    </div>
                                </div>
                    
                            </div>

                            <div class="message-content" v-if="message.sender === 'self'">
                                <div class="message-bubble-self" v-if="message.msg_type == 1">{{ message.content }}</div>
                                <!-- <div class="image_content" v-if="message.msg_type == 2" > -->
                                             <div class="image_content" v-viewer v-if="message.msg_type == 2">
                                                <img v-for="src in images" :key="src" :src="src">
                                            </div>
                                <!-- </div> -->
                                <div class="message-info">
                                    <div class="message-avatar">
                                        <el-avatar :size="32" shape="square"
                                            :src="message.sender === 'self' ? url : message.avatar" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                    <!-- directive -->
           
                    <!-- component -->
                    <!-- <viewer :images="images">
                        <img v-for="src in images" :key="src" :src="src">
                    </viewer> -->
                    <!-- api -->
                    <!-- <button type="button" @click="show">Click to show</button> -->
                </div>
                </el-main>
                <el-footer>
                    <div class="menu">
                        <Emoji class="emoji_ele" :data="emojiIndex" :emoji="selectedEmoji" :size="25"
                            @click="toggleSelectable" />
                        <el-icon class="folder">
                            <Folder />
                        </el-icon>
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
        this.$emit("updateNewMsgData", {"new_msg_num":"99+"})
    }, // 声明要发出的事件
    computed: {
        Search() {
            return Search
        },
    },
    data() {
        return {
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
                    image_url:"https://cms-static.pengwin.com/data/images/20240117/4948751705487415326981.png",
                    msg_type: 2
                },
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
        formatMessageTime(time) {
            const messageTime = new Date(time);
            return messageTime.toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit'
            });
        },
        showEmoji(emoji) {
            //发丝空格
            this.input_chat_content += emoji.native + '\u200A';
        },
        selectableSelectEmoji(emoji) {
            this.selectedEmoji = emoji
        },

        toggleSelectable() {
            this.show_emoji_toast = !this.show_emoji_toast
        },
        show() {
            this.$viewerApi({
                images: this.images
            })
      }
    }
}
</script>

<style lang="scss" scoped>
.row>* {
    margin: auto;
}

.el-aside {
    // border: 1px solid gray;
    // background-color: aqua;
    height: calc(100vh - 30px);
    padding-left: 10px;
    border-right: 1px solid #eae4e4;

    .input-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        // border-bottom: 1px solid #ded5d5;
        height: 40px;

        .el-icon {
            margin-right: 5px;
            cursor: pointer;
            height: 22px;
            width: 22px;
            line-height: 10px;
            border-radius: 3px;
            background-color: white;
        }
    }

}


.el-header {
    // border: 1px solid gray;
    display: flex;
    flex-direction: raw;
    align-items: center;
    font-size: 16px;
    border-bottom: 1px solid #eee;
    // background-color: aqua;
}

.el-main {
    background-color: rgb(250, 248, 248);
    border-bottom: 1px solid #eee;
    max-height: calc(72vh );
    .message-content {
        display: flex;
        flex-direction: row;
        margin-bottom: 5px;
        max-width: 70%; // 不让消息撑满整个聊天区域
        word-wrap: break-word; // 文本自动换行
        .video_content{
            margin-left: 5px;
            max-width: 160px;
            .d-player-wrap{
                border-radius: 8px;
            }
        }
        .image_content{
            flex-wrap: wrap; // 多张图片换行
            gap: 5px;
            img {
                max-height: 280px; // 最大高度
                width: auto;       // 保持比例
                height: auto;      // 保持比例
                border-radius: 8px;
                object-fit: cover;
            }
        }

        .message-info{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }
        .message-bubble-other {
            padding: 10px;
            margin-left: 5px;
            background-color: white;
            border-radius: 5px;
        }
        .message-bubble-self {
            padding: 10px;
            margin-right: 5px;
            background-color: #95ec69;
            border-radius: 5px;
        }
    }

    /* 聊天消息样式 */
    .message-item {
        display: flex;
        margin-bottom: 20px;
    }

    .message-item.self {
        justify-content: flex-end;
    }
}

.el-footer {
    display: flex;
    flex-direction: column;
    padding: 0px;
    flex: 1;
    background-color: #FAF8F8;

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
        left: 400px;
        top: 300px;
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

.demo-input-with-icon {
    width: 100%;
}

.input-group {
    margin-bottom: 1.5rem;
}

.label {
    display: block;
    margin-bottom: 1rem;
    color: var(--el-text-color-regular);
}

// .input-container {
//     display: flex;
//     gap: 1rem;
//     flex-wrap: wrap;
// }

.responsive-input {
    width: 240px;
}

@media (max-width: 768px) {
    .input-container {
        flex-direction: column;
        gap: 1rem;
    }

    .responsive-input {
        width: 100%;
    }
}
</style>