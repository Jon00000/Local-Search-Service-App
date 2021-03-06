import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home'
import City from './City'
import User from './User'
import Search from './Search'
import Detail from './Detail'
import Login from './Login'
import { CITYNAME } from '../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../actions/userInfo'
import { bindActionCreators } from 'redux';

class AppRouter extends React.Component {
    constructor() {
        super();
        this.state = {
            initDone: false,
        }
    }
    componentDidMount() {
        // 从localStorage里获取城市
        let cityName = localStorage.getItem(CITYNAME)
        if (cityName == null) { //程序中所有的等于判断都用 ==== ，除了这里这种表达--判断了null和undefined
            cityName = '北京'
        }
        // 将城市信息存储到Redux中（因为各个组件都有用到）
        this.props.userInfoActions.update({
            cityName: '北京'
        })
        this.setState({
            initDone: true,
        })
    }
    render() {
        const route = (
            <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route path='/city' component={City} />
                <Route path='/user' component={User} />
                <Route path='/login/:router?' component={Login} />
                {/* 参数后面加问号，代表可选参数 */}
                <Route path='/search/:category/:keyword?' component={Search} /> 
                <Route path='/detail/:id' component={Detail} />
                {/* 这里有一个问题：怎么完全跳转到404页面 */}
                {/* <Route >
                        <Redirect to='./404.html'></Redirect>
                    </Route> */}
                <Route render={() =>
                    <div>404 : page not found</div>
                }></Route>
            </Switch>
        )

        return (
            <div>
                {
                    this.state.initDone
                        ? route
                        : <div>正在加载...</div>
                }

            </div>
        )
    }
}


//---------------------react redux 绑定 --------------------
function mapStateToProps(state) {
    return{}
}
function mapDispatchToProps(dispatch) {
    return {
        // 自定义的名字，被传递组件用props调用
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}

// 这里要把connect外层包一圈withRouter，否则没有效果
const AppCon = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AppRouter));


// Router下面只能有一个子元素
export default () => (
    <BrowserRouter>
        <AppCon></AppCon>
    </BrowserRouter>
);