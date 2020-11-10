/* eslint-disable no-unused-vars */
import React from 'react';
import '../../assets/css/index.less';

import imgUrl from '../../assets/img/logo_big.png';
import NavTitle from '../../components/index/NavTitle';
/* eslint-enable no-unused-vars */

class IndexHome extends React.Component{
    constructor(props){
        super(props);

        this.state = { }
    }


    render(){
        return(
            <div className="index-home">
                <div>
                    {/*给子组件传参*/}
                    <h2><NavTitle title="首页"/></h2>
                </div>
                <div className="index-img">
                    <img src={imgUrl} alt="logo"/>
                </div>
            </div>

        )
    }
}

export default IndexHome;