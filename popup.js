chrome.tabs.getSelected(null, function(tab) { 
    search_entries(tab.url, function(entry){
	$('#list').append($('<li></li>').html($('<a></a>').attr({href: entry.link, target: '_blank'}).text(entry.desc)));
    });
})
