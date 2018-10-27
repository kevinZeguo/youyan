$(document).ready(function(e) {
	iniUl();
	$('#ulType').click(function(event) {
		event.preventDefault();
		var erc = event.target;
		var href = $(erc).attr('href');
		if (!href) {
			return;// 点击的不是a返回
		}
		$('.active').removeClass('active');
		$(erc).addClass('active');
		initArticle($(erc).attr('id').substring(6,7));
	});
	initCase();
});
function iniUl()
{
	$('.active').removeClass('active');
	$('#liType'+$('#type').val()).addClass('active');
	initArticle($('#type').val());
}

//优研百科
function initArticle(type)
{
	$.ajax({
		url : '../article/getArticlePage.do',
		data : {
			page : 1,
			rows : 5,
			'vType' : type,
			'vGuideType' : ""
		},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			$("#ulArticle").html("");
			var article = data.object.result;
			var showContent = "";
			$.each(article,function(idex, obj) {
				showContent += '<ul>';
				showContent += '<li class="l_1">';
				showContent += '<strong>'+obj.vTitle+'</strong>';
				showContent += '	<img src="../images/m_1.png" class="fr">';
				showContent += '</li>';
				showContent += '<li>';
				showContent += '<div class="img_l fl">';
				showContent += '<img src="'+obj.vAttacchment+'">';
				showContent += '</div>';
				showContent += '<p class="fl fr">';
				showContent += '<label>摘要：</label>';
				showContent += ''+obj.vBrief+'';
				showContent += '</p>';
				showContent += '</li>';
				showContent += '<li class="l_2">';
				showContent += '<a href="../article/articleShow3.do?ID='+obj.ID+'">查看全文</a>';
				showContent += '</li>';
				showContent += '</ul>';
				});
			$("#ulArticle").append(showContent);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

//积分排行
function initCase()
{
	$.ajax({
		url : '../casecustomer/list.do',
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