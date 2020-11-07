import React from 'react';
import '../../assets/css/index.css';

class TopBanner extends React.Component{
    constructor(props){
        super(props);

        this.state = { }
    }


    render(){
        return(
            <div className="top-banner">
                号码管理系统
            </div>

        )
    }
}

export default TopBanner;