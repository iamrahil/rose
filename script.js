// demojson={
// 	"name":"thewindrose",
// 	"crosswind":"15",
// 	"angles":["0","22.5","45","67.5","90","112.5","135","157.5","180","202.5","225","247.5","270","292.5","315","337.5"],
// 	"wind":[
// 		{
// 			"least":"4",
// 			"most":"15",
// 			"percents":["2.4","3","5.3","6.8","7.1","6.4","5.8","3.8","1.8","1.7","1.5","2.7","4.9","3.8","1.7","1.7"],
// 		},
// 		{
// 			"least":"15",
// 			"most":"20",
// 			"percents":["0.4","1.2","1.6","3.1","2.3","3.5","1.9","1","0.4","0.8","0.6","0.4","0.4","0.6","0.6","0.9"],
// 		},
// 		{
// 			"least":"20",
// 			"most":"25",
// 			"percents":["0.1","1","1","1.7","1.9","1.9","1.1","0.1","0.1","0.4","0.2","0.1","0.1","0.2","0.2","0.1"],
// 		},
// 		{
// 			"least":"25",
// 			"most":"35",
// 			"percents":["0","0.5","0.4","0.1","0.2","0.1","0","0","0","0.3","0","0","0","0","0","0"],
// 		}
// 	],
// 	"calm":"8.1"
// };

demojson={"name":"inputjson","crosswind":"15","angles":["2.4","3","5.3","6.8","7.1","6.4","5.8","3.8","1.8","1.7","1.5","2.7","4.9","3.8","1.7","1.7"],"wind":[{"least":"0","most":"13","percents":["4.39","3.64","8.00","6.64","3.64","1.06","1.06","1.06","1.06","1.06","1.06","1.40","3.40","4.90","3.60","2.06"]},{"least":"14","most":"20","percents":["0","0","0","0","0","0","0","0","0","0","2.70","7.40","15.70","12.70","8.00","1.70"]}],"calm":"3.77"};
function addWind(){
	input_div=document.getElementById('input_div');
	var form=document.createElement('form');
	var h31=document.createElement('h3');
	h31.innerHTML="Wind Speed Range(mi/h)";
	var fromLabel=document.createElement('label');
	fromLabel.innerHTML="From:";
	var from=document.createElement('input');
	from.setAttribute('type','number');
	from.setAttribute('name','least');
	var to=document.createElement('input');
	to.setAttribute('type','number');
	to.setAttribute('name','least');
	var toLabel=document.createElement('label');
	toLabel.innerHTML="From:"
	var h32=document.createElement('h3');
	h32.innerHTML="% of time";
	form.appendChild(h31);
	form.appendChild(fromLabel);
	form.appendChild(from);
	form.appendChild(toLabel);
	form.appendChild(to);
	form.appendChild(h32);
	for(var i=0;i<16;i++){
		var inputbox=document.createElement('input');
		inputbox.setAttribute('name','speeds');
		inputbox.setAttribute('type','text');
		form.appendChild(inputbox)
	}
	form.setAttribute('class','columns1')
	input_div.appendChild(form);

}

input=demojson;
canvas=document.getElementById("myCanvas");
origin=canvas.width/2;


context=canvas.getContext('2d');
function Cordinate(x,y){
	this.X=x;
	this.Y=y;
	this.R=Math.sqrt(x*x+y*y);
	this.T=Math.atan2(y,x);
}

function PCord(r,theta){
	this.vY=r*Math.cos(theta*Math.PI/180);
	this.vX=r*Math.sin(theta*Math.PI/180);
	this.X=origin-this.vX;
	this.Y=origin-this.vY;
	this.R=r;
	this.degree=theta;
	this.radian=Math.atan2(-1*this.vY,-1*this.vX);
}

function Line(p1,p2) {
	this.P1=p1;
	this.P2=p2;
}

function onPush(e){
	t1=document.forms[0][0].value;
	t2=document.forms[0][1].value;
	t3=document.forms[0][2].value;
	t4=document.forms[0][3].value;
	area=""
}
radii = new Array();

