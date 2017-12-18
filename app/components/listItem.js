import React from 'react';
require('./listitem.less');
let PubSub = require('pubsub-js');

let ListItem = React.createClass({
    /**
     * 事件订阅
     * 该函数发送事件，
     * 订阅者都可收到
     */
	deleteHandler(item, event) {
        //在删除音乐时，将事件禁止掉，否则删除和播放同时执行
		event.stopPropagation();
		PubSub.publish('DEL_MUSIC', item);
	},
	playMusic(item, e) {
		PubSub.publish('PLAY_MUSIC', item);
	},
    render() {
    	let item = this.props.data;
        //模板字符串，row表示栅格
        /**
         * 传参，onClick将点击的歌曲传入（选中，删除）
         * 1、点击操作与函数绑定
         * 2、点击时，将musicItem参数传入函数
         */        
        return (
            <li className={`row components-listitem${this.props.focus ? ' focus' : ''}`} onClick={this.playMusic.bind(this, item)}>
                <p><span className="bold">{item.title}</span>  -  {item.artist}</p>
                <p className="-col-auto delete" onClick={this.deleteHandler.bind(this, item)}></p>
            </li>
        );
    }
});

export default ListItem;
