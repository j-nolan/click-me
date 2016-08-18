oEvent.nGuid = 1;
oEvent.fnFix.preventDefault = function()
{
	this.returnValue = false;
}
oEvent.fnFix.stopPropagation = function()
{
	this.cancelBubble = true;
}
if (!window.addListener)
{
	document.onreadystatechange = function()
	{
		if (window.onload && window.onload != oEvent.fnHandle)
		{
			oEvent.fnAdd(window, 'load', window.onload);
			window.onload = oEvent.fnHandle;
		}
	}
}

window.onload = function(e) {
	var cookie = oCookie.fnRead("style");
	var title = cookie ? cookie : oStyle.fnGetPreferredSheet();
	oStyle.fnSetSheet(title);
	oStart.fnInitAll();
}

window.onunload = function(e) {
  var title = oStyle.fnGetSheet();
  oCookie.fnWrite("style", title, 365);
}

var cookie = oCookie.fnRead("style");
var title = cookie ? cookie : oStyle.fnGetPreferredSheet();
oStyle.fnSetSheet(title);