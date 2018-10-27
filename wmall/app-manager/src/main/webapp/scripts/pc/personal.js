$(document).ready(function() {
	$('.menu_b ul').click(function(event) {
		//event.preventDefault();
		var erc = event.target;
		var href = $(erc).attr('href');
		if (!href) {
			return;// 点击的不是a返回
		}
		$('.active').removeClass('active');
		$(erc).addClass('active');
	});
	
});

function setFrame(obj,title) {
	$('#hTitle').html(title);
	$('#rightFramepage').attr("src", $(obj).attr("htmlurl"));
	//iFrameHeight();
}