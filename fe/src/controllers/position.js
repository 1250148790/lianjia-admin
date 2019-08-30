import positionView from '../views/position.art';
import positionAddView from '../views/position-add.art';
import positionEditView from '../views/position-edit.art';

function changeData(pageCount,res){
    let start = pageNo * pageCount; //开始的数据 
    $.ajax({
        url:'/api/position/list',
        // get 请求 start count 传递给后端
        headers:{
            // 请求登录时，发个请求头，把token携带到后端
            'x-access-token':localStorage.getItem('x-access-token'),
        }, 
        data:{
            start,
            count:pageCount,
        },
        success(result){
            if(result.res){
                res.render(positionView({
                    ...result.data,
                    pageNo ,                //当前页码 =  start / 每页数量
                    pageTotal : new Array(Math.ceil(result.data.total / pageCount)),     // 总页码 = 总数 / 每页数量
                    indexTotal : new Array(result.data.total),
                }))
            }else{
                // alert('result.data.msg');
                layer.msg(result.data.msg,{
                    icon:2,
                    time:3000,
                    offset: '120px' 
                })
                res.go('/home');
            }
        }
    })
}

// 请求ajax数据
function loadData(pageNo,res){

    let pageCount = 3;

    let start = pageNo * pageCount; //开始的数据 
    $.ajax({
        url:'/api/position/list',
        // get 请求 start count 传递给后端
        headers:{
            // 请求登录时，发个请求头，把token携带到后端
            'x-access-token':localStorage.getItem('x-access-token'),
        },  
        data:{
            start,
            count:pageCount,
        },
        success(result){
            // console.log(result.data);
            if(result.res){
                // res.render(positionView({
                //     list:result.data.list,
                //     total:result.data.total,
                // }));
                // console.log(Math.ceil(result.data.total / pageCount))
                // console.log(new Array(result.data.total))
                res.render(positionView({
                    ...result.data,
                    isShow:true,
                    pageNo ,                //当前页码 =  start / 每页数量
                    pageTotal : new Array(Math.ceil(result.data.total / pageCount)),     // 总页码 = 总数 / 每页数量
                    indexTotal : new Array(result.data.total),
                }))
            }else{
                // alert(result.data.msg);
                layer.msg(result.data.msg,{
                    icon:4,
                    time:2000,
                    offset: '120px' 
                })
                res.go('/home');
            }
        }
    })

    $('#router-view').on('change','#show',function(){
        // console.log($('#show option:selected').val())
        // pageCount = $('#show option:selected').val();
        // changeData(pageCount,res);
    })

}

