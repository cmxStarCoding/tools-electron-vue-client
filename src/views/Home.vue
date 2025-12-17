<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="common-layout">
        <el-container>
            <el-aside :style="{ width: asideWidth + 'px' }" class="aside-resizable">
                <div class="input-container">
                    <el-input v-model="search_content" class="responsive-input" placeholder="搜索"
                        :prefix-icon="Search" />
                    <el-icon @click="controlShowAddOptionsDialog"
                        v-click-show-add-outside="() => ShowAddOptionsDialog = false">
                        <Plus />
                    </el-icon>
                    <div class="show-add-options" v-show="ShowAddOptionsDialog">
                        <span @click="controlShowCreateGroupDialog"><svg t="1760279481115" class="icon"
                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10361"
                                width="20" height="20">
                                <path
                                    d="M175.616 833.024l18.944-48.64c13.824-35.328 25.088-74.24 26.112-89.088-71.68-58.88-110.592-135.68-110.592-217.6 0-173.568 178.688-314.368 398.848-314.368s398.848 141.312 398.848 314.368-178.688 314.368-398.848 314.368c-50.688 0-99.84-7.168-145.92-21.504-16.384 2.048-82.944 24.064-137.728 44.544l-49.664 17.92zM508.416 209.92c-194.048 0-351.744 119.808-351.744 267.776 0 69.632 34.816 135.168 98.816 185.344 8.192 6.656 22.528 17.92-0.512 90.624 99.84-34.816 111.616-31.232 118.272-29.184 43.008 13.824 88.064 20.48 135.168 20.48 194.048 0 351.744-119.808 351.744-267.776S702.464 209.92 508.416 209.92z"
                                    p-id="10362" fill="#2c2c2c"></path>
                            </svg> 发起群聊</span>
                        <span><svg t="1760279656980" class="icon" viewBox="0 0 1080 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="12380" width="20" height="20">
                                <path
                                    d="M898.6624 833.4336v21.2992H169.216v-21.2992c0-9.9328 10.3936-26.6752 19.3536-31.0272l248.7296-121.344c66.9696-32.7168 83.7632-111.8208 35.584-168.8576l-15.9232-18.8416c-24.32-28.8256-46.08-88.3712-46.08-126.0544V292.1984c0-4.0448 0.2048-8.0384 0.6144-12.032 0.4096-4.0448 0.9728-8.0384 1.7408-11.9808 0.8192-3.9424 1.792-7.8848 2.9696-11.7248 1.1776-3.84 2.56-7.6288 4.0448-11.3152 1.5872-3.7376 3.2768-7.3728 5.1712-10.9056 1.9456-3.5328 4.0448-7.0144 6.2464-10.3424 2.2528-3.3792 4.6592-6.6048 7.2192-9.728 2.5088-3.072 5.2224-6.0928 8.0896-8.96 2.816-2.816 5.8368-5.5296 8.96-8.0384 6.1952-5.1712 12.9024-9.6256 20.0192-13.4144 7.168-3.7888 14.592-6.912 22.3232-9.2672 3.84-1.1776 7.7312-2.0992 11.6736-2.9184 3.9936-0.768 7.936-1.4336 11.9296-1.792 3.9936-0.4096 8.0384-0.5632 12.0832-0.5632a118.27712 118.27712 0 0 1 24.0128 2.3552c3.9424 0.8192 7.8336 1.7408 11.6736 2.9184 3.8912 1.1776 7.68 2.5088 11.3664 4.096 3.7376 1.536 7.3728 3.2256 10.9056 5.12 3.584 1.9456 7.0144 3.9936 10.3936 6.1952 3.328 2.304 6.5536 4.6592 9.6256 7.2704 3.1744 2.5088 6.144 5.2224 8.96 8.0384 2.8672 2.8672 5.5808 5.888 8.1408 8.96 2.56 3.1232 4.9664 6.3488 7.168 9.728 4.5056 6.7072 8.2944 13.7728 11.4176 21.248 3.072 7.4752 5.376 15.1552 7.0144 23.0912 0.768 3.9424 1.3312 7.8848 1.7408 11.9296 0.4096 3.9936 0.6144 8.0384 0.6144 12.0832v75.1104c0 37.5808-21.8624 97.3312-46.1312 126.0032l-15.8208 18.8928c-48.128 56.9344-31.5392 136.1408 35.584 168.8576l248.6784 121.2928c9.0112 4.4032 19.3536 20.992 19.3536 31.0272z m-782.1824 0v30.0544c0 24.32 19.6096 43.9808 43.9296 43.9808h747.0592c24.2688 0 43.9296-19.6608 43.9296-43.9808v-30.0544c0-30.3616-21.9136-65.1776-48.9472-78.3872l-248.7808-121.2928c-36.2496-17.7152-44.288-56.832-18.3808-87.5008l15.9232-18.8928c32.1536-38.0928 58.5216-109.9264 58.5216-160V292.2496c0-5.7856-0.3072-11.52-0.9216-17.2544-0.512-5.6832-1.3312-11.4176-2.5088-17.0496-1.1264-5.632-2.5088-11.2128-4.1472-16.7424-1.6896-5.4784-3.6864-10.9568-5.888-16.2816-2.1504-5.3248-4.608-10.496-7.3728-15.5136-2.6624-5.12-5.632-10.0352-8.8576-14.848-3.1744-4.8128-6.6048-9.3696-10.2912-13.8752-3.6352-4.4032-7.4752-8.704-11.52-12.7488-4.1472-4.0448-8.3456-7.9872-12.8512-11.6224-4.4032-3.6352-9.0624-7.0656-13.7728-10.24-4.8128-3.1744-9.7792-6.144-14.848-8.8576a170.5984 170.5984 0 0 0-48.5888-17.3568c-5.632-1.1776-11.3152-1.9968-16.9984-2.56-5.7344-0.5632-11.4688-0.8192-17.2544-0.8192-5.7344 0-11.52 0.256-17.2544 0.8192-5.6832 0.6144-11.3664 1.4336-17.0496 2.56-5.632 1.0752-11.2128 2.5088-16.6912 4.1984-5.5296 1.6384-10.9056 3.584-16.2304 5.7856-10.6496 4.4544-20.7872 9.8304-30.3616 16.2816a169.96864 169.96864 0 0 0-26.6752 21.8624c-4.0448 4.0448-7.8848 8.2944-11.5712 12.7488a178.4576 178.4576 0 0 0-19.1488 28.672c-2.7136 5.0176-5.1712 10.24-7.3216 15.5136a171.8272 171.8272 0 0 0-5.888 16.2816 172.6976 172.6976 0 0 0-4.1472 16.6912c-1.1776 5.632-1.9968 11.3664-2.56 17.1008a174.336 174.336 0 0 0-0.8704 17.2032v75.1104c0 50.1248 26.2144 121.7024 58.5216 160.0512l15.872 18.8416c26.0608 30.9248 17.7152 69.8368-18.3808 87.4496l-248.7296 121.3952c-27.0848 13.1584-48.9472 48.2816-48.9472 78.3872z"
                                    fill="#2c2c2c" p-id="12381"></path>
                                <path
                                    d="M948.3264 480.1024V368.64h-58.624v111.4624H778.24v58.624h111.4624V650.24h58.624v-111.5136H1059.84V480.1024h-111.5136z"
                                    fill="#2c2c2c" p-id="12382"></path>
                            </svg>添加朋友</span>
                    </div>
                </div>
                <div class="conversation_list" v-for="conversation in conversations" :key="conversation.id" @click="getChatLog">
                    <el-avatar shape="square" :size="40" fit="cover" :src="conversation.avatar" />
                    <span class="new_msg">{{conversation.toRead}}</span>
                    <div class="conversation_info">
                        <div class="conversation_info_top">
                            <div>
                                <!-- <el-text class="mx-1" size="small">群聊</el-text> -->
                                <span style="font-size: 14px;">{{conversation.name}}</span>
                            </div>
                            <el-text class="mx-1" size="small">{{formatTimestamp(conversation.msg.SendTime)}}</el-text>
                        </div>
                        <div>
                            <el-text size="small" type="info">{{conversation.msg.msgContent}}</el-text>
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
                                                <p class="file_name">1.txt</p>
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
                        <el-upload ref="uploadRef" class="hidden-upload" :on-progress="aa" :http-request="uploadFile"
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
        <el-dialog v-model="showCreateGroupDialog" title="创建群聊" width="700">
            <div class="create_group_area">
                <div class="create_group_left">
                    <el-collapse :expand-icon-position="position" v-model="activeNames">
                        <el-collapse-item title="联系人" name="1">
                            <div class="friend-list">
                                <div v-for="friend in friends" :key="friend.id" class="friend-item"
                                    @click="toggleSelect(friend.id)">
                                    <span class="check-circle"
                                        :class="{ active: selectedFriends.includes(friend.id) }"></span>
                                    <el-avatar shape="square" :size="40" fit="cover" :src="url" />
                                    <span class="friend-name">{{ friend.name }}</span>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="create_group_right">
                    <div v-for="selectedFriend in selectedFriends" :key="selectedFriend.id"
                        class="selected-friend-item">
                        <el-avatar shape="square" :size="40" fit="cover" :src="url" />
                        <span class="friend-name">{{ selectedFriend.name }}</span>
                        <span class="close">x</span>
                    </div>
                </div>
            </div>

        </el-dialog>
    </div>
