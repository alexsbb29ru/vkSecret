var usersArray = [];

chrome.storage.sync.get(['usersArray'], function(result){
	if(result.usersArray && result.usersArray.length > 0){
		usersArray = result.usersArray;
		for(var i = 0; i < result.usersArray.length; i ++){
    		var user = result.usersArray[i];
    		addRow('usersTable', i + 1, user)
    	}
	}
});

function addRow(tableId, rowInd, rowData){
	var usersTable = document.getElementById('usersTable');
	var userRow = usersTable.insertRow(rowInd);
	var userCell = userRow.insertCell(0);
	var delCell = userRow.insertCell(1);

	userCell.innerHTML = '<p>' + rowData.id + '</p>';
	delCell.innerHTML = '<span id="'+ rowData.id +'" class="removeUser" userId="' + rowData.id + '">&times;</span>';

	var removeBtn = document.getElementById(rowData.id);
	removeBtn.addEventListener('click', function(e){
		var index = usersArray.indexOf(removeBtn.attributes['userId'].value);
		usersArray.splice(index, 1);
		pushUsersArray('Value is removed from storage');
	});
}

//Events
let addUserInput = document.getElementById('addUserInput');
addUserInput.addEventListener('keydown', function(e){
	if(e.keyCode == 13){
		var user = makeUserSettings(addUserInput.value)
		usersArray.push(user);

		pushUsersArray('Value is set to storage');
	}
});

// let removeBtns = document.getElementsByClassName('removeUser');
// for(btn of removeBtns){
// 	btn.addEventListener('click',function(e){
// 		var index = usersArray.indexOf(btn.attributes['userId'].value);
// 		usersArray.splice(index, 1);
// 		pushusersArray();
// 	});
// }

function pushUsersArray(message){
	chrome.storage.sync.set({'usersArray': usersArray}, function(){
		console.log(message);
	});
}

function makeUserSettings(id, flag){
	return{id, flag};
}

