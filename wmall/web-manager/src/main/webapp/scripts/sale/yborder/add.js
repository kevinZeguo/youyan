$(function() {
	initSelect();
	initButton();
});
function initButton(){
	$('#BtnAddRow').click(addRow);
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

function addRow(){
	var html = "<tr>";
	
	html += "<td height='30' align='center'><input type='text' /></td>";
	html += "<td align='center'><input type='text' /></td>";
	html += "<td align='center'><input type='text' size='5' /></td>";
	html += "<td align='center'><input type='text' size='5' /></td>";
	html += "<td align='center'><input type='text' size='5' /></td>";
	html += "<td align='center'><input type='text' size='5' /></td>";
	html += "<td align='center'><input type='text' size='5' /></td>";
	html += "<td align='center'><input type='text' size='15' class='Wdate' onfocus=\"WdatePicker({skin:'whyGreen',minDate: '2006-09-10', maxDate: '2090-12-20' })\" /></td>";
	html += "<td align='center'><button class='l-button' type='button' onclick='delData(this);'>删除</button></td>";
    addTr(html);
}
function addTr(html){
	$('#productAdd').append(html);
}
function delData(clickTd){
	var tr = $(clickTd).parent().parent();  
    tr.remove();  
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