</template>



<script>
import { nextTick } from 'vue'
import { ipcRenderer } from 'electron'
import { Search } from '@element-plus/icons-vue'
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
// 在组件中使用
import { formatTimestamp } from '@/common/helper';
// import apiService from '../models/axios'
// import router from '../routes';
// import localStorage from '../models/storage'

// Import data/twitter.json to reduce size, all.json contains data for
// all emoji sets.
import data from "emoji-mart-vue-fast/data/all.json";
// Import default CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";
// Vue 3, import components from `/src`:
import { Picker, Emoji, EmojiIndex } from "emoji-mart-vue-fast/src";
import apiService from '../models/axios'
import { generateGroupAvatar } from '@/common/groupAvatar';
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
        },
        clickShowAddOutside: {
            mounted(el, binding) {
                el.clickShowAddOutsideHandler = (event) => {
                    // 如果点击的是触发按钮（show-add-options）或者点击在弹窗内部，就不关闭
                    if (el.contains(event.target) || event.target.closest(".show-add-options")) {
                        return;
                    }
                    binding.value(event);
                };
                document.addEventListener("click", el.clickShowAddOutsideHandler);

            },
            unmounted(el) {
                document.removeEventListener("click", el.clickShowAddOutsideHandler);
            }
        }
    },
    emits: ["updateNewMsgData"],
    created(){
        // apiService.GetImConversation({}).then((response) => {
            
        // }).catch((err) => {
        //         this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
        // }),

        apiService.GetImConversation({}).then((response) => {
            console.log(response.data.conversationList)
            this.conversations = response.data.conversationList
        }).catch(err => {
            this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
        })
    },
    mounted() {
        // let userToken = localStorage.get("user_token")
        // if(!userToken){
        //     router.push({ path: '/user_login' })
        // }
        this.$emit("updateNewMsgData", { "new_msg_num": "99+" });
        this.$nextTick(() => {
            setTimeout(() => {
                this.scrollToBottom();
            }, 50); // 延迟 50ms
        });
        // ✅ 监听来自主进程的 WebSocket 事件
        ipcRenderer.on('ws-event', (_, payload) => {
            const { event, data } = payload
            console.log(`[WS] ${event}:`, data)

            switch (event) {
                case 'open':
                    this.wsStatus = 'connected'
                    break
                case 'message':
                    this.messages.push(data)
                    break
                case 'close':
                    this.wsStatus = 'closed'
                    break
                case 'error':
                    this.wsStatus = 'error'
                    break
                case 'unread-update':
                    this.unreadCount = data.unreadCount
                    break
                case 'reconnecting':
                    this.wsStatus = 'reconnecting'
                    break
            }
        })


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
            conversations:[],
            chatLogs:[],


            wsStatus: 'disconnected',
            messages: [],
            unreadCount: 0,
            oss_sts: {},
            friends: [
                { id: 1, name: '张三' },
                { id: 2, name: '李四' },
                { id: 3, name: '王五' }
            ],
            selectedFriends: [
                { id: 1, name: '张三' },
                { id: 2, name: '李四' },
                { id: 3, name: '王五' }
            ],
            activeNames: ['1'],
            position: "left",
            ShowAddOptionsDialog: false,
            showCreateGroupDialog: false,
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
                    msg_type: 4                 },
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
        getChatLog(){
            apiService.GetChatRecord({}).then((response) => {
                console.log(response.data.conversationList)
                // this.conversations = response.data.conversationList
            }).catch(err => {
                // this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        formatTimestamp(timestamp) {
            return formatTimestamp(timestamp);
        },
        async generateGroupAvatar() {
            const avatars = [
                'https://cms-static.pengwin.com/data/crm/default/d4/e4/dc/d4e4dc60b1ef06ddc57e7c9185e584e1.jpg',
                'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                'https://cms-static.pengwin.com/data/crm/default/ab/3d/ef/ab3def128091358e94bb8d64d2baf226.jpg',
                // 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                // 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                // 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                // 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                // 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
                // 'https://cms-static.pengwin.com/data/crm/default/4c/7b/9f/4c7b9f267bbc2ad3a9364f45d8f7cdb5.jpg',
            ]

            // 1️⃣ 生成 File 对象
            const file = await generateGroupAvatar(avatars, 300)
            console.log('生成的群头像文件:', file)

            // 2️⃣ 调用获取STS接口
            const response = await apiService.OssGetSts({})
            const data = response.data.data

            // 3️⃣ 构造 FormData
            const formData = new FormData()
            formData.append("success_action_status", "200")
            formData.append("policy", data.policy)
            formData.append("x-oss-signature", data.signature)
            formData.append("x-oss-signature-version", "OSS4-HMAC-SHA256")
            formData.append("x-oss-credential", data.x_oss_credential)
            formData.append("x-oss-date", data.x_oss_date)
            formData.append("key", data.dir + file.name)
            formData.append("x-oss-security-token", data.security_token)
            formData.append("file", file) // file 必须最后

            // 4️⃣ 上传到 OSS
            await apiService.OssUploadFileApi(data.host, formData, {
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    console.log('上传进度：', percent + '%')
                },
            })
            this.url = 'http://static.cmxstar.top/' + data.dir + file.name
            console.log('上传成功')
        },
        aa(event, file) {
            // event.percent 是上传百分比
            console.log(`文件: ${file.name} 上传进度: ${event.percent}%`);
        },
        beforeUploadFile(file) {
            this.generateGroupAvatar();
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
            const { file, onProgress } = options;
            const formData = new FormData();
            formData.append("file", file);
            console.log("进入上传文件逻辑")
            console.log(file)
            apiService.OssGetSts({}).then((response) => {
                console.log("获取sts的结果111", response)
                try {
                    const data = response.data.data
                    console.log("获取sts的结果", data)
                    // 2. 构造 FormData
                    const formData = new FormData()
                    formData.append("success_action_status", "200")
                    formData.append("policy", data.policy)
                    formData.append("x-oss-signature", data.signature)
                    formData.append("x-oss-signature-version", "OSS4-HMAC-SHA256")
                    formData.append("x-oss-credential", data.x_oss_credential)
                    formData.append("x-oss-date", data.x_oss_date)
                    formData.append("key", data.dir + file.name)
                    formData.append("x-oss-security-token", data.security_token)
                    formData.append("file", file) // file 必须最后
                    apiService.OssUploadFileApi(data.host, formData, {
                        onUploadProgress: (progressEvent) => {
                            if (onProgress) {
                                // 计算上传百分比
                                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                onProgress({ percent }, file);
                            }
                        }
                    }).then((response) => {
                        console.log(response)
                    }).catch(err => {
                        this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
                    })

                    // if (uploadRes.ok) {
                    //     console.log("上传成功")
                    //     alert("文件已上传")
                    // } else {
                    //     console.log("上传失败", uploadRes)
                    //     alert("上传失败，请稍后再试")
                    // }
                } catch (err) {
                    console.error("发生错误:", err)
                    alert("上传失败")
                }
            }).catch(err => {
                this.showAlert(err?.response?.data?.error ?? "请求异常", 'fail')
            })
        },
        toggleSelect(id) {
            console.log(id)
            const index = this.selectedFriends.indexOf(id)
            if (index > -1) {
                //从index开始移除1个元素
                this.selectedFriends.splice(index, 1)
            } else {
                this.selectedFriends.push(id)
            }
        },
        controlShowAddOptionsDialog() {
            this.ShowAddOptionsDialog = true;
        },
        controlShowCreateGroupDialog() {
            this.showCreateGroupDialog = true;
        },
        handleClick() {
            // 手动触发隐藏的 input
            const input = this.$refs.uploadRef.$el.querySelector("input")
            if (input) {
                input.value = null  // ✅ 清空之前的值
                input.click()
            }
        },

        //遍历文件数据时需要调用该方法判断本地文件是否存在
        async handleFileClick() {
            const result = await ipcRenderer.invoke('is_exist_spec_file', { file_name: "1.txt" });
            console.log(result); // { is_exist: "ok" } 或 { is_exist: "no" }
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
            this.show_emoji_toast = false
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
            this.show_emoji_toast = false
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
        async scrollToBottom() {
            await nextTick() // 等待 DOM 更新完毕
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
    min-width: calc(30vh);
    max-width: calc(50vh);

    .input-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        align-items: center;
        // border-bottom: 1px solid #ded5d5;
        height: 40px;
        margin-top: 5px;
        position: relative;
        /* ✅ 关键：为绝对定位的子元素提供参照 */

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

        .show-add-options {
            position: absolute;
            top: 45px;
            /* ✅ 控制浮层距离图标的高度 */
            right: 5px;
            /* ✅ 与图标右对齐 */
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            padding: 5px 0;
            z-index: 1000;

            span {
                display: flex;
                align-items: center;
                padding: 8px 15px;
                margin: 3px 3px;
                cursor: pointer;
                white-space: nowrap;
                border-radius: 5px;

                &:hover {
                    background-color: #2FC161;
                    color: white;
                }

                .icon {
                    margin-right: 6px;
                }
            }
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

    .message-item {
        margin: 15px 15px 15px 0px;
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
        // padding-right: 10px;
        flex: 1;

        .conversation_info_top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .el-text{
                margin-right: 10px;
            }
        }
    }
}

::v-deep(.el-dialog) {
    border-radius: 10px !important;
}

.create_group_area {
    display: flex;

    .create_group_left {
        width: 45%;
        border-right: 1px solid #EDEDED;

        .el-collapse {
            border: none;

            /* 穿透 Element Plus 内部组件 */
            ::v-deep(.el-collapse-item__header) {
                border-bottom: none !important;
            }

            ::v-deep(.el-collapse-item__wrap) {
                border-bottom: none !important;
            }

        }
    }

    .create_group_right {
        padding-left: 20px;
        display: flex;
        flex: 1;
        flex-direction: column;

        .selected-friend-item {
            display: flex;
            align-items: center;
            position: relative;

            .el-avatar {
                margin-right: 10px;
            }

            .close {

                display: flex;
                align-items: center;
                justify-content: center;
                width: 10px;
                height: 10px;
                line-height: 17px;
                right: 10px;
                border-radius: 50%;
                font-size: 10px;
                color: white;
                background-color: #B2B2B2;

                position: absolute;
                right: 10px;
            }
        }
    }
}

.friend-list {
    .friend-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 6px 0;

        .check-circle {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            transition: all 0.2s ease;

            &.active {
                background-color: #06AD56;
                /* 绿色背景 */
                border-color: #06AD56;

                &::after {
                    content: "";
                    width: 5px;
                    height: 8px;
                    border-right: 1px solid white;
                    border-bottom: 1px solid white;
                    transform: rotate(45deg);
                    position: relative;
                    top: -1.5px;
                }
            }
        }

        .friend-name {
            font-size: 14px;
            color: #333;
        }
    }
}
</style>