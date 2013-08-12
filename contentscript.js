var main = function(){
    chrome.extension.sendRequest({method: 'page'}, function(response){});

    //search_package_by_name(params.name, function(package_id, rows){
    search_entries(document.location.href, function(entry){
	chrome.extension.sendRequest({method: 'add_match', entry: entry}, function(response) {});
    });
};

main();
