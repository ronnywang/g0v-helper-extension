var popup_function = function(entry){
    if (!document.body) {
	return;
    }
    // 確認有沒有 #G0vEntryInfo 的下方視窗
    if (!document.getElementById('G0vEntryInfo')) {
	var content = "<div id='G0vEntryInfo' style='max-height: 20%; overflow-y: scroll; background: #cc103f; bottom: 0; padding: 5px; text-align: left; z-index: 99999; font-size: 14.5px; line-height: 1.5; color: #fff; position: fixed'>"
	    + "<ul id='G0vInfoMessage' style='list-style-type: disc'></ul>"
	    + "<div style='color:#fff;font-weight:bold;float:right;padding-right:8px;width:46px;'>"
	    + "<span id='G0vInfoClose' style='cursor:pointer;'>關閉</span>"                
	    + "</div></div>";
	document.body.innerHTML = content + document.body.innerHTML;
	var close = document.getElementById('G0vInfoClose');
	if (!close) {
	    // 可能是沒有 <body>, 用 <frameset> 的網站造成的問題
	    return;
	}

	close.addEventListener('click',function() {
	    document.getElementById('G0vEntryInfo').style.display = 'none';
	});

	var info_dom = document.getElementById('G0vEntryInfo');
	info_dom.style.background = 'yellow';
	info_dom.style.color = 'black';
    }

    var content = '';
    content += '<li>';
    content += '<a href="' + htmlspecialchars(entry.link) + '" target="_blank">' + htmlspecialchars(entry.desc) + '</a> - ' + htmlspecialchars(entry.link);
    content += '</li>';
    document.getElementById('G0vInfoMessage').innerHTML += content;
};


function onRequest(request, sender, sendResponse) {
    if (request.method== 'page') {
        // 顯示設定G0v小幫手的 page action
        chrome.pageAction.show(sender.tab.id);
    }

    if (request.method == 'add_match') {
        chrome.tabs.executeScript(sender.tab.id, {code: "(" + popup_function + ')(' + JSON.stringify(request.entry) + ')'});
    }

    // Return nothing to let the connection be cleaned up.
    sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
