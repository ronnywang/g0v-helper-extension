var api_server = 'http://helper.g0v.ronny.tw';

var get_saved_entries = function(cb){
    chrome.storage.local.get({save_entries: null, last_fetch: null}, function(items){
	var now = Math.floor((new Date()).getTime() / 1000);

	if (null !== items.save_entries && items.last_fetch > now - 30) {
	    return cb(items.save_entries);
	}

	if (null === items.save_entries) {
	    items.last_fetch = 0;
	}

	$.get(api_server + '/index/data?time=' + parseInt(items.last_fetch), function(ret){
	    if (ret.status == 1) {
		chrome.storage.local.set({save_entries: ret.data, last_fetch: now}, function(){
		    cb(ret.data);
		});
	    } else {
		chrome.storage.local.set({last_fetch: now}, function(){
		    cb(items.save_entries);
		});
	    }
	}, 'json');

    });
};

var search_entries = function(url, cb){
    get_saved_entries(function(entries){
	for (var i = 0; i < entries.length; i ++) {
	    if (url.match(entries[i].match)) {
		cb(entries[i]);
	    }
	}
    });
};

var htmlspecialchars = function(str){
    var span_dom = document.createElement('span');
    span_dom.innerText = str;
    str = span_dom.innerHTML;
    delete(span_dom);
    return str;
};
