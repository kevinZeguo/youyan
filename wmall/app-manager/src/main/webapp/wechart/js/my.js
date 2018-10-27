//自动适应屏幕
(function() {
	window.onresize=function(){
		resetFont();
	};
	function resetFont(){
		var HTML=document.getElementsByTagName('html')[0];
		var ww=document.documentElement.clientWidth;
		var scale=ww/640;//640为pds图的宽度
		HTML.style.fontSize=100*scale+'px';
	}
	resetFont();
}());
//图片轮播Swiper插件
var mySwiper = new Swiper ('.swiper-container', {
direction: 'horizontal', //横向
loop: true, //循环
autoplay : 3000, //自动播放
autoplayDisableOnInteraction : false, //控制后继续自动播放
paginationClickable :true, //分页器可以点击切换
grabCursor : true, //鼠标手掌
// 分页器
pagination: '.swiper-pagination'
}) ;  

//切换卡
$.fn.extend({
	Tab:function (){
		var $this=$(this);
		$this.find('.cp_list li').click(function (){
			var i=$this.find('.cp_list li').index(this);
			$this.find('.cp_list li').eq(i).addClass('c_show').siblings().removeClass('c_show');
			$this.find('.xq_con .tab').eq(i).show().siblings().hide();
		});
	} 
});
$('#box1').Tab();

// 评论切换卡
$.fn.extend({
	Tab1:function (){
		var $this=$(this);
		$this.find('.cp_list h2').click(function (){
			var i=$this.find('.cp_list h2').index(this);
			$this.find('.cp_list h2').eq(i).addClass('c_show').siblings().removeClass('c_show');
			$this.find('.xq_con .div').eq(i).show().siblings().hide();
		});
	} 
});
$('#box2').Tab1();
// 点击加减数字
$(document).ready(function(){
	$("#add").click(function(){
	  var n=$(".xz_inp").val();
	  var xz_inp=parseInt(n)+1;
	 if(xz_inp==0){alert("cc");}
	  $(".xz_inp").val(xz_inp);
	});
	$("#jian").click(function(){
		  var n=$(".xz_inp").val();
		  var xz_inp=parseInt(n)-1;
		 if(xz_inp==0){alert("商品不能为0!"); return}
		  $(".xz_inp").val(xz_inp);
	});
});
$(document).ready(function(){
	$("#add1").click(function(){
	  var n=$(".xz_inp").val();
	  var xz_inp=parseInt(n)+1;
	 if(xz_inp==0){alert("cc");}
	  $(".xz_inp").val(xz_inp);
	});
	$("#jian1").click(function(){
		  var n=$(".xz_inp").val();
		  var xz_inp=parseInt(n)-1;
		 if(xz_inp==0){alert("商品不能为0!"); return}
		  $(".xz_inp").val(xz_inp);
	});
});
// 控制320PX宽度设备的部分内容调整
$(function(){
	var bodw=$("body").width();
	if (bodw==320) {
		$(".tcjg a").css('marginLeft','0');
		$(".tcjg h4").css('marginTop','0');
		$('.tcby').html('');
		$('.tcby').css('width','0');
		$('.jiaqian').css('marginTop','0.1rem');
	};
});
//立即注册
$(function(){
	$('.kuang_c  label').click(function(){
		$('.kuang').hide();
		$('.kuang_c').hide();
		
	});
});
//控制套餐图片的加号等于号
$(function(){
	$('.t_list li .img').attr("src","images/jia_03.png");
	$('.t_list li:last-child .img').attr("src","images/dengyu_05.png");
});
/*详情页口味分类选择*/
$(function(){
	$('.splx li').click(function(){
		var x=$('.splx li').index(this);
		$('.splx li').eq(x).addClass('sp_show').siblings().removeClass('sp_show');
		//alert($(".sp_show").html());
	})
})



