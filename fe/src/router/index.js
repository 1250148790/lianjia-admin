// 引入 sme-router Home
import SMErouter            from 'sme-router';
import homeControllers      from '../controllers/home';
import positionControllers  from '../controllers/position';
import userControllers      from '../controllers/user';

const router  = new SMErouter('router-view','hash');

// 渲染用户登录注册页面
userControllers.renderUser();

// 主页
router.route('/home',homeControllers.renderHome);
// 房源列表
router.route('/position',positionControllers.renderPos);
// 添加数据
router.route('/position-add',positionControllers.renderAdd);
// 修改数据
router.route('/position-edit',positionControllers.renderEdit);

// 按钮高亮显示
router.use((req,res,next)=>{
    // console.log(req.url);
    $(`.widget-menu li.che a[href="/#${req.url}"]`)
    .parent()
    .addClass('select')
    .siblings()
    .removeClass('select');
})

// 重定向 默认切换到 / 
router.redirect('/home');

export default router;
