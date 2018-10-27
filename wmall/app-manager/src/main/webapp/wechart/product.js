var COOKIE_NAME = "Bind_Prod_List";
var cookie_val = $.JSONCookie(COOKIE_NAME);//读取json格式cookie
var productId = GetQueryString("productId").toString();
var username = GetQueryString("username").toString();
var customerId = GetQueryString("customerId").toString();
var productSimg = GetQueryString("productSimg").toString();
var productLimg = GetQueryString("productLimg").toString();
var productSpec = GetQueryString("productSpec").toString();
var productName = decodeURI(GetQueryString("productName").toString());
var productPrice = GetQueryString("productPrice").toString();
var restNumber = GetQueryString("restNumber").toString();
var city = decodeURIComponent(GetQueryString("city").toString());
//alert(decodeURIComponent(city));

function GetQueryString(sProp) {
	var re = new RegExp("[&,?]" + sProp + "=([^//&]*)", "i");
	var a = re.exec(document.location.search);
	if (a == null)
		return "";
	return a[1];
}

$(function(){
	//initUI();
	initProductInfo();
	getKW();
	//initComments();
});
function getProductList() {
		$("#price"+productId+"").val(productPrice);
		$("#price"+productId+"").val(productPrice);
		$("#standardPrice").html("￥"+productPrice);
		$("#standardPrice2").html("￥"+productPrice);
		$("#productPrice").html("￥"+productPrice);
	
}
function initUI(){
// $('#owl-demo').owlCarousel({
// items: 1,
// autoPlay: true
// });
	$('#mun').click(function(event) {
		// alert(1);
		event.preventDefault();
		var erc = event.target;
		var href = $(erc).attr('href');
		if (!href) {
			return;// 点击的不是a返回
		}
		$('.active').removeClass('active');
		$(erc).addClass('active');
		$('.mun_mian > div').hide();
		$(href).show();
	});
}
function initProductInfo() {
		/*$("#productName").html(productName);
		$("#standardPrice").html("￥"+productPrice);
		$("#productPrice").html("￥"+productPrice);
		$("#standardPrice2").html("￥"+productPrice);
		$("#productName2").html("商品名称："+productName);
		$("#productSpec").html("商品规格："+decodeURIComponent(productSpec));
		$("#rest").html("库存"+restNumber+"件");
		$("#restNumber").html("库存："+restNumber+"件");
		$("#productSimg").attr("src","../productimg/"+productSimg);
		$("#productLimg").attr("src","../productimg/"+productLimg);
		$("#kwsrc").attr("src","../productimg/"+productLimg);
		var html="";
		html +='<input type="hidden" id="code'+productId+'" value="'+productId+'"/>';
		html +='<input type="hidden" id="name'+productId+'" value="'+productName+'"/>';
		html +='<input type="hidden" id="price'+productId+'" value="'+productPrice+'"/>';
		html +='<input type="hidden" id="restNumber'+productId+'" value="'+restNumber+'"/>';
		$("#hidDiv").html(html);*/
	
	$.ajax({
		url : '../product/getProdutById.do?rd=' + Math.random(),
		data : 'productid=' + productId,
		datatype : 'json',
		async : false,
		success : function(data) {
			var product=data.object;
			
			
			$("#productName").html(product.productName);
			$("#standardPrice").html("￥"+product.productPrice);
			//$("#productPrice").html("￥"+product.productPrice);
			$("#standardPrice2").html("￥"+product.productPrice);
			$("#productName2").html("商品名称："+product.productName);
			$("#productSpec").html("商品规格："+product.productSpec);
			$("#rest").html("库存"+product.restNumber+"件");
			$("#restNumber").html("库存："+product.restNumber+"件");
			$("#productSimg").attr("src","../productimg/"+product.productSimg);
			$("#productLimg").attr("src","../productimg/"+product.productLimg);
			$("#kwsrc").attr("src","../productimg/"+product.productLimg);
			
			
			var html="";
			html +='<input type="hidden" id="code'+product.productId+'" value="'+product.productId+'"/>';
			html +='<input type="hidden" id="name'+product.productId+'" value="'+product.productName+'"/>';
			//html +='<input type="hidden" id="price'+product.productId+'" value="'+product.productPrice+'"/>';
			html +='<input type="hidden" id="restNumber'+product.productId+'" value="'+product.restNumber+'"/>';
			html +='<img src="'+product.productSimg+'" id="productSimg">';
			$("#hidDiv").html(html);
			
			
			$("#deta").html(product.productDeta);
			$("#spec").html(product.productSpecing);
			
			
			
			//轮播图
			var html1 = "";
			if(product.productSimg !=null && product.productSimg != ""){
			var html1 ='<div class="swiper-slide"><img src="../productimg/'+product.productSimg+'" alt=""></div>';
			}
			if(product.productLimg !=null && product.productLimg != ""){
			html1 += '<div class="swiper-slide"><img src="../productimg/'+product.productLimg+'" alt=""></div>';
			}
			if(product.productPimg !=null && product.productPimg != ""){
			html1 += '<div class="swiper-slide"><img src="../productimg/'+product.productPimg+'" alt=""></div>';
			}
			$(".swiper-wrapper").append(html1);
			
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
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}
function initComments() {
	$.ajax({
		url : '../comments/getCommentsByProduct.do',
		data : {
			page : 1,
			rows : 5,
			'productid' : productId
		},
		datatype : 'json',
		async : false,
		success : function(data) {
			if(data.rows==null)
			{
				return;
			}
			var list = data.rows;
			
			$("#records").html(data.records);
			var htmlStr = "";
			$.each(	list,function(idex, obj) {
				htmlStr+='<ul>';
				htmlStr+='<li>';
				htmlStr+='	<b>'+obj.customerTable.customerName+'';
				var score=obj.commentsScore;
				if(score==null||score==""||score==undefined||score>5)
				{
					score=5;
				}
				for(var i=1;i<=score;i++)
				{
					htmlStr+='	<i><img src="images/xing_01.png"></i>';
				}
				htmlStr+='	<span class="fr">'+dateFormat(obj.datetime)+'</span>';
				htmlStr+='</b></li>';
				htmlStr+='<li class="b_c">';
				htmlStr+='	<b>'+obj.commentContent+'</b>';
				htmlStr+='</li>';
				htmlStr+=' </ul>';
				
				});
			
			$("#divComments").html(htmlStr);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			 alert("errorThrown"+errorThrown);
		}
	});

}
function dateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd");
}
function add(){
	var n=productId;
	var code1 = $("#restNumber"+n).val();
	if(Number(code1) <= 0){
		alert("没有库存，不允许购买。");
		return;
	}
	var kou = $(".sp_show").html();
	if(kou == null || kou == ""){
		alert("必须选择口味");
		return;
	}
	var code = $("#code"+n).val();	
	var name = $("#name"+n).val();
	var sellprice = $("#price"+n).val();
	var price = $("#price"+n).val();
	
	//价格异常
	if(price==undefined)
	{
		alert("产品已下架，不允许购买。");
		return;
	}
	var img = $("#productSimg").attr("src");
    var num=$(".xz_inp").val();
	if (typeof (cookie_val.Product) == "undefined") {
		cookie_val = { "Product": [{ "code": "" + code + "", "name": "" + name + "", "sellprice": "" + sellprice + "", "price": "" + price + "", "img": "" + img + "", "num": "" + num + "","restNumber":""+code1+"","kou":""+kou+""}] };
		//alert(name);
		 $.JSONCookie(COOKIE_NAME, cookie_val, { path: '/', expires: 1 });
    }
     if (!IsExistsInCookie(code)) {
         var json = { "code": "" + code + "", "name": "" + name + "", "sellprice": "" + sellprice + "", "price": "" + price + "", "img": "" + img + "", "num": "" + num + "" ,"restNumber":""+code1+"","kou":""+kou+""};
         cookie_val.Product.push(json); //添加
         $.JSONCookie(COOKIE_NAME, cookie_val, { path: '/', expires: 1 });
         alert("加入购物车成功");
     }else{
     	//修改
     	alert("商品已加入购物车");
     } 
     
}
function IsExistsInCookie(code) {
    var flag = false;
    for (var i = 0; i < cookie_val.Product.length; i++) {
        var p = cookie_val.Product[i];
        if (p.code == code ) {//存在
            flag = true;
            break;
        }
    }
    return flag;
}
function minusProduct() {
	var q = $("#txtProductQuantity").val();
	if (q >= 2) {
		$("#txtProductQuantity").val(q - 1);
	}

}
function addProduct() {
	$("#txtProductQuantity").val(parseInt($("#txtProductQuantity").val()) + 1);
}


function hd(){
	$('#bas').css('display', '');
	$('#mask').css('display', '');
}

function sh(){
	$('#bas').css('display', 'block');
	$('#mask').css('display', 'block');
}

function getKW(){
	$.ajax({
		url : '../taske/getKW.do',
		type: 'post',
		data : 'productId=' + productId,
		datatype : 'json',
		async : false,
		success : function(data) {
			var obj = data.list;
			var html = "";
			$.each(obj, function(i, item) {		
				html += '<li>'+item.taskeName+'</li>';
			});
			$("#kw").html(html);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
	$.ajax({
		url : '../productPrice/findKou.do',
		type: 'post',
		data : {productId:productId,kou:city},
		datatype : 'json',
		async : false,
		success : function(data) {
			var obj = data.object;
			$("#productPrice").html("￥"+obj.productPrice);
			/*var o = obj.kou.split(",");
			var html = "";
			for (i=0;i<o.length ;i++ )    {		
				html += '<li>'+o[i]+'</li>';
			}
			$("#kw").html(html);*/
			
			var html1="";
			html1 +='<input type="hidden" id="price'+obj.productTable.productId+'" value="'+obj.productPrice+'"/>';
			$("#hidDivPrice").html(html1);
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function car(){
	window.location="carts.html";
}

function buy(){
	var n=productId;
	var code1 = $("#restNumber"+n).val();
	if(Number(code1) <= 0){
		alert("此宝贝已经被抢光啦！");
		return;
	}
	var productIds = $("#code"+n).val();
    var productPrices = $("#price"+n).val();
    var txtProductQuantity = $(".xz_inp").val();
   // alert(txtProductQuantity);
    var kou = $(".sp_show").html();
    if(kou == null || kou == ""){
		alert("必须选择口味");
		return;
	}
    var price = parseFloat(productPrices) * parseFloat(txtProductQuantity);
   // alert(price);
    $.ajax({
		type:"post",
		url : '../orderHead/save.do',
		async :false,
		data : {productIds:productId,productPrices:price,productNums:txtProductQuantity,orderTotal:price,kou:kou},
		datatype : 'json',
		success : function(data) {
			var obj = data.result;
			if(obj){
				window.location="cart_buy.html?orderNo="+data.message;
			}else{
				alert(data.message);
			}
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}