export default {
    // 渲染房源列表
    renderPos(req,res){

        loadData(0,res)

       // 点击跳转路由 添加数据
       $('#router-view').on('click','.btn-add',()=>{
            res.go('/position-add')
        })

        // 点击跳转路由 修改数据
        $('#router-view').on('click','.btn-edit',function(){
            // console.log($(this).attr('data-id'));
            res.go('/position-edit',{
                id:$(this).attr('data-id')
            })
        })

        // 点击删除 删除数据
        $('#router-view').on('click','.btn-del',function(){
            let id = $(this).attr('data-id');
            // console.log(id);
            $.ajax({
                url:'/api/position/del',
                type:'DELETE',
                headers:{
                    // 请求登录时，发个请求头，把token携带到后端
                    'x-access-token':localStorage.getItem('x-access-token'),
                },
                data:{
                    id
                },
                success(result){
                    if(result.res){
                        // layer.msg('删除成功',{
                        //     icon:1,
                        //     time:2000,
                        //     offset: '120px' 
                        // })
                        res.go('/position?_'+Date.now());
                    }else{
                        layer.msg('删除失败 , 请勿频繁操作',{
                            icon:2,
                            time:2000,
                            offset: '120px' 
                        })
                    }
                }
            })
        })

        // 点击切换页码
        $('#router-view').on('click','.footer a[data-index]',function(){
            // console.log($(this).attr('data-index'));
            loadData($(this).attr('data-index'),res)
        })

        // 点击切换上一页下一页
        $('#router-view').on('click','.prev',function(){
            let index = $('.btn-group a.active').attr('data-index');
            let count = ~~index-1;
            if(count > -1 ){
                loadData(count,res);
                // console.log('prev',count);
            }
        })
        $('#router-view').on('click','.next',function(){
            let index = $('.btn-group a.active').attr('data-index');
            let count = ~~index+1;
            if(count < $(this).attr('data-pagetotal')){
                loadData(count,res);
                console.log(count);
            }
        })

        // 点击搜索框进行搜索
        $('#router-view').on('click','#btn-search',function(){
            let keyword = $('#input-search').val();
            // console.log(keyword)
            if(keyword === ''){
                // alert('请输入正确的小区名称或房源地点 ! ');
                layer.msg('请输入正确的小区名称或房源地点 ! ',{
                    icon:0,
                    time:2000,
                    offset: '120px' 
                })
                return false;
            }else{
                // console.log(keyword);
                $.ajax({
                    url:'/api/position/search',
                    type:'POST',
                    headers:{
                        // 请求登录时，发个请求头，把token携带到后端
                        'x-access-token':localStorage.getItem('x-access-token'),
                    },
                    data:{
                        keyword
                    },
                    success(result){
                        if(result.res){
                            // console.log(result.data);
                            layer.msg('查询成功',{
                                icon:1,
                                time:2000,
                                offset: '120px' 
                            })
                            res.render(positionView({
                                list : result.data
                            }))
                        }else{
                            // alert(result.data.msg);
                            layer.msg(result.data.msg,{
                                icon:0,
                                time:2000,
                                offset: '120px' 
                            })
                        }
                    }
                })
            }
        })

    },
    // 添加房源数据
    renderAdd(req,res){
        res.render(positionAddView())
        // 返回上一页
        $('.btn-back').on('click',()=>{
            res.back()
        })
        // 请求添加数据
        // $('.btn-submit').on('click',()=>{
        //     let data = $('.form-add-data').serialize();
        //     // console.log(data);
        //     $.ajax({
        //         url:'/api/position/add',
        //         type:'POST',
        //         data,
        //         success(result){
        //             // console.log(result);
        //             if(result.res){
        //                 res.go('/position')
        //                 // alert(result.data.msg);
        //             }else{
        //                 alert(result.data.msg);
        //             }
        //         }
        //     })
        // })
        $('.btn-submit').on('click',()=>{
            // console.log(1);
            $('.form-add-data').ajaxSubmit({
                url:'/api/position/add',
                type:'POST',
                headers:{
                    // 请求登录时，发个请求头，把token携带到后端
                    'x-access-token':localStorage.getItem('x-access-token'),
                }, 
                clearForm:true,
                success(result){
                    // console.log(result);
                    if(result.res){
                        layer.msg('添加成功',{
                            icon:1,
                            time:2000,
                            offset: '120px' 
                        })
                        res.go('/position')
                        // alert(result.data.msg);
                    }else{
                        layer.msg('添加失败',{
                            icon:2,
                            time:2000,
                            offset: '120px' 
                        })
                        alert(result.data.msg);
                    }
                }
            })
        })
    },
    // 修改房源列表
    renderEdit(req,res){
        // console.log(req.body.id)
        // 查找ID
        $.ajax({
            url:'/api/position/findone',
            type:'POST',
            headers:{
                // 请求登录时，发个请求头，把token携带到后端
                'x-access-token':localStorage.getItem('x-access-token'),
            },
            data:{
                id:req.body.id,
            },
            success(result){
                if(result.res){
                    // console.log(result.data);
                    res.render(positionEditView(result.data));

                    // 返回上一页
                    $('.btn-back').on('click',()=>{
                        res.back();
                    })

                    // 发送ajax修改数据
                    $('.edit-submit').on('click',()=>{
                        $('.form-edit-data').ajaxSubmit({
                            url:'/api/position/edit',
                            headers:{
                                // 请求登录时，发个请求头，把token携带到后端
                                'x-access-token':localStorage.getItem('x-access-token'),
                            },
                            type:'PATCH',
                            success(result){
                                // console.log(result);
                                if(result.res){
                                    layer.msg('修改成功',{
                                        icon:1,
                                        time:2000,
                                        offset: '120px' 
                                    })
                                    res.go('/position')
                                }
                            }
                        })
                    })
                }
            }
        })
    }
}