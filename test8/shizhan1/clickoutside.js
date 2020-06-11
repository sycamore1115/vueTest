Vue.directive('clickoutside', {
    bind: function(el,binding,vnode){
        function documentHandle(e){
            // console.log(el,e.target,binding.expression)
            //el:.side-container里的内容 e.target可能是#inside,#dropdown或整个html,即屏蔽inside和dropdown区域
            if(el.contains(e.target)){
                return false;
            }
            // 当点击其他html区域的时候，binding.expression为handleClose
            if(binding.expression){
                // 如果绑定了函数，则调用这个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        function documentEsc(e){
            if(binding.expression && e.keyCode===27){
                binding.value(e);
            }
        }
        //给当前元素绑定一个私有变量，方便在unbind中可以解除事件监听,documentHandle在方法外访问不到
        el._ClickOutside_= documentHandle;
        document.addEventListener('click',documentHandle)

        el._ClickOutsideEsc_=documentEsc;
        document.addEventListener('keyup',documentEsc)
    },
    //在update 钩子中支持表达式的更新
    update: function(el){
        el.children[0].innerText = '已点击下拉菜单';
    },
    unbind: function(el,binding){
        document.removeEventListener('click',el._ClickOutside_);
        delete el._ClickOutside_;

        document.removeEventListener('keyup',el._ClickOutsideEsc_);
        delete el._ClickOutsideEsc_;
    },
})