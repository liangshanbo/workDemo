try{
	var frame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||window.msRequestAnimationFrame ||window.oRequestAnimationFrame;
	var preg = document.querySelector("#progress"),run = document.querySelector("#run"),p = 0;
	function step(){
		p += 1;
		if(p <= 100){
			preg.style.width = p + "%";
			preg.innerHTML = p + "%";
			frame(step);
		}
	}
	run.onclick = function(){
		preg.style.width = "1px";
		p = 0;
		if(p<100){
			step();
		}
	}
	
}catch(e){
	console.log("请使用最新版本的谷歌浏览器");
}