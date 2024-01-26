<template>
    <div v-show="visible" class="popover" v-html="content">
    </div>
  </template>
  
  <script>
  export default {
    props: {
      content: String,
    },
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      showPopover() {
        this.visible = true;
      },
      hidePopover() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .popover {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  </style>
  