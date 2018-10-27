///<summary>获得字符串实际长度，中文2，英文1</summary>
///<param name="str">要获得长度的字符串</param>
///使用：alert(myUtil.GetLength('测试测试ceshiceshi'));
var myUtil = {};
myUtil.GetLength = function(str) {
	var realLength = 0, len = str.length, charCode = -1;
	for ( var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128)
			realLength += 1;
		else
			realLength += 2;
	}
	return realLength;
};

// 校验是否正整数
function isDigit(s) {
	var patrn = /^[0-9]{1,20}$/;
	if (!patrn.exec(s))
		return false;
	return true;
}
// 校验是否有1-2位小数的正实数
function isNumber(s) {
	var pattern = /^[0-9]*(\.[0-9]{1,2})?$/;
	if (!(s.match(pattern))) {
		return false;
	} else {
		return true;
	}
}
// 校验邮政编码
function isPostalCode(s) {
	var patrn = /^[0-9]{6}/;
	if (!patrn.exec(s))
		return false;
	return true;
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
 * Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
 * Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
 * Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
 * Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
		"H+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	var week = {
		"0" : "/u65e5",
		"1" : "/u4e00",
		"2" : "/u4e8c",
		"3" : "/u4e09",
		"4" : "/u56db",
		"5" : "/u4e94",
		"6" : "/u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
								: "/u5468")
								: "")
								+ week[this.getDay() + ""]);
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};


/**
 * 两个时间相比较；
 * @param beginTime -- 字符型；如 8:30
 * @param endTime -- 字符型；如 12:30
 */
function timeCompare(beginTime, endTime) {
	var aBegin = beginTime.split(":");
	var aEnd = endTime.split(":");
	var beginHour = 0;
	var beginMinute = 0;
	var endHour = 0;
	var endMinute = 0;
	if (aBegin.length!=undefined && aBegin.length!=null && aBegin.length==2) {
		beginHour = parseInt(aBegin[0]);
		beginMinute = parseInt(aBegin[1]);
	}
	if (aEnd.length!=undefined && aEnd.length!=null && aEnd.length==2) {
		endHour = parseInt(aEnd[0]);
		endMinute = parseInt(aEnd[1]);
	}
	return (endHour - beginHour) * 60 + (endMinute - beginMinute);
}

/**
 * 检查输入是否为数字
 * 1、不可有2个小数点
 * 2、小数点后最多2位有效数字
 * @param id
 * @returns {Boolean}
 */
function checkMoney(id) {
	var pattern = /^[0-9]*(\.[0-9]{1,2})?$/;
	var limitV = $("#" + id).val();
	if (!(limitV.match(pattern))) {
		//$("#" + id).val(limitV.replace(/[^0-9.]/g, ""));
		$.ligerDialog.warn("金额格式不正确，只能是数字，且小数点后最多两位有效数字。");
		return false;
	} else {
		return true;
	}
}

/**
 * 过滤掉数据的千位分隔符
 */
function unMoneyFormat(id) {
	var v = $("#" + id).val();
	var x = v.split(',');
//	var returnV = parseFloat(x.join(""));
	var returnV = x.join("");
	if (parseFloat(returnV) == 0){
		$("#" + id).val("0.00");
	} else {
		$("#" + id).val(returnV);
	}
	
}

/**
 * 金額数据格式化
 * 
 * @param obj
 */
function moneyFormat(id) {
	var v = $("#" + id).val();
	var newStr = "";
	var count = 0;
	if (v.indexOf(".") == -1) {
		for ( var i = v.length - 1; i >= 0; i--) {
			if (count % 3 == 0 && count != 0) {
				newStr = v.charAt(i) + "," + newStr;
			} else {
				newStr = v.charAt(i) + newStr;
			}
			count++;
		}
		v = newStr + ".00";
		$("#" + id).val(v);
	} else {
		for ( var i = v.indexOf(".") - 1; i >= 0; i--) {
			if (count % 3 == 0 && count != 0) {
				newStr = v.charAt(i) + "," + newStr;
			} else {
				newStr = v.charAt(i) + newStr;
			}
			count++;
		}
		v = newStr
				+ (v + "00").substr((v + "00").indexOf("."), 3);
		$("#" + id).val(v);
	}
}