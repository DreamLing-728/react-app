import React from 'react';
import '../../assets/css/index.css';

class NavTitle extends React.Component{
    constructor(props){
        super(props);

        this.state = { }
    }


    render(){
        return(
            <div className="nav-title">
                {/*接收父组件参数*/}
                <h4>{this.props.title}</h4>
            </div>
        )
    }
}

export default NavTitle;