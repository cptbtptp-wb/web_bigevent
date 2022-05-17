$(function () {
    // 第一步：点击“去注册账号”的链接
    $("#link_reg").on("click", function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击“去登录”的链接
    $("#link_login").on("click", function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 第二步：自定义layui
    // 从 layui 中获取 form 对象
    var form = layui.form;
    // 通过 form。verify（）函数自定义校验规则
    form.verify({
        // 自定义了一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 判断形参里拿到的值判断和密码框里的值是否一样
            var pwd = $(".reg-box [name = password]").val();
            if (pwd !== value) {
                return "两次密码不一致！"
            }
        }
    })

    // 第三步：监听注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        // 1.阻止默认的提交行为
        e.preventDefault();
        //   2.发起ajax请求
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }
        $.post('http://www.liulongbin.top:3007/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                layer.msg("注册成功,请登录！");
                // 模拟人的点击行为
                $("#link_login").click()
            })
    })

    // 第四步：监听登录表单的提交事件
    $("#form_login").submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // console.log(11);
        $.ajax({
            method: "POST",
            url: "/api/login",
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("登录失败！")
                }
                layer.msg("登录成功！")
                // 将登录成功得到的 token 字符串保存到 localStorage中
                localStorage.setItem("token", res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})