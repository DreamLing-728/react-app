import React from 'react';
import '../../assets/css/index.less';

class NavTitle extends React.Component{
    constructor(props){
        super(props);

        this.state = { }
    }


    render(){
        return(
            <div className="nav-title">
                {/*接收父组件参数*/}
                <div>{this.props.title}</div>
            </div>
        )
    }
}

export default NavTitle;