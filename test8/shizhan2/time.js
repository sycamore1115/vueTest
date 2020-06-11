Vue.directive('time', {
    bind: function (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value);
        //每间隔一分钟换一次
        el._timeout_ = setinterval(function () {
            el.innerHTML = Time.getFormatTime(binding.value);
        }, 60000);
    },
    unbind: function (el) {
        clearinterval(el._timeout_);
        delete el._timeout_;
    }
});