context.center=function(P,radius,thick) {
	context.beginPath();
	context.arc(P.X,P.Y,radius,0,2*Math.PI,false);
	context.lineWidth= thick || 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRose(){
	radius=roseScale*parseInt(input.wind[0].least);
	radii[0]=radius;
	context.beginPath();
	context.arc(origin,origin,radius,0,2*Math.PI,false);
	context.lineWidth=1;
	context.strokeStyle = 'black';
	context.fillStyle="white";
	context.stroke();
	context.fill();
	
	for(var i=0;i<nwinds;i++){
		radius=roseScale*parseInt(input.wind[i].most);
		context.beginPath();
		context.arc(origin,origin,radius,0,2*Math.PI,false);
		radii[i+1]=radius;
		context.lineWidth=1;
		context.strokeStyle = 'black';
		context.stroke();
	}
}

function drawAxes(){
	var Ye1= new PCord(origin,90);
	var Ye2= new PCord(origin,-90);
	var Xe1= new PCord(origin,0);
	var Xe2= new PCord(origin,180);
	context.beginPath();
	context.moveTo(Ye1.X,Ye1.Y);
	context.lineTo(Ye2.X,Ye2.Y);
	context.moveTo(Xe1.X,Xe1.Y);
	context.lineTo(Xe2.X,Xe2.Y);
	context.stroke();
}

function drawWind(){
	for(var unit=11.25;unit<360;unit=unit+22.5){
		point= new PCord(radius,unit);
		context.beginPath();
		var refp=new PCord(radii[0],unit);
		context.moveTo(refp.X,refp.Y);
		context.lineTo(point.X,point.Y);
		context.stroke();
	}
}

function drawLabels(){
	//label directions
	directions=["N","NNW","NW","WNW","W","WSW","SW","SSW","S","SSE","SE","ESE","E","ENE","NE","NNE"];
	for(var unit=0;unit<360;unit=unit+22.5){
		var refp=new PCord(radii[radii.length-1]+20,unit);
		context.font = '10pt Arial';
		context.fillStyle="black";
		context.textAlign = 'center';
		context.fillText(directions[parseInt(unit/22.5)],refp.X,refp.Y);
	}
	//label wind speeds
	// for(var i=0;i<radii.length-1;i++){
	// 	var refp=new PCord(radii[i]-5,0);
	// 	context.font = '10pt Arial';
	// 	context.fillStyle="black";
	// 	context.textAlign = 'center';
	// 	context.fillText(input.wind[i].least,refp.X,refp.Y);
	// }

	//label percentages
	for(var i=1;i<radii.length;i++){
		radius=(radii[i]+radii[i-1])/2;
		for(j=0;j<input.angles.length;j++){
			var refp=new PCord(radius,360-22.5*j);
			context.font = '10pt Arial';
			context.fillStyle='Black';
			context.textAlign='center';
			context.fillText(input.wind[i-1].percents[j],refp.X,refp.Y)
		}
	}
	context.fillText(input.calm,origin,origin);

}

function getSector(n,theta,ct){
	context.clearRect(0,0,2*origin,2*origin);
	var lowerRight= new PCord(radii[n],360-theta-11.25);
	var lowerLeft= new PCord(radii[n],360-theta+11.25);
	var upperRight= new PCord(radii[n+1],360-theta-11.25);
	var upperLeft= new PCord(radii[n+1],360-theta+11.25);
	var edges=[upperRight,upperLeft,lowerRight,lowerLeft];
	return edges;
}

function areaSector(n,theta){
	edges=getSector(n,theta);
	var upperRight=edges[0];
	var upperLeft=edges[1];
	var lowerRight=edges[2];
	var lowerLeft=edges[3];

	context.beginPath();
	context.moveTo(origin,origin);
	context.arc(origin,origin,upperRight.R,upperRight.radian,upperLeft.radian,true);
	context.lineTo(origin,origin);
	context.strokeStyle="white"
	context.lineWidth=0;
	context.fillStyle="red";
	context.fill();

	
	context.beginPath();
	context.moveTo(origin,origin);
	context.arc(origin,origin,lowerRight.R,0,2*Math.PI,false);
	context.lineTo(origin,origin);
	context.fillStyle="white";
	context.fill();
	var a1=findArea(255,0,0);
	return a1;
}

function windArea(n,theta,ct){
	edges=getSector(n,theta);
	var upperRight=edges[0];
	var upperLeft=edges[1];
	var lowerRight=edges[2];
	var lowerLeft=edges[3];
	//build the cross wind
	var percent=input.wind[n].percents[theta/22.5];
	var a1=areaSector(n,theta);
	
	context.save();
	crosswind=parseInt(input.crosswind)*roseScale;
	context.translate(origin,origin);
	context.rotate(ct*Math.PI/180);
	context.fillStyle="black";
	context.beginPath();
	context.rect(-3000,crosswind*-1,6000,2*crosswind)
	context.fill();
	context.stroke();
	var a2=findArea(255,0,0);
	
	context.restore();	
	var esum=(1-(a2/a1))*percent;
	console.log(n,theta,percent,a1,a2,esum)
	return esum;

}

function findArea(r,g,b,a){
	dataArray=context.getImageData(0,0,600,600).data;
	count=0;
	for(var i=0;i<dataArray.length;i=i+4){
		if(r==dataArray[i] && g==dataArray[i+1] && b==dataArray[i+2])
			count++;
	}
	return count;
}

function sweep(theta){
	var sum=0;
	for(var r=0;r<radii.length-1;r++){
		for(var t=0;t<360;t=t+22.5){
			sum=sum+windArea(r,t,theta);
		}
	}
	return sum+parseInt(input.calm);

}

function startblow(precision){
	output=document.getElementById('output');
	output.innerHTML="<p>Processing different directions.. Please wait</p>";
	setTimeout('blow('+precision+')',1000);
}

function blow(precision){
	output=document.getElementById('output');
	max=0;angle=0;
	for(var i=0;i<180;i=i+parseInt(precision)){
		a=sweep(i);
		output.innerHTML=output.innerHTML+"Finished value for angle "+i+" = "+a+"<br/>";
		if(max<a){max=a;angle=i;}
	}
	output.innerHTML+="<p>The Maximum value "+max+" was found for direction "+angle+"</p>";
	drawfinal(angle);
	if(max<95){
		output.innerHTML+='<p>The maximum value is less then 95%</p>';
		crossButton=document.createElement('input');
		//<input type="submit" value="Proceed to cross runway" onclick="crossBlow('+angle+','+precision+')'+'/>'
		crossButton.setAttribute('type','submit');
		crossButton.setAttribute('value','Proceed to cross runway');
		crossButton.setAttribute('onclick','crossBlow('+angle+','+precision+')');
		output.appendChild(crossButton);
	}

}
function drawfinal(i,j){
	context.clearRect(0,0,origin*2,origin*2);
	drawRose();
	drawWind();
	drawLabels();
	context.save();
	crosswind=parseInt(input.crosswind)*roseScale;
	context.translate(origin,origin);
	context.rotate(i*Math.PI/180);
	context.beginPath();
	context.rect(-3000,crosswind*-1,6000,2*crosswind)
	context.lineWidth="3";
	context.strokeStyle="red";
	context.stroke();
	context.restore();

	if(typeof(j)==undefined)
		return;
	else{
		context.save();
		crosswind=parseInt(input.crosswind)*roseScale;
		context.translate(origin,origin);
		context.rotate(j*Math.PI/180);
		context.beginPath();
		context.rect(-3000,crosswind*-1,6000,2*crosswind)
		context.lineWidth="3";
		context.strokeStyle="green";
		context.stroke();
		context.restore();
	}
}

function crossWindArea(n,theta,ct,angle){
	edges=getSector(n,theta);
	var upperRight=edges[0];
	var upperLeft=edges[1];
	var lowerRight=edges[2];
	var lowerLeft=edges[3];

	var percent=input.wind[n].percents[theta/22.5];
	var a1=areaSector(n,theta);
	
	context.save();
	crosswind=parseInt(input.crosswind)*roseScale;
	context.translate(origin,origin);
	context.rotate(angle*Math.PI/180);
	context.fillStyle="black";
	context.beginPath();
	context.rect(-3000,crosswind*-1,6000,2*crosswind)
	context.fill();
	context.restore();

	context.save();
	crosswind=parseInt(input.crosswind)*roseScale;
	context.translate(origin,origin);
	context.rotate(ct*Math.PI/180);
	context.fillStyle="black";
	context.beginPath();
	context.rect(-3000,crosswind*-1,6000,2*crosswind)
	context.fill();
	context.restore();

	var a2=findArea(255,0,0);
	var esum=(1-(a2/a1))*percent;
	return esum;
}

function crossSweep(theta,angle){
	var sum=0;
	for(var r=0;r<radii.length-1;r++){
		for(var t=0;t<360;t=t+22.5){
			sum=sum+crossWindArea(r,t,theta,angle);
		}
	}
	return sum+parseInt(input.calm);
}

function crossBlow(strangle,precision){
	output=document.getElementById('output');
	max=0;angle=0;
	for(var i=0;i<180;i=i+parseInt(precision)){
		a=crossSweep(i,strangle);
		output.innerHTML=output.innerHTML+"Finished value for angle "+i+" = "+a+"<br/>";
		if(max<a){max=a;angle=i;}
	}
	output.innerHTML+="<p>The Maximum value "+max+" was found for direction "+angle+"</p>";
	drawfinal(angle,strangle);
}

function process(){
	input_div=document.getElementById('input_div');
	if(document.forms[2][0].value==''){
		alert("improper data entered.. using default values");
		nwinds=input.wind.length;
		roseScale=(origin-origin/6)/(input.wind[nwinds-1].most);
		return;
	}
	inputjson={"name":"inputjson"}
	inputjson.crosswind=document.getElementById('crowssWindInput').value;
	inputjson.angles=["2.4","3","5.3","6.8","7.1","6.4","5.8","3.8","1.8","1.7","1.5","2.7","4.9","3.8","1.7","1.7"];
	inputjson.wind=new Array();
	var sum=0;
	for(var i=2;i<document.forms.length-2;i++){
		inputjson.wind[i-2]=new Object();
		inputjson.wind[i-2].least=document.forms[i]['least'].value;
		inputjson.wind[i-2].most=document.forms[i]['most'].value;
		inputjson.wind[i-2].percents = new Array();
		for(var j=0;j<16;j++){
			var a=document.forms[i][j+2].value;
			console.log(a)

			if(a==''){a=0;}
			inputjson.wind[i-2].percents[j]=a;
			sum+=parseFloat(a);
			console.log("sum",sum)
		}
	}
	if(sum>100){alert("improper data entered");return;}
	inputjson.calm=100-sum;
	input=inputjson;
	nwinds=input.wind.length;
	roseScale=(origin-origin/6)/(input.wind[nwinds-1].most);
}

function warn(value){
	if(value<10)
		alert("Avoid using lesser values unless you own a supercomputer!")
}