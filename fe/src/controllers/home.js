import HomeView from '../views/home.art';

export default{
    renderHome(req,res){
        res.render(HomeView({
            req
        }));
    }
}