var usersArray = [];

const targetNode = document.body;
const config = {attributes: true, childList: true, subtree: true};

const callback = function(matationsList, observer){
	// if(document.URL == 'https://vk.com/im')
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
		    		hideDialog(user);//Hide user from dialog list
		    		hideFriend(user);//Hide user from friends list
					hideFastChat(user);//Hide user from fast chat list
					hideMessageIndicator();//Hide indicator
		    	}
		    }
    	}
    });
}

function hideDialog(user){
	if(document.URL == 'https://vk.com/im'){
		document.querySelectorAll('[data-list-id="' + user.id + '"]')[0].style.display = 'none';
		
		//Huyarim
		//document.getElementsByClassName('_im_dialog_unread_ct')[0].innerHTML
	}
}

function hideFriend(user){
	if(document.URL == 'https://vk.com/friends'){
		var friend = document.getElementById('friends_user_row' + user.id);
		friend.style.display = 'none';
	}
}
function hideFastChat(user){
	var fc_avatar = document.getElementById('chat_tab_icon_' + user.id);
	if(fc_avatar)
		fc_avatar.style.display = 'none';
	var friend = document.getElementById('fc_contact' + user.id);
	if(friend)
		friend.style.display = 'none';
}

function hideMessageIndicator(){
	// document.getElementsByClassName('left_count_wrap')[0].style.display = 'none !important';
}