function newTask(listId, taskId, name = "", done = false) {
	const task = makeTaskDiv(document.getElementById(listId), taskId);
	makeTaskInput(task, name);
	makeTaskCheckbox(task, done);
	makeTaskDeleteButton(task, listId);
	return task;
}

function makeTaskDiv(parent, taskId) {
	const task = document.createElement("div");
	task.id = taskId;
	task.className = "task";
	parent.appendChild(task);

	return task;
}

function makeTaskInput(parent, name) {
	const input = document.createElement("input");
	input.value = name;
	input.className = "taskInput";
	parent.appendChild(input);
	input.onblur = () => {
		save();
	};
}

function makeTaskCheckbox(parent, done) {
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.className = "taskCheckbox";
	checkbox.checked = done;
	parent.appendChild(checkbox);
	checkbox.onclick = () => {
		save();
	};
}

function makeTaskDeleteButton(parent, listId) {
	const button = document.createElement("button");
	button.className = "deleteButton";
	button.innerText = "x";
	button.onclick = () => {
		document.getElementById(listId).removeChild(parent);
		save();
	};
	parent.appendChild(button);
}
