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
	delCell.innerHTML = '<span id="removeUser" userId="' + rowData.id + '">&times;</span>'
}

// chrome.storage.sync.get(['customName'], function(result){
// 	customNameBox.checked = result.customName;
// });


//Events
let addUserInput = document.getElementById('addUserInput');
addUserInput.addEventListener('keydown', function(e){
	if(e.keyCode == 13){
		var user = makeUserSettings(addUserInput.value)
		usersArray.push(user);

		chrome.storage.sync.set({'usersArray': usersArray}, function(){
			console.log('Value is set to storage');
		});
	}
});

let removeBtn = document.getElementById('removeUser');
removeBtn.addEventListener('click',function(e){

});

// ctrlEntBox.addEventListener('change', function(e){
// 	var checkValue = ctrlEntBox.checked;
// 	chrome.storage.sync.set({'ctrlEnterGen': checkValue}, function(){
// 		console.log('Value is set to storage');
// 	});
// });
// customNameBox.addEventListener('change', function(e){
// 	var checkValue = customNameBox.checked;
// 	chrome.storage.sync.set({'customName': checkValue}, function(){
// 		console.log('Value is set to storage');
// 	});
// });
// 
function makeUserSettings(id, flag){
	return{id, flag};
}

