$(document).ready(function() {
});


	
	function save(){
		var customerId = $("#customerId").val();
		var customerName = $("#customerName").val();
		var agentTypeId = $("#agentTypeId  option:selected").val();
		var customerCode = $("#customerCode").val();
		var customerLevelId = $("#customerLevelId").val();
		var postcode = $("#postcode").val();
		//var customerArea = $("#customerArea").val();
		var customerArea=$('#loc_province').select2('data').text + ',' + $('#loc_city').select2('data').text + ',' +  $('#loc_town').select2('data').text ;
		if($("#loc_province").select2('data').text=="省份"){
			customerArea = $("#area").val();
		}
		var customerIndu = $("#customerIndu").val();
		var customerLegal = $("#customerLegal").val();
		var mobilephone = $("#mobilephone").val();
		var businessLicenceNo = $("#businessLicenceNo").val();
		var businessLicenceImg = $("#businessLicenceImg").val();
		var linkman = $("#linkman").val();
		var email = $("#email").val();
		var contractNo = $("#contractNo").val();
		var wechatId = $("#wechatId").val();
		var wechatName = $("#wechatName").val();
		var bankNo = $("#bankNo").val();
		var bankName = $("#bankName").val();
		var parentId = $("#parentId").val();
		var customerTypeId = $("#customerTypeId").val();
		var address = $("#address").val();
		alert(agentTypeId);
		if(customerName==null||customerName==""){
			
			alert('经销商名称不能为空，请输入！');
			return;
		}		
		
		
		var result=checkCard(postcode);//身份证校验
		if(!result){
			return;
		}
		
		if(customerArea==null||customerArea==""){
			
			alert('所属地区不能为空！');
			return;
		}
		if(customerIndu==null||customerIndu==""){
			
			alert('所属行业不能为空！');
			return;
		}
		/*if(customerLegal==null||customerLegal==""){
			
			alert('法人信息不能为空！');
			return;
		}*/
		 var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
		 if (!reg.test(mobilephone)) {
			 alert("您填写的手机号码格式有误，请重新填写");
			 return;
		 };
		/* if(businessLicenceNo==null||businessLicenceNo==""){
			 
			 alert('营业执照号不能为空！');
			 return;
		 }		 
		 if(businessLicenceNo==null||businessLicenceNo==""){
			 
			 alert('营业执照号不能为空！');
			 return;
		 }		*/ 
		 if(businessLicenceImg==null||businessLicenceImg==""){
			 
			 alert('营业执照照片必须上传！');
			 return;
		 }		 
		 if(linkman==null||linkman==""){
			 
			 alert('联系人姓名不能为空！');
			 return;
		 }		 
		 if(contractNo==null||contractNo==""){
			 
			 alert('合同编号不能为空！');
			 return;
		 }		 
			if(bankNo==null||bankNo==""){
				
				alert('银行卡号不能为空！');
				return;
			}
			
			
			
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			 if (!filter.test(email)) {
				 alert("您的电子邮件格式不正确，请重新填写");
				 return;
			 };
			 
			$.ajax({
				url:"save.do",
				data:{customerId:customerId,customerName:customerName,customerTypeId:customerTypeId,customerCode:customerCode,customerLevelId:customerLevelId,
				postcode:postcode,customerArea:customerArea,customerIndu:customerIndu,customerLegal:customerLegal,
				mobilephone:mobilephone,businessLicenceNo:businessLicenceNo,businessLicenceImg:businessLicenceImg,
				linkman:linkman,email:email,contractNo:contractNo,
				wechatId:wechatId,wechatName:wechatName,bankNo:bankNo,
				bankName:bankName,parentId:parentId,customerTypeId:customerTypeId,address:address,agentTypeId:agentTypeId
				},
				type:"POST",
				dataType:"json",
				async:false,
				cache:false,
				success:function(data) {
					var customerTypeId = $("#customerTypeId").val();
					if(data.result){
						alert(data.message);
						window.location="index.do?customerTypeId="+customerTypeId;
					}else{
						alert(data.message);
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					alert("操作失败");
				}
			});

		
	
	}
	
	

	
	
	function uploadAttach() {
		
		var oFileInput = $("#fileUpload");
		var sFileFullPath = oFileInput.val();
		if (sFileFullPath == undefined || sFileFullPath == null) {
			$.ligerDialog.warn("请选择“图片”。");
			return;
		}
		if (sFileFullPath.length <= 0) {
			$.ligerDialog.warn("请选择“图片”。");
			return;
		}
		//alert(sFileFullPath);
		var fileElementId ="fileUpload";
		
		try {
			$.ajaxFileUpload({
				url : 'uploadFile.do',
				secureuri : false,
				fileElementId : fileElementId, // 文件选择框的id属性、
				data : {
					"fileElementId" : fileElementId
				},
				dataType : 'json', // 服务器返回的格式，可以是json
				success : function(data, status) {
					//alert(data.message);
					if(data.result)
					{
						$("#businessLicenceImg").val(data.message);
						alert("上传成功");
					}
				},
				error : function(data) {
					alert("上传失败");
				}
			});
		} catch (e) {
			if ($("#" + fileElementId).val() == "") {
				return;
			} else {
			}
		}
	}
	
	
	
	
	var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",  
            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",  
            33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",  
            42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",  
            51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",  
            63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"  
           };  
 
	
	
