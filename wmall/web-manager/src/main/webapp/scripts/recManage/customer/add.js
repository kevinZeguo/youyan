var trLength = 0;
var tb = document.getElementById("receiptAddress");

$(document).ready(function() {
	// initGridAddCustomer();
	initButtonAddCustomer();
	// initSelect();
});
function getCondition() {
	var code = $("#code").val();
	var ajaxData = {
		code : code
	};
	return ajaxData;
}


function initGridAddCustomer() {
	var ajaxData = getCondition();
	jQuery("#listreceiptAddress").jqGrid({
		url : getContextPath("/recManage/customer/listreceiptAddress.do"),
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum : 10,
		data : ajaxData,
		// height : 250,
		// width : 400,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : true,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : [ 'ID', '省', '市', '县', '收货地', '详细地址' ],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "100",
			align : 'center',
			hidden : true
		}, {
			name : 'address_province',
			index : 'address_province',
			width : "100",
			align : 'center',
			sortable : false
		}, {
			name : 'address_city',
			index : 'address_city',
			width : "100",
			align : 'center',
			sortable : false
		}, {
			name : 'address_county',
			index : 'address_county',
			width : "100",
			align : 'center',
			sortable : false
		}, {
			name : 'receiptplace_id',
			index : 'receiptplace_id',
			width : "100",
			align : 'center',
			sortable : false
		}, {
			name : 'addressfull',
			index : 'addressfull',
			width : "100",
			align : 'center',
			sortable : false
		} ],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "收货地址列表"
	});

	// $("#listCustomer").setGridHeight(window.parent.f_getHeight());
}

$(function() {

	/*
	 * 5. 表单提交时进行校验
	 */
	$("#btnSubmit").click(function() {
		var bool = true;// 表示校验通过
		if (bool == true) {
			ajaxRegist();
		}
	});
	$("#btnCancel").click(function() {
		window.location.href = "manager.do";
	});
});
function getData() {
    var data = {};
    data["id"] = $("#id").val();
    data["name"] = $("#name").val();
    data["shortname"] = $("#shortname").val();
    data["customerTypeId"] = $("#customer_type_id  option:selected").val();
    data["areaProvince"] = $("#province  option:selected").val();
    data["areaCity"] = $("#city  option:selected").val();
    data["areaCounty"] = $("#town  option:selected").val();
    data["industry"] = $("#industry").val();
    
    data["level"] = $("#level").val();
    data["legalperson"] = $("#legalperson").val();
    
    
    data["contacts"] = $("#contacts").val();
    data["telephone"] = $("#telephone").val();
    data["salesmanId"] =$("#salesman_id  option:selected").val();
    data["currency"] = $("#currency").val();
    data["bank"] = $("#bank").val();
    data["account"] = $("#account").val();
    data["regionId"] = $("#Region_id  option:selected").val();    

    var receiptList = new Array();
    var i = 0;
    
    $("#receiptAddress").find("tr").each(function () {
        var idx = $(this).attr("id");
        var prod = {};
        prod["addressProvince"] = $("#provinceId" + idx).val();
        prod["addressCity"] = $("#cityId" + idx).val();
        prod["addressCounty"] = $("#townId" + idx).val();
        prod["receiptplaceId"] = $("#regionid" + idx).val();
        prod["addressfull"] = $("#address" + idx).val();
      
        //console.log(prod);
        receiptList[i] = prod;
        i++;
    });
    data["receiptList"] = receiptList;
    return data;
}
function ajaxRegist() {
	 var data = getData();
	
	$.ajax({
		url : "saveRec.do",// 要请求的servlet
		 data: {data: JSON.stringify(data)},
		type : "POST",
		dataType : "json",
		async : false,
		cache : false,
		success : function(data) {
			window.location.href = "manager.do";
		}
	});
}


function add() {
	var tb = document.getElementById("receiptAddress");
	var returnValue = window.showModalDialog(
			getContextPath("/recManage/customer/address.do"), window);

	if (!returnValue) {
		returnValue = window.returnValue;
	}
	var strs = new Array();
	strs = returnValue.split("%%");
	var provinceId = '-1';
	var provinceName = '';

	var cityId = '-1';
	var cityName = '';

	var townId = '-1';
	var townName = '';

	var regionid = '';
	var regionName = '';

	var address = '';
	for (j = 0; j < strs.length; j++) {
		provinceId = strs[0];
		provinceName = strs[1];
		cityId = strs[2];
		cityName = strs[3];
		townId = strs[4];
		townName = strs[5];
		receiptplaceId = strs[6];
		receiptplaceName = strs[7];
		address = strs[8];

	}
	var mytr = tb.insertRow();
	trLength=tb.rows.length-1;
	mytr.setAttribute("id",  trLength);
	var mytd_1 = mytr.insertCell();
	var mytd_2 = mytr.insertCell();
	var mytd_3 = mytr.insertCell();
	var mytd_4 = mytr.insertCell();
	var mytd_5 = mytr.insertCell();
	var mytd_6 = mytr.insertCell();
	mytd_1.innerHTML = "<input type='checkbox' name='ck' id='ck" + trLength + "'/>";
	mytd_2.innerHTML = "<input type='hidden' name='provinceId" + trLength
			+ "' id='provinceId" + trLength + "' value='" + provinceId
			+ "'/><input type='text' name='provinceName" + trLength
			+ "' id='provinceName" + trLength + "' value='" + provinceName
			+ "' disabled='disabled' />";
	mytd_3.innerHTML = "<input type='hidden' name='cityId" + trLength
			+ "' id='cityId" + trLength + "' value='" + cityId
			+ "'/><input type='text' name='cityName" + trLength
			+ "' id='cityName" + trLength + "' value='" + cityName
			+ "' disabled='disabled'/>";
	mytd_4.innerHTML = "<input type='hidden' name='townId" + trLength
			+ "' id='townId" + trLength + "' value='" + townId
			+ "'/><input type='text' name='townName" + trLength
			+ "' id='townName" + trLength + "' value='" + townName
			+ "' disabled='disabled'/>";
	mytd_5.innerHTML = "<input type='hidden' name='receiptplaceId" + trLength
			+ "' id='receiptplaceId" + trLength + "' value='" + receiptplaceId
			+ "'/><input type='text' name='receiptplaceName" + trLength
			+ "' id='receiptplaceName" + trLength + "' value='" + receiptplaceName
			+ "' disabled='disabled'/>";
	mytd_6.innerHTML = "<input type='text' name='address" + trLength
			+ "' id='address" + trLength + "' value='" + address
			+ "' disabled='disabled'/>";
	trLength++;
}

function deletes() {
	var tb = document.getElementById("receiptAddress");
	var ok = document.getElementsByName("ck");
	for ( var k = 0; k < ok.length; k++) {
		if (ok[k].checked == true) {
			tb.deleteRow(k+1);
			k = k - 1;
		}
	}
}