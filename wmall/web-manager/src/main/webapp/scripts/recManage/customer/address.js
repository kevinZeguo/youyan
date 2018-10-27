$(document).ready(function() {
	initButtonAddCustomer();
});

function initButtonAddCustomer() {

	$("#btnSubmit").click(
			function(event) {
				var provinceId = $("#province  option:selected").val();
				var provinceName = $("#province  option:selected").text();

				var cityId = $("#city  option:selected").val();
				var cityName = $("#city  option:selected").text();

				var townId = $("#town  option:selected").val();
				var townName = $("#town  option:selected").text();

				var receiptplaceid = $("#receiptplace_Id  option:selected").val();
				var receiptplaceName = $("#receiptplace_Id  option:selected").text();

				var address = $("#address").val();

				var returnVal = provinceId + "%%" + provinceName + "%%"
						+ cityId + "%%" + cityName + "%%" + townId + "%%"
						+ townName + "%%" + receiptplaceid + "%%" + receiptplaceName + "%%"
						+ address;
				if (window.opener) {
					// for chrome
					window.opener.returnValue = returnVal;
				} else {
					window.returnValue = returnVal;
				}
				window.close();
			});
}