function checkCard(card)  
{  
    //是否为空  
    if(card == '')  
    {  
        alert('请输入身份证号，身份证号不能为空');  
        return false;  
    }  
    //校验长度，类型  
    if(isCardNo(card) == false)  
    {  
        alert('您输入的身份证号码不正确，请重新输入');  
        return false;  
    }  
    //检查省份  
    if(checkProvince(card) == false)  
    {  
        alert('您输入的身份证号码不正确,请重新输入');  
        return false;  
    }  
    //校验生日  
    if(checkBirthday(card) == false)  
    {  
        alert('您输入的身份证号码生日不正确,请重新输入');  
        return false;  
    }  
    //检验位的检测  
    if(checkParity(card) == false)  
    {  
        alert('您的身份证校验位不正确,请重新输入');  
        return false;  
    }  
    return true;  
};  
  
  
//检查号码是否符合规范，包括长度，类型  
isCardNo = function(card)  
{  
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;  
    if(reg.test(card) == false)  
    {  
        return false;  
    }  
  
    return true;  
};  
  
//取身份证前两位,校验省份  
checkProvince = function(card)  
{  
    var province = card.substr(0,2);  
    if(vcity[province] == undefined)  
    {  
        return false;  
    }  
    return true;  
};  
  
//检查生日是否正确  
checkBirthday = function(card)  
{  
    var len = card.length;  
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
    if(len == '15')  
    {  
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;   
        var arr_data = card.match(re_fifteen);  
        var year = arr_data[2];  
        var month = arr_data[3];  
        var day = arr_data[4];  
        var birthday = new Date('19'+year+'/'+month+'/'+day);  
        return verifyBirthday('19'+year,month,day,birthday);  
    }  
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
    if(len == '18')  
    {  
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;  
        var arr_data = card.match(re_eighteen);  
        var year = arr_data[2];  
        var month = arr_data[3];  
        var day = arr_data[4];  
        var birthday = new Date(year+'/'+month+'/'+day);  
        return verifyBirthday(year,month,day,birthday);  
    }  
    return false;  
};  
  
//校验日期  
verifyBirthday = function(year,month,day,birthday)  
{  
    var now = new Date();  
    var now_year = now.getFullYear();  
    //年月日是否合理  
    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)  
    {  
        //判断年份的范围（3岁到100岁之间)  
        var time = now_year - year;  
        if(time >= 3 && time <= 100)  
        {  
            return true;  
        }  
        return false;  
    }  
    return false;  
};  
  
//校验位的检测  
checkParity = function(card)  
{  
    //15位转18位  
    card = changeFivteenToEighteen(card);  
    var len = card.length;  
    if(len == '18')  
    {  
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
        var cardTemp = 0, i, valnum;   
        for(i = 0; i < 17; i ++)   
        {   
            cardTemp += card.substr(i, 1) * arrInt[i];   
        }   
        valnum = arrCh[cardTemp % 11];   
        if (valnum == card.substr(17, 1))   
        {  
            return true;  
        }  
        return false;  
    }  
    return false;  
};  
  
//15位转18位身份证号  
changeFivteenToEighteen = function(card)  
{  
    if(card.length == '15')  
    {  
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
        var cardTemp = 0, i;     
        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);  
        for(i = 0; i < 17; i ++)   
        {   
            cardTemp += card.substr(i, 1) * arrInt[i];   
        }   
        card += arrCh[cardTemp % 11];   
        return card;  
    }  
    return card;  
}; 
