try{
	console.log(navigator.userAgent);
	var xhr = new XMLHttpRequest();
	var ctx = new (window.AudioContext || window.webkitAudioContext || window.msAudioContext)();
	var frame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||window.msRequestAnimationFrame ||window.oRequestAnimationFrame;
	var source = ctx.createBufferSource();
	var analyser = ctx.createAnalyser();
	var cvs = document.querySelector("#canvas");
	var context = cvs.getContext("2d");
	var g = context.createLinearGradient(0,0,0,300);
	g.addColorStop(0,'#0ff');
	g.addColorStop(0.5,'#0aa');
	g.addColorStop(1.0,'#066');
	context.fillStyle = g;
	var fm = null;
	xhr.open("get","qinghua.mp3",true);
	xhr.responseType = "arraybuffer";
	
	xhr.onload = function(){
		console.log(xhr.response);
		ctx.decodeAudioData(xhr.response,function(buffer){
			source.buffer = buffer;
			source.connect(analyser);
			analyser.connect(ctx.destination);
			console.log("OK");
		});		
	}
	xhr.send();
	source.onended = function(){
		console.log("over");
		window.cancelAnimationFrame(fm);
		context.clearRect(0,0,cvs.width,cvs.height);
	}
	var play = document.querySelector("#play");
	play.onclick = function(){
		source.start(0);
		frame(function(){doSomething(analyser)});
	}

}catch(e){
	console.log("请使用最新版本的chrome或者firefox浏览器");
}
function doSomething(analyser){
	var array = new Uint8Array(analyser.frequencyBinCount);
	var width = cvs.width,height = cvs.height,cw = 10,cp = 2;
	var num = width/(cw + cp);
	var step = Math.round(array.length/num);
	console.log(step);
	analyser.getByteFrequencyData(array);
	context.clearRect(0,0,width,height);
	for(var i=0;i<num;i++){
		var val = array[step * i];
		context.fillRect((cw+cp)*i,height - val,cw,height - 2);
	}
	fm = frame(function(){doSomething(analyser)});
}

