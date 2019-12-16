$(function(){
	var n=0;

	$(".key_controller li").eq(0).find("a").addClass("active");
	$(".key li").eq(0).addClass("active");

	$(".key_controller li").click(function(e){
		e.preventDefault();
		n=$(this).index();
		$(".key_controller li a").removeClass("active");
		$(".key_controller li").eq(n).find("a").addClass("active");
		$(".key li").removeClass("active");
		$(".key li").eq(n).addClass("active");
	});
	setInterval(function(){
		if(n < 2){
			n=n+1;
		}
		else{
			n=0;
		}
		$(".key_controller li a").removeClass("active");
		$(".key_controller li").eq(n).find("a").addClass("active");
		$(".key li").removeClass("active");
		$(".key li").eq(n).addClass("active");
	}, 4000);


	$(".menu_tab").click(function(e){
		e.preventDefault();
		$(".dim").addClass("active");
		$("#GNB").addClass("active");
	});
	$("#GNB .tab1").click(function(e){
		e.preventDefault();
		$(".dim").removeClass("active");
		$("#GNB").removeClass("active");
		$("#GNB > ul > li").removeClass("active");
		$("#GNB > ul > li").find("ul").slideUp("300");
	});



	$("#GNB > ul > li").click(function(e){
		e.preventDefault();

		if($(this).find("ul").is(":visible") == false){
			$("#GNB > ul > li").removeClass("active");
			$(this).addClass("active");
			$("#GNB ul ul").slideUp(300);
			$(this).find("ul").slideDown(300);
		}
		else{
			$(this).removeClass("active");
			$(this).find("ul").slideUp(300);
		}
	});



	$(".close").click(function(e){
		e.preventDefault();
		if($("input[name=todayClose]").is(":checked")){
			setCookie("close", "yes", 1);
			// cookie 이름 : close
			// cookie 값 : yes
		}
		$(".popup").fadeOut(300);
		$(".popup_dim").addClass("active");
		$("body").removeClass("fixed");
	});

	if(GetCookie("close") == "yes"){
	}
	else{
		$("body").addClass("fixed");
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

	$(".keyvisual").mobileDragEvent2({total:3});



	$.fn.mobileDragEvent1=function(options){
		options=$.extend({
			total: 10
		}, options);

		return this.each(function(){
			var $keyvisual=$(this); // 이벤트 대상입니다.
			var $total=$(options.total)[0]; // 갤러리의 개수를 지정할 변수입니다.
			var w; // 윈도우의 가로 크기를 지정하는 변수입니다.
			var n=0; // 갤러리의 변수를 지정할 추가 변수입니다.
			var amount=0; // 갤러리의 메인 번호를 지정할 변수입니다.
			var moving=false; // 현재 움직이고 있는지 아닌지를 점검할 변수입니다. true이면 또 다른 이벤트 동작이 구현되지 않습니다.
			var xDown=null; // 모바일 드래그 이벤트의 가로 지정 변수입니다.
			var yDown=null; // 모바일 드래그 이벤트의 세로 지정 변수입니다.
			var direction=""; // 모바일 드래그 이벤트의 방향 지정 변수입니다.
			$(".cont_btm li").eq(n).addClass("active"); // 추가되는 코드입니다.

			$(window).resize(function(){ // 초기의 윈도우의 가로 크기를 지정합니다.
				w=$(window).width();
				$(".mdgallery").css({left:0, width:w*$total});
				$(".mdgallery li").css({width:$(".mdgallery").width()/$total});
			});
			$(window).trigger("resize");

			$(".left").click(function(e){ // 오른쪽으로 이동합니다.
				e.preventDefault();
				if(moving){
					return;
				}
				amount-=w;
				moving=true;

				if(n > 0){ // 추가되는 코드입니다.
					n--;
				}
				else{
					n=($total-1);
				}
				$(".cont_btm li").removeClass("active");
				$(".cont_btm li").eq(n).addClass("active");

				$(".mdgallery").css({left:amount});
				$(".mdgallery").prepend($(".mdgallery li").last());
				amount+=w;

				$(".mdgallery").animate({left:amount}, 500, function(){
					moving=false;
				});
			});
			$(".right").click(function(e){ // 왼쪽으로 이동합니다.
				e.preventDefault();
				if(moving){
					return;
				}
				amount-=w;
				moving=true;

				if(n < ($total-1)){ // 추가되는 코드입니다.
					n++;
				}
				else{
					n=0;
				}
				$(".cont_btm li").removeClass("active");
				$(".cont_btm li").eq(n).addClass("active");

				$(".mdgallery").animate({left:amount}, 500, function(){
					moving=false;
					amount+=w;
					$(this).css({left:amount});
					$(this).append($(".mdgallery li").first());
				});
			});
			$keyvisual.on("touchstart", function(e){
				var evt=e.originalEvent;
				clearInterval(id); // 추가되는 코드입니다.
				xDown=evt.touches[0].clientX;
				yDown=evt.touches[0].clientY;
			});
			$("#page4 .main").on("touchend", function(e){ // 추가되는 코드입니다.
				id=setInterval(function(){
					$(".right").trigger("click");
				}, 6000);
			});
			$keyvisual.on("touchmove", function(e){
				if(moving){
					return;
				}
				var evt=e.originalEvent;
				swipe(evt);

				if(direction == "left"){
					$(".right").trigger("click");
				}
				else if(direction == "right"){
					$(".left").trigger("click");
				}
			});
			var id=setInterval(function(){ // 추가되는 코드입니다.
				$(".right").trigger("click");
			}, 6000);

			// swipe API
			function swipe(evt){
				if(!xDown || !yDown){
					return;
				}
				var xUp=evt.touches[0].clientX;
				var yUp=evt.touches[0].clientY;
				var xDiff=xDown-xUp;
				var yDiff=yDown-yUp;

				if(Math.abs(xDiff) > Math.abs(yDiff)){
					if(xDiff > 0){
						// left swipe
						direction="left";
					}else{
						// right swipe
						direction="right";
					}
				}else{
					if(yDiff > 0){
						// up swipe
					}else{
						// down swipe
					}
				}
				xDown=null;
				yDown=null;
			}
		});
	}
	$("#page4 .main").mobileDragEvent1({total:5});
});
