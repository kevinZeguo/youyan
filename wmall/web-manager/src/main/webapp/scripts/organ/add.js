$(function() {
	initSelect();
	initButton();
});
function initButton(){
	$('#saveBtn').click(submitData);
	$("#resetBtn").click(function(event) {
        window.location = getContextPath("/organ/manager.do");
    });
	
	var combo1 = $("#parentId").ligerComboBox({
		width:200,
        resize: true,
        absolute: true,
        selectBoxWidth: 200,
        selectBoxHeight: 300, 
        valueField: 'orgId', treeLeafOnly: false, readonly:false,
        tree: { url:"tree.do",nodeWidth: 200,checkbox: false, idFieldName: 'orgId',textFieldName:'orgName',parentIDFieldName:"parentId"},
        onSelected: function (newvalue)
    	{
    		$('#parentId').val(newvalue);
    	}
    }); 
	$("div[class=l-box-select-inner]").height("300px");
}


function initSelect() {
}


function submitData(){
	if(validate()){
		$.ajax({
			url:"save.do",//要请求的servlet
			data:$('#form1').serialize(),//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				var result=data.status;
				if(result=='OK'){
					alert("保存成功");
					window.location.href="manager.do";
				}else{
					alert("保存失败");
				}
			}
		});
	}
}
function validate(){
	if($('#orgName').val() == ''){
		alert('请输入机构名称！');
		return false;
	}
	return true;
}
