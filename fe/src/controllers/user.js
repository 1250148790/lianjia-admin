import userView from '../views/user.art';

let _url = '' ;
let _type = '';

export default{
    async renderUser(){

        let result =  await this.isSignin();
        // console.log(result.res);

        let html = userView({
            // isSignin:true,
            isSignin:result.res,
            username:result.data.username,
        });
        $('.nav-user').html(html);
        this.clickFromBtn();
    },

    // 第一次进入页面
    isSignin(){
        return $.ajax({
            url:'/api/users/issign',
            headers:{
                // 请求登录时，发个请求头，把token携带到后端
                'x-access-token':localStorage.getItem('x-access-token'),
            },
            success(result){
                return result;
            }
        })
    },

    // 获取表单信息
    clickFromBtn(){
        $('.logn').on('click',function(){
            $('.checkbox').css('display','none');
            let res = $(this).attr('id');
            _type = res;
            if(res === 'btn-signin'){
                // 登录
                // console.log('登录');
                $('.module-head .title-h3').html('Sign In');
                $('.module-foot #btn-sumbit').html('登录');
                $('.checkbox').css('display','block');
                _url = '/api/users/signin';
            }else if(res === 'btn-signup'){
                // 注册
                // console.log('注册');
                $('.module-head .title-h3').html('Sign Up');
                $('.module-foot #btn-sumbit').html('注册');
                _url = '/api/users/signup';
            }
            $('#btn-form input').val('');
        })
        $('#btn-sumbit').on('click',()=>{
            let data = $('#btn-form').serialize();
            $.ajax({
                url:_url,
                data,
                type:'POST',
                success:this.clickSuccBtn.bind(this)
            })
        })
        $('.nav-user').on('click','.btn-signout',()=>{
            // alert('用户退出成功 - ');
            layer.msg('用户退出成功 - ',{
                icon:1,
                time:3000,
                offset: '120px' 
            })
            // 删除 x-access-token 用户退出
            localStorage.removeItem('x-access-token');
            location.reload();

            // $.ajax({
            //     url:'/api/users/issignout',
            //     success(result){
            //         alert(result.data.msg);
            //         // 删除 x-access-token 用户退出
            //         localStorage.removeItem('x-access-token');
            //         location.reload();
            //     }
            // })
        })
    },

    clickSuccBtn(result,text,jqXHR){
        if(_type === 'btn-signin'){
            // 登录状态
            if(result.res){
                // 登录成功
                let html = userView({
                    isSignin:true,
                    username:result.data.username
                });
                $('.nav-user').html(html);
                $('.nav-user').removeClass('open');

                // 当用户登录成功时 ， 获取请求头 x-access-token ， 并放在localstorage
                // console.log(jqXHR.getResponseHeader('x-access-token'))
                let token = jqXHR.getResponseHeader('x-access-token');
                localStorage.setItem('x-access-token',token);

                // console.log(token)

                // alert(result.data.msg);
                layer.msg(result.data.msg,{
                    icon:1,
                    time:3000,
                    offset: '120px' 
                })
            }else{
                // 登录失败
                // alert(result.data.msg);
                layer.msg(result.data.msg,{
                    icon:2,
                    time:3000,
                    offset: '120px' 
                })
            }
        }else if(_type === 'btn-signup'){
            // 注册状态
            if(result.res){
                // 注册成功
                $('.nav-user').removeClass('open');
                // alert(result.data.msg);
                layer.msg(result.data.msg,{
                    icon:6,
                    time:3000,
                    offset: '120px' 
                })
            }else{
                // 注册失败
                // alert(result.data.msg);
                layer.msg(result.data.msg,{
                    icon:0,
                    time:3000,
                    offset: '120px' 
                })
            }
        }else {
        }
    }
}