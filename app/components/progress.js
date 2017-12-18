import React from 'react';
require('./progress.less');

let Progress = React.createClass({
	//默认props状态
	getDefaultProps() {
		return {
			barColor: '#2f9842'
		}
	},
	changeProgress(e) {
		//获取dom节点
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		//判断函数是否存在，然后调用
		this.props.onProgressChange && this.props.onProgressChange(progress);
	},
    render() {
        return (
        	<div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
        		<div className="progress" style={{width: `${this.props.progress}%`, background: this.props.barColor}}></div>
        	</div>
        );
    }
});

export default Progress;
