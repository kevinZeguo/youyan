/*  使iframe自适应高度
//使用方式：
<iframe id="iframepage" name="iframepage" scrolling="no" src="Index.aspx" frameborder="0"
	style="padding: 0px; width: 100%; height: 1000px;"></iframe>
 startInitIframe('iframepage', 560,0);
 不需要设置宽度：startInitIframe('iframepage', 560,-1);
 */
var times = 0;
var timer;
var browserVersion = window.navigator.userAgent.toUpperCase();
var isOpera = false, isFireFox = false, isChrome = false, isSafari = false, isIE = false;
function reinitIframe(iframeId, minHeight, minWidth) {
	times++;
	if (times > 2) {
		//clearInterval(timer);
	}
	try {
		var iframe = document.getElementById(iframeId);
		var bHeight = 0;
		var bWidth = 0;
		if (isChrome == false && isSafari == false) {
			bHeight = iframe.contentWindow.document.body.scrollHeight;
			bWidth = iframe.contentWindow.document.body.scrollWidth;
		}

		var dHeight = 0;
		var dWidth = 0;
		if (isFireFox == true) {
			dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
			dWidth = iframe.contentWindow.document.documentElement.offsetWidth + 2;
		} else if (isIE == false && isOpera == false) {
			dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
			dWidth = iframe.contentWindow.document.documentElement.scrollWidth;
		} else if (isIE == true && !-[ 1, ] == false) {
		} // ie9+
		else {
			bHeight += 3;
			bWidth += 3;
		}

		var height = Math.max(bHeight, dHeight);
		// alert(bWidth+"--------"+dWidth);
		var rwidth = Math.max(bWidth, dWidth);
		if (height < minHeight)
			height = minHeight;
		if (rwidth < minWidth)
			rwidth = minWidth;

		iframe.style.height = height + "px";
		if (minWidth != -1) {
			// alert(iframeId+width);
			//iframe.style.width = rwidth-20 + "px";
		}
		//iframe.style.width = rwidth + "px";
	} catch (ex) {
	}
}
function startInitIframe(iframeId, minHeight, minWidth) {
	isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
	isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
	isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
	isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
	if (!!window.ActiveXObject || "ActiveXObject" in window)
		isIE = true;
	timer = window.setInterval("reinitIframe('" + iframeId + "'," + minHeight
			+ "," + minWidth + ")", 100);

}