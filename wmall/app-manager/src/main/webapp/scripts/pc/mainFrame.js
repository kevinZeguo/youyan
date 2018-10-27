if (window != top)
	top.location.href = location.href;
$(document).ready(function() {
	if ($("#hidLoginName").val() == "") {
		//没登录
		$("#spName").html("");
		$("#loginbutton").show();
		$("#logistbutton").show();
		$("#btnQuit").hide();
		$("#btnEditPass").hide();
	} else {
		//已登录
		$("#spName").html($("#hidLoginName").val());
		$("#loginbutton").hide();
		$("#logistbutton").hide();
		$("#btnQuit").show();
		$("#btnEditPass").show();
	}
	$('.nav .nav_top ul li').click(function(event) {
		event.preventDefault();
		var erc = event.target;
		var href = $(erc).attr('href');
		if (!href) {
			return;// 点击的不是a返回
		}
		$('.active').removeClass('active');
		$(erc).addClass('active');
	});
	$('#iframepage').attr("src", $("#hidcontenturl").val());

	 startInitIframe('iframepage', 560,-1);
});

function setFrame(obj) {
	$('#iframepage').attr("src", $(obj).attr("htmlurl"));
	//iFrameHeight();
}

function homejump(obj) {
		var name = $("#searchcondition").val();
		$('#iframepage').attr("src", $(obj).attr("htmlurl")+"?name="+name+"&type=homejump");
}

