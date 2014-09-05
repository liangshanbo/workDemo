var cvs = document.querySelector("#clock_hand");
var face = document.querySelector("#clock_face").getContext("2d");
var hand = cvs.getContext("2d");
var width = cvs.width,height = cvs.height,x = width/2,y = height/2;

drawClock(face,"Clock_Face.jpg");
var now = new Date();
var hour = now.getHours(),minute = now.getMinutes(),second = now.getSeconds();
init(hand,x,y,hour,minute,second);

setInterval(function(){
	var now = new Date();
	var hour = now.getHours(),minute = now.getMinutes(),second = now.getSeconds();
	init(hand,x,y,hour,minute,second);
},1000);

function drawClock(ctx,imgPath){
	var img = new Image();
	img.onload = function(){
		ctx.drawImage(img,0,0);
		ctx.font = "80px 宋体";
		ctx.shadowColor = "#f00";
		ctx.shadowBlur = 3;
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.fillStyle = "rgb(4,96,59)";
		var text = "ROLEX";
		ctx.strokeText(text,300,300);
		ctx.fillText(text,300,300);
	}
	img.src = imgPath;
}

function hourHand(hand,x,y){
	hand.beginPath();
	hand.moveTo(x,y);
	hand.lineTo(x-10,y-20);
	hand.lineTo(x,y-140);
	hand.lineTo(x+10,y-20);
	hand.closePath();
	hand.stroke();
	hand.fill();
}
function minuteHand(hand,x,y){
	hand.beginPath();
	hand.fillStyle = "#00f";
	hand.moveTo(x,y);
	hand.lineTo(x-10,y-20);
	hand.lineTo(x,y-190);
	hand.lineTo(x+10,y-20);
	hand.closePath();
	hand.stroke();
	hand.fill();
}
function secondHand(hand,x,y){
	hand.beginPath();
	hand.fillStyle = "#f00";
	hand.translate(x,y);
	hand.rotate(Math.PI/30);
	hand.translate(-x,-y);
	hand.moveTo(x,y);
	hand.lineTo(x-10,y-20);
	hand.lineTo(x,y-240);
	hand.lineTo(x+10,y-20);
	hand.closePath();
	hand.stroke();
	hand.fill();
}
function init(hand,x,y,hour,minute,second){
	hand.clearRect(0,0,width,height);
	//second
	hand.save();
	hand.translate(x,x);
	hand.rotate(Math.PI/30 * second);
	hand.translate(-y,-y);
	secondHand(hand,x,y);
	hand.restore();
	//Minute
	hand.save();
	hand.translate(x,y);
	hand.rotate(Math.PI/30 * minute);
	hand.translate(-x,-y);
	minuteHand(hand,x,y);
	hand.restore();
	//Hour
	hand.save();
	hand.translate(x,y);
	hand.rotate(Math.PI/30 * (hour * 5 + Math.floor(minute/12)));
	hand.translate(-x,-y);
	hourHand(hand,x,y);
	hand.restore();
}

