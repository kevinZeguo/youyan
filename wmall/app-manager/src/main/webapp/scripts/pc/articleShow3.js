$(function(){
	initArticle1();
});
//优研百科
function initArticle1()
{
	$.ajax({
		url : '../article/getArticlePage.do',
		data : {
			page : 1,
			rows : 6,
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
					showContent += '<li>'+obj.vTitle+'</li>';
				});
			$("#ulAticle1").append(showContent);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}