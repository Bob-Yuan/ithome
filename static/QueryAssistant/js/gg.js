var url = document.URL, str = window.navigator.userAgent;
var hostname = document.location.hostname;
if(typeof m_url == 'undefined' || url.indexOf('#mobile')> -1){

}else{
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsMB = sUserAgent.match(/mobile/i) == "mobile";
	var bIsSB = sUserAgent.match(/symbianos/i) == "symbianos";
	var bIsTc = sUserAgent.match(/touch/i) == "touch";
	var bIsIM = sUserAgent.match(/iemobile/i) == "iemobile";
	var bIsIP = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsMB || bIsSB || bIsIM || bIsIP || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		window.location.href = m_url;
	}
}