$(function() {
	//初始化滚动条，这个方法定义在scroll.js中
	resetui();
	//为发送按钮绑定点击事件
	$('#btnSend').on('click',function() {
		//判断用户是否输入内容
		var txt=$('#ipt').val().trim();
		//输入内容为空
		if( txt.length<=0)return $('#ipt').val('');
		//输入内容不为空
		var lis='<li class="right_word"><img src="img/person02.png" /> <span>'+txt+'</span></li>'
		$('.talk_list').append(lis);
		$('#ipt').val('');
		//当聊天内容超出显示范围
		//重置滚动条的位置
		resetui();
		getMsg(txt);
	
	})
})
//发起请求获取聊天回复消息
function getMsg(txt) {
	$.get('http://www.liulongbin.top:3006/api/robot',{spoken:txt},function(res) {
		if(res.message==='success') {
			// console.log(res)
			var resmsg=res.data.info.text;
			//append括号里的内容必须位于一行上
			$('ul').append(' <li class="left_word"><img src="img/person01.png" /> <span>'+resmsg+'</span></li>')
			//重置滚动条位置
			resetui();
			getVoice(resmsg);
		}
	})
}
//将机器人的聊天内容转化为语音
function getVoice(msg) {
	$.ajax({
		method:'GET',
		url:'http://www.liulongbin.top:3006/api/synthesize',
		data:{text:msg},
		success:function(res) {
			// console.log(res);
			$('audio').attr('src',res.voiceUrl);
		}
	})
}
//使用回车发送消息
$('#ipt').on('keyup',function(e) {
	if(e.keyCode===13) {
		$('#btnSend').click();
	}
})
