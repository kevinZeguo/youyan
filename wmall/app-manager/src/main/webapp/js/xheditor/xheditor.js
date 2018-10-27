$(document).ready(function() {
		//初始化xhEditor编辑器插件
		$('#content').xheditor({
		    //editorRoot:'/shop/admin/js/xheditor/',
			tools:'simple',
			skin:'default',
			upMultiple:true,
			upImgUrl: "../upload/image.do",
			upImgExt: "jpg,jpeg,gif,bmp,png",
			onUpload:insertUpload,
			html5Upload:false
		}); 
		//xbhEditor编辑器图片上传回调函数
		function insertUpload(msg) {  
			var _msg = msg.toString();
		        //插入图片到编辑器
		        $("#content").append(_msg);

		}
		//处理服务器返回到回调函数的字符串内容,格式是JSON的数据格式.
		function Substring(s){
			return s.substring(s.substring(0,s.lastIndexOf("/")).lastIndexOf("/"),s.length);
		}  
	 });