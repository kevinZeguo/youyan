$(document).ready(function() {
	$('.menu').click(function(event) {
		// event.preventDefault();
		var erc = event.target;
		var href = $(erc).attr('href');
		if (!href) {
			return;// 点击的不是a返回
		}
		$('.active').removeClass('active');
		$(erc).addClass('active');
	});

	$("#btnBuy").click(function() {
		var price=Number($("#txtProductQuantity").val())*Number($("#hidPrice").val());
		$.ajax({
			url : "../orderHead/save.do",
			data : {
				orderSource : "3",
				productIds : $("#hidProductid").val(),
				productNums : $("#txtProductQuantity").val(),
				productPrices : price
			},
			type : "POST",
			dataType : "json",
			async : false,
			cache : false,
			success : function(data) {
				if (data.status !="") {// 如果校验失败
					//
					alert("订购成功");
					var path = "../pay/aliPay.do?OrderNo="+data.status;  
					$('#payForm').attr("action", path).submit();;  

				} else {
					alert("订购失败");
				}
			}
		});
	});
	$("#btnCart").click(function() {
		alert("添加购物车成功。");
	});
});
function minusProduct() {
	var q = $("#txtProductQuantity").val();
	if (q >= 2) {
		$("#txtProductQuantity").val(q - 1);
	}

}

function addProduct() {
	$("#txtProductQuantity").val(parseInt($("#txtProductQuantity").val()) + 1);
}
