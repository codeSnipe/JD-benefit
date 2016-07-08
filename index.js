require(['./cloud/cloud','./cloud/data'],function(Cloud,Data){
	var cloud = new Cloud({
		data:Data,
		autoplay:true,
		speed:2000,
		gotoUrl:function(url){
			console.log(url);
		}
	}).init();
});