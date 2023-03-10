$.ajaxPrefilter(function (options) {
    //在发起真正的 Ajax之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //统一为有权限的接口,设置 headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    //全局统一挂在 complete 回调函数 
    options.complete = function (res) {
        // console.log('执行了complete回调');
        // console.log(res);
        //在complete回调函数中 可以使用res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空 token 
            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.replace('login.html')
        }

    }

})