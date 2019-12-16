$(function(){
	$("#GNB").hover(
		function(){
			$("#header .menu").addClass("over");
		},
		function(){
			$("#header .menu").removeClass("over");
		}
	);
	$("#GNB > ul > li:first-child > a").focusin(function(){
		$(this).parents(".menu").addClass("over");
	});
	$("nav li:last-child li:last-child").focusout(function(){
		$(this).parents(".menu").removeClass("over");
	});
	$("#GNB > ul > li > a").focusin(function(){
		$(this).addClass("over");
	});
	$("#GNB li li:last-child").focusout(function(){
		$(this).parent().prev("a").removeClass("over");
	});

	var n=0;
	var pos=0;

	$(".controller li").eq(0).find("a").addClass("active");

	$(".controlls li").click(function(e){
		e.preventDefault();
		n=$(this).index();
		galleryMoving();
	});

	$(".controlls li").hover(
		function(){
			clearInterval(id);
		},
		function(){
			id=setInterval(function(){
				n++;
				galleryMoving();
			}, 5000);
		}
	);

	var id=setInterval(function(){
		n++;
		galleryMoving();
	}, 5000);

	function galleryMoving(){
		pos=-1*n*100+"%";

		$(".gallery_moving").animate({left:pos}, 300, function(){
			$(".controlls li a").removeClass("active");
			$(".controlls li").eq(n).find("a").addClass("active");

			if(n == 5){
				n=0;
				pos=0;
				$(".gallery_moving").animate({left:0}, 0);
				$(".controlls li a").removeClass("active");
				$(".controlls li").eq(n).find("a").addClass("active");
			}
		});
	}

	$(".main_notice .main_tab a").eq(0).addClass("active");
	$(".main_notice .main_panel div").eq(0).addClass("active");

	var tabN=0;

	$(".main_notice .main_tab a").click(function(e){
		e.preventDefault();
		tabN=$(this).index();
		$(".main_notice .main_tab a").removeClass("active");
		$(this).addClass("active");
		$(".main_notice .main_panel div").removeClass("active");
		$(".main_notice .main_panel div").eq(tabN).addClass("active");
	});

	var listN;
	var listName="";

	$(".select .local dt a").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).parent().next("dd").slideToggle(300);
	});
	$(".select .local dd a").click(function(e){
		e.preventDefault();
		$(".select .local dd a").removeClass("active");
		$(this).addClass("active");

		listName=$(this).text();
		$(".select .local dt a").html(listName+"<span></span>");
		$(".select .local dt a").removeClass("active");
		$(".select .local dd").slideUp(300);

		listN=$(this).parent().index();
		$("select.local1 option").prop("selected", false);
		$("select.local1 option").eq(listN+1).prop("selected", true);
	});


	$(".select .center dt a").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(this).parent().next("dd").slideToggle(300);
	});
	$(".select .center dd a").click(function(e){
		e.preventDefault();
		$(".select dd a").removeClass("active");
		$(this).addClass("active");

		listName=$(this).text();
		$(".select .center dt a").html(listName+"<span></span>");
		$(".select .center dt a").removeClass("active");
		$(".select .center dd").slideUp(300);

		listN=$(this).parent().index();
		$("select.center1 option").prop("selected", false);
		$("select.center1 option").eq(n+1).prop("selected", true);
	});

	var n1=0;
	var pos1=0;

	$(".controlls_1 li").click(function(e){
		e.preventDefault();
		n1=$(this).index();
		pos1=n1 * -1 * 368;

		$(".campus_wrap ul").css({"left": pos1});

		$(".controlls_1 li a").removeClass("active");
		$(this).find("a").addClass("active");
	});



	var w=160;
	var amount=0;

	$(".prev").click(function(e){
		e.preventDefault();
		leftMoving();
	});
	$(".next").click(function(e){
		e.preventDefault();
		rightMoving();
	});

	function leftMoving(){
		amount-=w;
		$(".site_wrapper ul").animate({left:amount}, 500, function(){
			$(this).append($(".site_wrapper ul li:first-child"));
			amount+=w;
			$(this).css({left:amount});
		});
	}
	function rightMoving(){
		$(".site_wrapper ul").prepend($(".site_wrapper ul li:last-child"));
		amount-=w;
		$(".site_wrapper ul").css({left:amount});
		amount+=w;
		$(".site_wrapper ul").animate({left:amount}, 500);
	}


	$(".close").click(function(e){
		e.preventDefault();
		if($("input[name=todayClose]").is(":checked")){
			setCookie("close", "yes", 1);
			// cookie 이름 : close
			// cookie 값 : yes
		}
		$(".popup").fadeOut(300);
	});

	if(GetCookie("close") == "yes"){
	}
	else{
	}

	function setCookie(name, value, expiredays){
		var days=expiredays;
		if(days){
			var date=new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires="; expires="+date.toGMTString();
		}else{
			var expires="";
		}
		document.cookie=name+"="+value+expires+"; path=/";
	}
	function GetCookie(name){
		var value=null, search=name+"=";
		if(document.cookie.length > 0){
			var offset=document.cookie.indexOf(search);
			if(offset != -1){
				offset+=search.length;
				var end=document.cookie.indexOf(";", offset);
				if(end == -1) end=document.cookie.length;
				value=unescape(document.cookie.substring(offset, end));
			}
		} return value;
	}
});
