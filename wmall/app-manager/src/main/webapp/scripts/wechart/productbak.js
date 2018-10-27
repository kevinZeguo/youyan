var COOKIE_NAME = "Bind_Prod_List";
var cookie_val = $.JSONCookie(COOKIE_NAME);//读取json格式cookie
function GetQueryString(sProp) {
	var re = new RegExp("[&,?]" + sProp + "=([^//&]*)", "i");
	var a = re.exec(document.location.search);
	if (a == null)
		return "";
	return a[1];
}
var productid = GetQueryString("productId").toString();
var username = GetQueryString("username").toString();
var customerId = GetQueryString("customerId").toString();
$(function(){
	initUI();
	initProductInfo();
	initComments();
});
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

	$.ajax({
		url : '../product/getProdutById.do',
		data : 'productid=' + productid,
		datatype : 'json',
		async : false,
		success : function(data) {
			var product=data.object;
			if(product!=null&&product!=""&&product!=undefined)
			{
				$("#productName").html(product.productName);
				$("#standardPrice").html("￥"+product.standardPrice);
				$("#productPrice").html("￥"+product.productPrice);
				$("#standardPrice2").html("￥"+product.standardPrice);
				$("#productName2").html("商品名称："+product.productName);
				$("#productSpec").html("商品规格："+product.productSpec);
				$("#productSimg").attr("src","../productimg/"+product.productSimg);
				var html="";
				html +='<input type="hidden" id="code'+product.productId+'" value="'+product.productId+'"/>';
				html +='<input type="hidden" id="name'+product.productId+'" value="'+product.productName+'"/>';
				html +='<input type="hidden" id="price'+product.productId+'" value="'+product.standardPrice+'"/>';
				html +='<input type="hidden" id="restNumber'+product.productId+'" value="'+product.restNumber+'"/>';
				$("#hidDiv").html(html);
			}else
			{
				alert("产品信息错误。");
			}
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
			'productid' : productid
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
	var n=productid;
	var code1 = $("#restNumber"+n).val();
	if(Number(code1) <= 0){
		alert("没有库存，不允许购买。");
		return;
	}
	var code = $("#code"+n).val();	
	var name = $("#name"+n).html();
	var sellprice = $("#price"+n).val();
	var price = $("#price"+n).val();
	//价格异常
	if(price==undefined)
	{
		alert("产品已下架，不允许购买。");
		return;
	}
	var img = $("#productSimg"+n).attr("src");
    var num=1;
	if (typeof (cookie_val.Product) == "undefined") {
		cookie_val = { "Product": [{ "code": "" + code + "", "name": "" + name + "", "sellprice": "" + sellprice + "", "price": "" + price + "", "img": "" + img + "", "num": "" + 1 + "","restNumber":""+code1+""}] };
        $.JSONCookie(COOKIE_NAME, cookie_val, { path: '/', expires: 1 });
    }
     if (!IsExistsInCookie(code)) {
         var json = { "code": "" + code + "", "name": "" + name + "", "sellprice": "" + sellprice + "", "price": "" + price + "", "img": "" + img + "", "num": "" + 1 + "" ,"restNumber":""+code1+""};
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