import React from 'react';
require('./logo.less');
import { Link } from 'react-router';

let Logo = React.createClass({
    render() {
        return (
        	<div className="row components-logo">
                <Link to="/">
                    <img src="/static/images/logo.png" width="40" alt="" className="-col-auto"/>
                </Link>
        		<h1 className="caption">Music Player</h1>
        	</div>
        );
    }
});

export default Logo;
