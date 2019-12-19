var usersArray = [];

//Get array with users from chrome storage
chrome.storage.sync.get(['usersArray'], function(result){
	if(result.usersArray && result.usersArray.length > 0){
		usersArray = result.usersArray;
		//add row for user with button for remove this
		for(var i = 0; i < result.usersArray.length; i ++){
    		var user = result.usersArray[i];
    		addRow('usersTable', user)
    	}
	}
});

//Add new row with user to table
function addRow(tableId, rowData){
	var usersTable = document.getElementById('usersTable');
	var userRow = usersTable.insertRow(usersTable.rows.length);
	var userCell = userRow.insertCell(0); // Cell for user id
	var delCell = userRow.insertCell(1); //Cell for delete button

	userCell.innerHTML = '<p>' + rowData.id + '</p>';
	delCell.innerHTML = '<span id="'+ rowData.id +'" class="removeUser" userId="' + rowData.id + '">&times;</span>';

	//Add event to remove button. Remove note with user id
	var removeBtn = document.getElementById(rowData.id);
	removeBtn.addEventListener('click', function(e){
		//Get user's id index from array
		var index = usersArray.indexOf(rowData.id);
		//remove note
		usersArray.splice(index, 1);
		//save array to storage
		pushUsersArray('Value is removed from storage');

		var rowI = document.getElementById(rowData.id).parentElement.parentElement.rowIndex;

		usersTable.deleteRow(rowI);
	});
}

//Events
let addUserInput = document.getElementById('addUserInput');
addUserInput.addEventListener('keydown', function(e){
	if(e.keyCode == 13){
		//[A-z]*\W\/\/\w+\.[a-z]*\/.*=([0-9]*)
		var user = makeUserSettings(addUserInput.value)
		usersArray.push(user);
		addRow('usersTable', user);
		pushUsersArray('Value is set to storage');
		addUserInput.value = '';
	}
});
//Save array to storage
function pushUsersArray(message){
	chrome.storage.sync.set({'usersArray': usersArray}, function(){
		console.log(message);
	});
}
//Make new entity for user. Add new props in future
function makeUserSettings(id, flag){
	return{id, flag};
}

