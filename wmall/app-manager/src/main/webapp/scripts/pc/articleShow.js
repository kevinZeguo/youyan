$(function(){
	initUI();
});
function initUI() {
	var vtype = $("#type").val();
	if (vtype == "x") {
		$("#trVideo").show();
	}  else {
		$("#trVideo").hide();
	}
}