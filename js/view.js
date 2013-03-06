$(document).ready(function() {
controller.initBounds();
controller.initPaper();
view.init();
});

view={

	landscape:function(color){
		if (!color){var color="#333";}
		var path="M 0 "+model.bounds.bottom;
		var lastY=0.7*model.bounds.bottom;
		var amplitude=10;
		var wavelength=100;
		for (var i=0;i<1000;i++){
			lastY+=_.random(-20,20);
			path+=" L "+(i*10)+" "+(lastY);

			
			if ((i*10)>model.bounds.right){break}
			}
		path+="L "+model.bounds.right+" "+model.bounds.bottom+" Z ";

		var landscape=model.paper.path(path).attr({fill:color});
		return landscape;
	},

	city:function(n){
	
	for (var i=0;i<n;i++){
		var x=davis.bell(model.bounds.right);
		var y=model.bounds.bottom/5+davis.bell(model.bounds.bottom);
		var w=_.random(40,100);
		var h=model.bounds.bottom;

		//building frames
		var b=model.paper.rect((x-w/2),y,w,model.bounds.bottom).attr({fill:"#000"});

		//domes
		if (_.random(10)>2){
			var c=model.paper.circle(x,y,(w/2)).attr({fill:"black"});
			};

		//trim
		for (var j=0;j<_.random(10);j++){
			var yOffset=_.random(10,30);
			var xOffset=_.random(2,5);
			var hOffset=_.random(2,10)
			var t=model.paper.rect((x-w/2)-xOffset,(y+yOffset),(w+(2*xOffset)),hOffset).attr({fill:"#000"});
			}

		/*
		//windows - still working on it
		var windowX=x-(w/2);
		console.log(windowX);
		for (var j=1;j<10;j++){
			var windowHeight=_.random(10,30);
			var w=model.paper.rect(windowX,y+yOffset,5,windowHeight).attr({fill:"#fff"});
			var windowX=parseInt(windowX)+10;
			console.log(windowX);
			//if ((j*10)>w){break};
			}
		//end window efforts
		*/
		
		}
	},

	nightSky:function(n){
		text=model.paper.text(0,0,"");
		var anim=Raphael.animation({"transform":"r 360 "+(model.bounds.right/2)+" "+(model.bounds.bottom/2)+""},1000000,function(){
			this.attr({"transform":"r 0 "+(model.bounds.right/2)+" "+(model.bounds.bottom/2)+""});
			this.animate(anim);
			});
		if (!n){var n=100;}
		for (var i=0;i<n;i++){
			var r=_.random(1,5);
			var dimension=Math.max(model.bounds.right,model.bounds.bottom);
			var star=model.paper.circle(_.random(dimension),_.random(dimension),r)
				.attr({fill:"#fff"})
				.data("big",false)
				.data("person",model.people[0])
				.data("initialR",r)
				.click(function(){
					if(this.data("big")==true){
						text.remove();
						this.animate({r:this.data("initialR")},1000,"elastic").data("big",false);
						}
					else{
						this.data("big",true);
						text.remove();
						this.animate({r:100},1000,"elastic",function(){
							//i know i know. I'm making it global because I haven't found a better way to do this yet.
							text=model.paper.text(this.attr("cx"),this.attr("cy"),"PEOPLE OF THE BIT");
							var rotationTheta=_.flatten(this.attr("transform")).join(" ");
							text.attr({"transform":rotationTheta});
							text.animate(anim);
							console.log(rotationTheta);
							});
						}
					});	
			star.animate(anim);
			}
	},
	
	init:function(){

	view.nightSky(200);
	

	var farMountains=view.landscape("#555");
	var horizon=model.paper.rect(model.bounds.left,(model.bounds.bottom-200),model.bounds.right,model.bounds.bottom).attr({fill:"black"});


	var otherMountains=view.landscape("#444");
	var hills=view.landscape("#333");

	view.city(25);
	var secondHorizon=model.paper.rect(model.bounds.left,(model.bounds.bottom-100),model.bounds.right,model.bounds.bottom).attr({fill:"black"});

	

		
	},

	

};
