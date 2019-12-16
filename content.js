var usersArray = [];

const targetNode = document.body;
const config = {attributes: true, childList: true, subtree: true};

const callback = function(matationsList, observer){
	if(document.URL == 'https://vk.com/im')
		getUsersSettings();
}

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

//observer.disconnect();
//Получение всех пользователей
getUsersSettings();

function getUsersSettings(){
	chrome.storage.sync.get(['usersArray'], function(result) {
    	if(result.usersArray){
    		usersArray = result.usersArray;

    		if(usersArray.length > 0)
		    {
		    	for(var i = 0; i < usersArray.length; i ++){
		    		var user = usersArray[i];
		    		document.querySelectorAll('[data-list-id="' + user.id + '"]')[0].style.display = 'none'
		    	}
		    }
    	}
    });
}