import React from 'react';
import '@css/index.less';

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