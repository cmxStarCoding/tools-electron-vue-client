var baseMixin = {
    data() {
        return {
            alertConfig: {
                show: false,
                title: "默认标题",
                class: "green",
                successIcon: false,
                failIcon: false,
                warnIcon: false
            },
        }
    },
    methods: {
        showAlert(title, icon = "success") {
            this.alertConfig.show = true
            this.alertConfig.title = title

            if (icon == 'success') {
                this.alertConfig.successIcon = true;
                this.alertConfig.class = "success";
            } else if (icon == 'fail') {
                this.alertConfig.failIcon = true;
                this.alertConfig.class = "fail";
            } else if (icon == 'warn') {
                this.alertConfig.warnIcon = true;
                this.alertConfig.class = "warn";
            }

            setTimeout(() => {
                this.alertConfig.show = false
                this.alertConfig.successIcon = false;
                this.alertConfig.failIcon = false;
                this.alertConfig.warnIcon = false;
            }, 1000);
        },
    },
}

export default baseMixin;