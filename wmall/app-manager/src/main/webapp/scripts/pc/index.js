$(document).ready(function(e) {
	if ($("#hidLoginName").val() == "") {
		//没登录
		$("#divLogin").show();
	} else {
		//已登录
		$("#divLogin").hide();
	}
	initArticle3();
	initArticle1();
	initCase();
	$('#owl-demo').owlCarousel({
		items: 1,
		autoPlay: true
	});
	$("#loginSubmit").click(function() {
		doLogin();
	});
});
//酵素知识
function initArticle3()
{
	$.ajax({
		url : '../article/getArticlePage.do',
		data : {
			page : 1,
			rows : 3,
			'vType' : '3',
			'vGuideType' : ""
		},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			$("#ulAticle3").html("");
			var article = data.object.result;
			var showContent = "";
			$.each(article,function(idex, obj) {
					showContent += '<li>';
					showContent += '<span><img src="'+obj.vAttacchment+'"/></span>';
					showContent += '<span class="name">'+obj.vTitle+'</span>';
					showContent += '<a href="../article/articleShow3.do?ID='+obj.ID+'"><p>'+obj.vBrief+'</a></p>';
					showContent += '</li>';
				});
			$("#ulAticle3").append(showContent);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}
//优研百科
function initArticle1()
{
	$.ajax({
		url : '../article/getArticlePage.do',
		data : {
			page : 1,
			rows : 4,
			'vType' : '1',
			'vGuideType' : ""
		},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			$("#ulAticle1").html("");
			var article = data.object.result;
			var showContent = "";
			$.each(article,function(idex, obj) {
					showContent += '<li><span><i class="iconfont">&#xe60e;</i><a href="../article/articleShow3.do?ID='+obj.ID+'">'+obj.vTitle+'</a></span><label>'+ dateFormat(obj.vCreateDate)+'</label></li>';
				});
			$("#ulAticle1").append(showContent);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}
//积分排行
function initCase()
{
	$.ajax({
		url : '../casecustomer/listOrder.do',
		data : {
			page : 1,
			rows : 10,
			sidx : 'caseValue',
			sord : 'desc'
		},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			$("#ulCase").html("");
			var list = data.rows;
			var showContent = "";
			$.each(list,function(idex, obj) {
				var vclass="";
				if(idex<3){
					vclass='class="cur"';
				}
				showContent += '<li '+vclass+'><a href="#"><i>'+(idex+1)+'</i><span>'+obj.customerName+'</span><label>'+Math.round(obj.caseValue)+'分</label></a></li>';
				});
			$("#ulCase").append(showContent);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(textStatus);
		}
	});
}
function dateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd");
}

function doLogin() {
	var loginName = $("#loginName").val();
	var loginPass = $("#loginPass").val();
	$.ajax({
		url : "../pc/ajaxLogin.do",// 要请求的servlet
		data : {
			loginName : loginName,
			loginPass : loginPass
		},
		type : "POST",
		dataType : "json",
		async : false,
		cache : false,
		success : function(data) {
			
			if (data.result==false) {// 如果校验失败
				//
				alert(data.message);
			}else{
				alert("您已经登录成功");
				window.location.href = "../pc/mainIndex.do";
			}
		}
	});
}
function toRegist() {
	window.location.href = "../pc/regist.do";
}
