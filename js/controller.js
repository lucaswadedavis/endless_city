var controller={

initBounds:function(){
	model.bounds={
		bottom:window.innerHeight,
		right:window.innerWidth,
		top:0,
		left:0
		}
	},

initPaper:function(){
	model.paper=Raphael(model.bounds.left,model.bounds.top,model.bounds.right,model.bounds.bottom);
	}
};
