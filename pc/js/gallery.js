$(function(){
	var n=0;
	var targetx=0;

	$(".controlls li").click(function(e){
		e.preventDefault();
		n=$(this).index();
		targetx=n * -1 * 100;
		$(".gallery ul").css({"left" : targetx+"%"});
		$(".controlls li").removeClass("active");
		$(this).addClass("active");
	});
});
