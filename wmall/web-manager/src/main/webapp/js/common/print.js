// 设置网页打印的页眉页脚为空
function PageSetup_Null() {
	try {
		var HKEY_Root, HKEY_Path, HKEY_Key;
		HKEY_Root = "HKEY_CURRENT_USER";
		HKEY_Path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
		var Wsh = new ActiveXObject("WScript.Shell");
		HKEY_Key = "header";
		Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
		HKEY_Key = "footer";
		Wsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, "");
	} catch (e) {
		alert(e);
	}
}