/*
  * Ok, here we go!
*/
var oStart =
{
	fnInitAll : function ()
	{
		oCJS.fnSetAttribute(document.getElementById('styles').getElementsByTagName('a'), 'href', '#');
		var oLink;
		for (var nX = 0; oLink = document.getElementById('styles').getElementsByTagName('a')[nX]; nX++)
			oCJS.fnSetAttribute(oLink, 'click', oStyle.fnInit);
		oEvent.fnAdd(document, 'click', oClickMe.fnAddMsg);
		if (document.getElementById('clickMeForm'))
			document.getElementById('clickMeForm').style.display = 'none';
		if (document.getElementById('clickMe'))
			setInterval('oClickMe.fnUpdate();',5000);
	}
}
var oCJS =
{
	aDhtmlEvents :
		['abort',
		'blur',
		'change',
		'click',
		'dblclick',
		'focus',
		'keydown',
		'keypress',
		'keyup',
		'load',
		'mousedown',
		'mousemove',
		'mouseover',
		'mouseout',
		'mouseup',
		'reset',
		'select',
		'submit',
		'unload'],
	fnSetAttribute : function (mElement, sAttribute, sValue)
	{
		var aTest = new Array();
		aTest = mElement;
		if (!(aTest.length > 0))
			mElement[0] = mElement;
		for (var nX = 0; mElement[nX]; nX++)
			if (!this.fnIsEvent(sAttribute))
				mElement[nX].setAttribute(sAttribute, sValue);
			else
				oEvent.fnAdd(mElement[nX], sAttribute, sValue);
	},
	fnIsEvent : function (sAttribute)
	{
		var sEvent;
		for (var nX = 0; sEvent = this.aDhtmlEvents[nX]; nX++)
			if (sEvent == sAttribute)
				return true;
		return false;
	}
}
var oStyle =
{
	fnInit : function ()
	{
		var sStyle = new String(this.firstChild.nodeValue);
		oStyle.fnSetSheet(sStyle.trim());
	},
	fnSetSheet : function (sTitle)
	{
		var oLink;
		for (var nX = 0; oLink = document.getElementsByTagName('link')[nX]; nX++)
		{
			if (oLink.getAttribute('rel').indexOf('style') != -1
			&& oLink.getAttribute('title'))
			{
				oLink.disabled = true;
				if (oLink.getAttribute('title') == sTitle)
					oLink.disabled = false;
			}
		}
	},
	fnGetSheet : function ()
	{
		var oLink;
		for (var nX = 0; oLink = document.getElementsByTagName('link')[nX];nX++)
		{
			if (oLink.getAttribute('rel').indexOf('style') != -1
			&& oLink.getAttribute('title')
			&& !oLink.disabled)
				return oLink.getAttribute('title');
		}
		return null;
	},
	fnGetPreferredSheet : function ()
	{
		var oLink;
		for (nX = 0; oLink = document.getElementsByTagName('link')[nX]; nX++)
		{
			if (oLink.getAttribute('rel').indexOf('style') != -1
			&& oLink.getAttribute('rel').indexOf('alt') == -1
			&& oLink.getAttribute('title'))
				return oLink.getAttribute('title');
		}
		return null;
	}
};
var oCookie =
{
	fnWrite : function (sName, sValue, nDays)
	{
		if (nDays)
		{
			var oDate = new Date();
			oDate.setTime(oDate.getTime() + (nDays*24*60*60*1000));
			var sExpDate = '; expires=' + oDate.toGMTString();
		}
		else
			sExpDate = '';
		document.cookie = sName + '=' + sValue + sExpDate + '; path=/';
	},
	fnRead : function (sName)
	{
		sName = sName + '=';
		var aSplit = document.cookie.split(';');
		var sPart;
		for (var nX = 0; sPart = aSplit[nX]; nX++)
		{
			while (sPart.charAt(0) == ' ')
				sPart = sPart.substring(1, sPart.length);
			if (sPart.indexOf(sName) == 0)
				return sPart.substring(sName.length, sPart.length);
		}
		return null;
	}
};
oEvent =
{
	nGuid : 1,
	fnAdd : function (oElement, sType, fnHandler)
	{
		if (oElement.addListener)
			oElement.addListener(sType, fnHandler, false);
		else
		{
			if (!fnHandler.$$guid)
				fnHandler.$$guid = oEvent.nGuid++;
			if (!oElement.events)
				oElement.events = {};
			var aHandlers = oElement.events[sType];
			if (!aHandlers)
			{
				aHandlers = oElement.events[sType] = {};
				if (oElement['on' + sType])
					aHandlers[0] = oElement['on' + sType];
				oElement['on' + sType] = oEvent.fnHandle;
			}
			aHandlers[fnHandler.$$guid] = fnHandler;
		}
	},
	fnRemove : function (oElement, sType, fnHandler)
	{
		if (oElement.removeEventListener)
			oElement.removeEventListener(sType, fnHandler, false);
		else if (oElement.events
		&& oElement.events[sType]
		&& fnHandler.$$guid)
			delete oElement.events[sType][fnHandler.$$guid];
	},
	fnHandle : function (event)
	{
		event = event || oEvent.fnFix(window.event);
		var bReturnValue = true;
		var aHandlers = this.events[event.type];
		for (var nX in aHandlers)
		{
			if (!Object.prototype[nX])
			{
				this.$$handler = aHandlers[nX];
				if (this.$$handler(event) === false)
					bReturnValue = false;
			}
		}
		if (this.$$handler)
			this.$$handler = null;
		return bReturnValue;
	},
	fnFix : function (event)
	{
		event.preventDefault = this.fnFix.preventDefault;
		event.stopPropagation = this.fnFix.stopPropagation;
		return event;
	}
}
var oClickMe =
{
	fnAddMsg : function (e)
	{
		var nX = e.offsetX /* O */ || e.layerX /* FF */ || event.x + document.body.scrollLeft /* IE */;
		var nY = e.offsetY /* O */ || e.layerY /* FF */ || event.y + document.body.scrollTop /* IE */;
		var oClickedLayer = (navigator.appName.substring(0,3) == 'Net') ? e.target : window.event.srcElement;
		if (oClickedLayer.parentNode.id == 'clickMe')
		{
			oEffects.fnFadeOpacity(oClickedLayer, true);
			return;
		}
		else if (oClickedLayer.id == 'clickMe')
			{}
		else if (oClickedLayer.id == 'clickMeForm' || oClickedLayer.id == 'msg')
			return;
		else
		{
			document.getElementById('clickMeForm').style.cssText = 'display:none;';
			return;
		}
		var oClickDiv = document.getElementById('clickMe');
		if (oClickDiv.offsetWidth)
			var nClickWidth = oClickDiv.offsetWidth;
		else if (oClickDiv.style.pixelWidth)
			var nClickWidth = oClickDiv.style.pixelWidth;
		oEffects.fnFadeOpacity(document.getElementById('clickMeForm'));
		document.getElementById('clickMeForm').style.cssText = 'display:block;left:' + (nX - 10) + 'px;top:' + (nY - 25) + 'px;';
		nX = parseInt((nX / nClickWidth) * 100);
		document.getElementById('msg').focus();
		document.getElementById('msg').select();
		document.getElementById('x').value = nX;
		document.getElementById('y').value = nY;
		oEvent.fnAdd(document.getElementById('clickMeForm'), 'submit', oClickMe.fnForward);
	},
	fnForward : function ()
	{
		var nX = document.getElementById('x').value;
		var nY = document.getElementById('y').value;
		var sMsg = document.getElementById('msg').value;
		var sSend = './json/?f=add&x=' + nX + '&y=' + nY + '&msg=' + encodeURIComponent(sMsg);
		oAjaxSys.fnLoadPage(sSend,'oClickMe.fnConfirm();');
		document.getElementById('clickMeForm').style.cssText = 'display:none';
		return false;
	},
	fnConfirm : function ()
	{
		if (oAjaxSys.oLastRequest.nX == -1)
		{
			alert(oAjaxSys.oLastRequest.sMsg);
			return false;
		}
		this.fnCreateMsgNode(oAjaxSys.oLastRequest.nId, oAjaxSys.oLastRequest.sMsg, oAjaxSys.oLastRequest.nX, oAjaxSys.oLastRequest.nY);
	},
	fnCreateMsgNode : function (nId, sText, nX, nY, nFontSize)
	{
		var oSpan = document.createElement('span');
		oSpan.id = 'm' + nId;
		oSpan.style.cssText = 'left:' + nX + '%;top:' + nY + 'px;';
		oSpan.appendChild(document.createTextNode(sText));
		oEffects.fnOpacity(oSpan, 0);
		oEffects.fnFadeOpacity(oSpan);
		document.getElementById('clickMe').appendChild(oSpan);
	},
	fnUpdate : function ()
	{
		var sLast = null;
		if (document.getElementById('clickMe').getElementsByTagName('span').length > 0)
			sLast = document.getElementById('clickMe').getElementsByTagName('span')[document.getElementById('clickMe').getElementsByTagName('span').length -1].id.substr(1);
		var sSend = './json/?f=update&last=' + sLast;
		oAjaxSys.fnLoadPage(sSend, 'oClickMe.fnUpdateConfirm();');
	},
	fnUpdateConfirm : function ()
	{
		oAjaxSys.oLastRequest
		for (var nX = 0; oAjaxSys.oLastRequest.oMsg[nX]; nX++)
			this.fnCreateMsgNode(oAjaxSys.oLastRequest.oMsg[nX].nId, oAjaxSys.oLastRequest.oMsg[nX].sMsg, oAjaxSys.oLastRequest.oMsg[nX].nX, oAjaxSys.oLastRequest.oMsg[nX].nY, oAjaxSys.oLastRequest.oMsg[nX].nSince);
	}
}
var oAjaxSys =
{
	oLastRequest : {}, // JSON Contents
	fnLoadPage : function (sUrl)
	{
		if (window.XMLHttpRequest)
			var oReq = new XMLHttpRequest();
		else if (window.ActiveXObject)
			var oReq = new ActiveXObject("Microsoft.XMLHTTP"); // Internet Explorer
		else
			return false;
		oReq.onreadystatechange = function ()
		{
			if (oReq.readyState == 4 && oReq.responseText)
			{
				oAjaxSys.oLastRequest = eval('(' + oReq.responseText + ')');
				oAjaxSys.oLastRequest.fn();
			}
		}
		oReq.open('GET',sUrl);
		oReq.send(null);
	}
};
var oEffects =
{
	fnOpacity : function (oElement, nOpacity)
	{
		nOpacity = Math.round(nOpacity * 10) / 10;
		var oElement = oElement.style;
		oElement.opacity = nOpacity;
		oElement.MozOpacity = nOpacity;
		oElement.KhtmlOpacity = nOpacity;
		oElement.filter = 'alpha(opacity=' + nOpacity * 100 + ')';
	},
	fnFadeOpacity : function (oElement, bUnFade)
	{
		if (!oElement.id)
			oElement.id = 'rand' + Math.round(Math.random() * 100);
		if (bUnFade)
		{
			for (nX = 1;nX > 0; nX -= 0.1)
				setTimeout('oEffects.fnOpacity(document.getElementById("' + oElement.id + '"), ' + nX + ');',1000 * (1 - nX));
			setTimeout('document.getElementById("' + oElement.id + '").style.display = "none"', 1000);
		}
		else
			for (nX = 0;nX < 1; nX += 0.1)
				setTimeout('oEffects.fnOpacity(document.getElementById("' + oElement.id + '"), ' + nX + ');',1000 * nX);
	}
}