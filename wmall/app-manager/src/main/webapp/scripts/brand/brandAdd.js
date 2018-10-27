
$(document).ready(function() {
	
	initButton();
	
});

function initButton() {
	$("#save").click(function(event) {
		var brandId = $("#brandId").val();
		var brandName = $("#brandName").val();
		var brandDesc = $("#brandDesc").val();
		var sortField = $("#sortField").val();

			
		if(brandName==null||brandName==""){
			
			alert('品牌名称不能为空！');
			return;
		}
		if(brandDesc==null||brandDesc==""){
			
			alert('品牌详情不能为空！');
			return;
		}
			if(sortField==null||sortField==""){
				
				alert('分类码不能为空！');
				return;
			}

			
					$.ajax({
					url : 'save.do',
					data : {
						brandId : brandId,
						brandName : brandName,
						brandDesc : brandDesc,
						sortField : sortField
							},
							datatype : 'json',
							cache : false,
							type : "post",
							success : function(data) {
								if(data.result){
									alert("保存成功");
									location.href = "index.do";
								}else{
									alert("保存失败");
								}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
									alert("失败");
							}
					});
		})
}



