function makeNewList(listId, name = "") {
	const box = makeListDiv(document.getElementById("todoListGrid"), listId);
	makeListInput(box, listId, name);
	makeListButton(box, listId);
	return box;
}

function makeListDiv(parent, listId) {
	const box = document.createElement("div");
	box.className = "todoList";
	box.id = listId;
	const button = parent.lastElementChild;
	parent.insertBefore(box, button);
	return box;
}

function makeListInput(parent, listId, name) {
	const input = document.createElement("input");
	input.value = name;
	input.className = "listInput";
	parent.appendChild(input);
	input.onblur = () => {
		save();
	};
}
function makeListButton(parent, listId) {
	const button = document.createElement("button");
	button.innerText = "new task";
	button.className = "listButton";
	button.onclick = () => {
		newTask(listId, `tsk${Date.now()}`);
	};
	parent.appendChild(button);
}
