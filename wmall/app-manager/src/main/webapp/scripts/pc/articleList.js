var vtype="";

$(document).ready(function() {
	vtype=$("#type").val();
	query("",1);
	
});

function query(vGuideType, vpage) {

	//$("#typeChoose").html(showTitle);
	$
			.ajax({
				url : '../article/getArticlePage.do',
				data : {
					page : vpage,
					rows : 16,
					'vType' : vtype,
					'vGuideType' : ""
				},
				datatype : 'json',
				cache : false,
				type : "post",
				success : function(data) {
					$("#ulArticle").html("");
					var article = data.object.result;
					var showContent = "";
					$
							.each(
									article,
									function(idex, obj) {
											showContent += "<li><a href='../article/articleShow.do?type="+vtype+"&ID="
													+ obj.ID
													+ "'>"
													+ obj.vTitle
													+ "</a><span>"
													+ dateFormat(obj.vCreateDate)
													+ "</span></li>";
									});
					$("#ulArticle").append(showContent);
					pageInit(vGuideType, vpage, data.object.totalPage);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
				}
			});
}

function dateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd");
}
function pageInit(vGuideType, vcurrentPage, vtotalPages) {
	$.jqPaginator('#pagination1', {
		totalPages : vtotalPages,
		visiblePages : 10,
		currentPage : vcurrentPage,
		onPageChange : function(num, type) {
			if (type == 'init') {
				return;
			}
			query(vGuideType, num);
		}
	});
}
