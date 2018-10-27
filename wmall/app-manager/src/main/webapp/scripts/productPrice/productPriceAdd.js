var manager = null;
$(function() {
	
	// 构建城市列表树
	$("#tree1").ligerTree(myligerTree);
	manager = $("#tree1").ligerGetTreeManager();
	manager.collapseAll();

	// 初始化按钮
	$("#pageAdd").click(addTR);
	
	$("#save").click(save);
});

var selectCity = new Array();

function addTR(){
	$('#formTable').append(getSelectData());
}

function getSelectData(){
	var notes = manager.getChecked();
	if(notes.length <= 0){
		alert('请选择城市信息！');
		return;
	}
	var productName = $("#productId").find("option:selected").text(); 
	var productId = $('#productId').val();
	
	var row = "";
	var html = "";
    for (var i = 0; i < notes.length; i++)
    {
    	row = productId + "." + notes[i].data.text;
    	
    	if(isEmpty(row,false) && !isLeaf(notes[i])){
    		html += "<tr id='"+row+"'>";
    		html += "<td>" + productName + "</td>";
    		html +=	"<td>" + notes[i].data.text + "</td>";
    		html += "<td>" + "<input type='text' />" + "</td>";
    		html += "<td>" + "<input type='button' onclick='delData(\""+row+"\",this)' value='删除' />" + "</td>";
    		html += "</tr>";
    		selectCity.push(row);
    	}
    }
    return html;
}
function isEmpty(sCity,isDel){
	var is = true;
	$.each(selectCity,function (index,city){
		if(sCity == city){
			if(isDel){
				selectCity.splice(index, 1);
			}
			is = false;
			return ;
		}
	});
	return is;
}
function delData(rowId,obj){
	$(obj).parent().parent().remove();
	isEmpty(rowId,true);
}

function isLeaf(node){
	if(node.data.children){
		return node.data.children.length > 0;
	}
	return false;
}

function save(){
	
	var isCheck = false;
	
	var _list = [];
	
	var _id = "";
	var _v = "";
	
	$("#formTable").find("tr").each(function(idx,item){ 
		
		_id = $(this).attr("id");
		_v = $(this).children('td').eq(2).find("input").val();
		
		if(_v == ''){
			alert('请输入城市：' + _id + ",对应的价格信息！");
			isCheck = true;
			return false;
		}
		if(!checkRate(_v)){
			alert('城市：' + _id + ",请输入数字类型！");
			isCheck = true;
			return false;
		}
		
		_list[idx] = _id + "." + _v;
	});
	if(isCheck){
		return ;
	}
	
	$.ajax({
		url :"newSave.do",
		data : {cityCost : _list.toString()},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			if(data.result){
				alert(data.message);
				location.reload();
			}else{
				alert(data.message);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
	
}
function checkRate(nubmer)
{
    var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字   
    return re.test(nubmer);
}


