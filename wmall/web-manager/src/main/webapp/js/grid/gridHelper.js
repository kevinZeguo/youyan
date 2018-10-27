/**
 * 使列表在刷新后仍然可以停留在当前页
 */
function reloadMyGrid(gridID) {
	// setGridParam({postData:$('#searchForm').serializeJqgrid(),page:1}).trigger("reloadGrid");
	// jQuery("#listOrder").trigger("reloadGrid");
	var param = jQuery("#"+gridID).getGridParam();
	var lastPage = parseInt(param.lastpage);

	var rowCount = $("#"+gridID).jqGrid('getGridParam', 'reccount');
	var pageNum = $("#"+gridID).jqGrid('getGridParam', 'page');
	if (rowCount != null && rowCount != undefined && parseInt(rowCount) > 0) {
		jQuery("#"+gridID).setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	} else {
		if (parseInt(pageNum) > 1 && parseInt(pageNum) == lastPage) {
			jQuery("#"+gridID).setGridParam({
				page : parseInt(pageNum) - 1
			});
		}
		jQuery("#"+gridID).setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	}
}