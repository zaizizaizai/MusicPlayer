import React from 'react';
import Progress from '../components/progress';
import { Link } from 'react-router';
let PubSub = require('pubsub-js');
require('./player.less');

//音频总时长
let duration = null;

let Player = React.createClass({
	componentDidMount() {
		// 监听音乐播放时间
		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
			//音频总时长
			duration = e.jPlayer.status.duration;
			//回调函数，将音乐播放时间传回progress
			this.setState({
				progress: e.jPlayer.status.currentPercentAbsolute,
				volume: e.jPlayer.options.volume * 100,
				leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
			});
		});
	},
	//解绑
	componentWillUnmount() {
		$("#player").unbind($.jPlayer.event.timeupdate);
	},
	formatTime(time) {
		time = Math.floor(time);
		let miniute = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);

		return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
	},
	changeProgressHandler(progress) {
		 //调用jPlayer的方法,更改播放时间
		$("#player").jPlayer("play", duration * progress);
		this.setState({
			isPlay: true
		});
	},
	//音量调节
	changeVolumeHandler(progress) {
		$("#player").jPlayer("volume", progress);
	},
	//播放和暂停
	play() {
		if (this.state.isPlay) {
			$("#player").jPlayer("pause");
		} else {
			$("#player").jPlayer("play");
		}
		this.setState({
			isPlay: !this.state.isPlay
		});
	},
	next() {
		PubSub.publish('PLAY_NEXT');
	},
	prev() {
		PubSub.publish('PLAY_PREV');
	},
	changeRepeat() {
		PubSub.publish('CHANAGE_REPEAT');
	},
	getInitialState() {
		return {
			progress: 0,
			volume: 0,
			isPlay: true,
			leftTime: ''
		}
	},	
    render() {
        return (
			//这里只返回一个元素
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title"><Link to="/details">{this.props.currentMusitItem.title}</Link></h2>
                		<h3 className="music-artist mt10">{this.props.currentMusitItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-{this.state.leftTime}</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
								{/* 音量控制部分 */}
                				<div className="volume-wrapper">
					                <Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHandler}
										barColor='#aaa'
					                >
					                </Progress>
                				</div>
                			</div>
                		</div>
						{/* 进度控制 */}
                		<div style={{height: 10, lineHeight: '10px'}}>
			                <Progress
								progress={this.state.progress}
								onProgressChange={this.changeProgressHandler}
			                >
			                </Progress>
                		</div>
						{/* 播放控制 */}
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev" onClick={this.prev}></i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
	                			<i className="icon next ml20" onClick={this.next}></i>
                			</div>
                			<div className="-col-auto">
                				<i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
                			</div>
                		</div>
                	</div>
                	<div className="-col-auto cover">
                		<img src={this.props.currentMusitItem.cover} alt={this.props.currentMusitItem.title}/>
                	</div>
                </div>
            </div>
        );
    }
});

export default Player;
