$(document).ready(function() {
	// 初始化用户功能菜单
	
	$.ajax({
		url : '../userMenu/getUserMenuList.do',
		data : '',
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			var list = data.list;
			var isHaveDivHead=false;
			var htmlStr="";
		
			$.each(list, function (i, item) {
				
				if(item.level==1)
					{
					if (isHaveDivHead) {
						htmlStr += '</ul>';
						isHaveDivHead = false;
					}
					htmlStr += '<div class="nav_list_title"><a href="#">'
							+ item.vMenuName
							+ '</a></div>';

				} else {
					if (!isHaveDivHead) {
						htmlStr += '<ul id="hide">';
						isHaveDivHead = true;
					}
					htmlStr += ' <li><a href="#" url="'
							+ item.vUrl
							+ '">'
							+ item.vMenuName
							+ '</a></li>';
				}
			});
			$("#leftMenu").append(htmlStr);
			$('#leftMenu ul li a').click(function(){
				$('.pro_content iframe').attr("src",$(this).attr("url"));	
			});
			$('#leftMenu ul li').click(function(event) {//点击子菜单变换样式
				event.preventDefault();
				var src = event.target;
				var href = $(src).attr('href');
				if(!href){
					return; //被点击的不是A元素
				}
				$('#leftMenu ul li a').removeClass('active');
				$(src).addClass('active');
				
			});
			 $("#leftMenu ul").eq(0).show();//默认第一个菜单显示
			 $(" .nav_list .nav_list_title").click(function(){//菜单的收缩	
				 var _inde=$(".nav_list .nav_list_title").index(this);
				 $(".nav_list #hide").eq(_inde).toggle().siblings('ul').hide();				
			 }); 
			 //startInitIframe('iframepage', 560,1000);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("获取用户菜单失败");
		}
	});
});
function quit(){
	if(window.confirm('你确定要退出吗？')){
        //alert("确定");
		 window.location="../user/quit.do";
        return true;  
     }else{
        //alert("取消");
        return false;
    }
}
	function iFrameHeight() {    
		var ifm= document.getElementById("iframepage");    
		var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;    
		
		if(ifm != null && subWeb != null) { 
			var vwidth=subWeb.body.scrollWidth;
		/*	if(vwidth<890)
			{
				vwidth=890;
			}*/
				
	   	ifm.height = subWeb.body.scrollHeight; 
	   	ifm.width = vwidth; 
		}    
	} 
	
	function setFrame(obj) {
		$('#iframepage').attr("src", $(obj).attr("htmlurl"));
		//iFrameHeight();
	}