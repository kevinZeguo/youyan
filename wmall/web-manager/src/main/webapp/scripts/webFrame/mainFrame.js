var tab = null;
var accordion = null;
var tree = null;
var changePwdWin = null;
$(function ()
{

    //布局
    $("#layout1").ligerLayout({
    	allowBottomResize: false,
    	allowTopResize: false,
    	bottomHeight:'28',
    	leftWidth: 200,
    	height: '100%',
    	onHeightChanged: f_heightChanged });
    var height = $(".l-layout-center").height();

    //Tab
    $("#framecenter").ligerTab({ height: height });

    var treeObj = {checkbox: false,slide: false,nodeWidth: 150,attribute: ['nodename', 'url'],onSelect: treeOnSelect};

    $.ajax({
		url : getContextPath('/userMenu/getUserMenuList.do'),
		data : '',
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			var list = data.list;
			var menuHTML="";
			var tree_ids = new Array();
            var start = 0;
            $.each(list, function (i, item) {
				var treeid = 'tree' + item.vMenuID;
				if(item.level==1){
                    if(menuHTML!= ""){
                        menuHTML += "</ul>";
                        menuHTML += "</div>";
                    }
					menuHTML += "<div title='" + item.vMenuName + "' >";
					menuHTML += "<ul id='"+treeid+"' style='margin-top:3px;'>";
				}else{
					menuHTML += "<li url='"+item.vUrl+"'><span>"+item.vMenuName+"</span></li>";
				}
				tree_ids.push(treeid);
			});
            menuHTML += "</ul>";
            menuHTML += "</div>";
			$('#accordion1').append(menuHTML);
			$("#accordion1").ligerAccordion({ height: height - 24, speed: null });
			$.each(tree_ids, function (i, item) {
				$('#' + item).ligerTree(treeObj);
			});

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("获取用户菜单失败");
		}
	});

    //面板


    $(".l-link").hover(function ()
    {
        $(this).addClass("l-link-over");
    }, function ()
    {
        $(this).removeClass("l-link-over");
    });
    tab = $("#framecenter").ligerGetTabManager();
    accordion = $("#accordion1").ligerGetAccordionManager();
    tree = $("#tree1").ligerGetTreeManager();
    $("#pageloading").hide();

});
function treeOnSelect(node){
	if (!node.data.url) return;
	var tabid = $(node.target).attr('tabid');
	if (!tabid){
		tabid = new Date().getTime();
		$(node.target).attr('tabid', tabid);
	}
	f_addTab(tabid, node.data.text, node.data.url);
}
function f_heightChanged(options)
{
    if (tab)
        tab.addHeight(options.diff);
    if (accordion && options.middleHeight - 24 > 0)
        accordion.setHeight(options.middleHeight - 24);
}
function f_addTab(tabid,text, url)
{
    tab.addTabItem({ tabid : tabid,text: text, url: url });
}


function f_selectTab(tabid, title, url){
	if(tab.isTabItemExist(tabid)){
		tab.selectTabItem(tabid);
	}else if(tabid == 'home'){
		f_addTab(tabid,title, url);
	}
}




function f_getHeight(){
	return $(".l-layout-center").height()-154;
}

function quit(){
	if(window.confirm('你确定要退出吗？')){
		 window.location=getContextPath("/user/quit.do");
		 return true;
     }else{
         return false;
    }
}
function buildSelectQB(selobj,groupId){
	$.ajax({
		url : getContextPath('/mb/buildSelect.do'),
		data : {mbGroupId:groupId},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			var dataobj = eval(data);
			var html = "<option value='999'>全部</option>";
			$.each(dataobj, function (i, item) {
				html += "<option value='"+item.mbId+"'>"+item.mbName+"</option>";
			});
			selobj.append(html);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}
function buildSelect(selobj,groupId,defaultV){
	$.ajax({
		url : getContextPath('/mb/buildSelect.do'),
		data : {mbGroupId:groupId},
		datatype : 'json',
		cache : true,
		type : "post",
		success : function(data) {
			var dataobj = eval(data);
			var html = "";
			$.each(dataobj, function (i, item) {
				html += "<option value='"+item.mbId+"' ";
				if(typeof(defaultV) != "undefined"){
					if(item.mbId == defaultV){
						html += " selected='selected' ";
					}
				}
				html += ">"+item.mbName+"</option>";
			});
			selobj.append(html);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function getSelect(groupId){
	var result = "";
	$.ajax({
		url : getContextPath('/mb/buildSelect.do'),
		data : {mbGroupId:groupId},
		datatype : 'json',
		cache : true,
		async: false,
		type : "post",
		success : function(data) {
			var dataobj = eval(data);
		
			$.each(dataobj, function (i, item) {
				result += item.mbId + ':' + item.mbName + ";";
			});
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
	return result;
}

function buildRegionQB(selobj){
	$.ajax({
		url : getContextPath('/recManage/region/buildSelect.do'),
		data : {id:name},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			var dataobj = eval(data);
			var html = "<option value='999'>全部</option>";
			$.each(dataobj, function (i, item) {
				html += "<option value='"+item.id+"'>"+item.name+"</option>";
			});
			selobj.append(html);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}
function buildRegion(selobj,defaultV){
	$.ajax({
		url : getContextPath('/recManage/region/buildSelect.do'),
		data : {id:name},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			var dataobj = eval(data);
			var html = "";
			$.each(dataobj, function (i, item) {
				html += "<option value='"+item.id+"' ";
				if(typeof(defaultV) != "undefined"){
					if(item.id == defaultV){
						html += " selected='selected' ";
					}
				}
				html += ">"+item.name+"</option>";
				
		
			});
			selobj.append(html);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}
