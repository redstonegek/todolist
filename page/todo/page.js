makeData();
function makeData() {
	// fetch("data.json")
	const data = JSON.parse(localStorage.getItem("data"));
	for (const listId in data) {
		if (!Object.prototype.hasOwnProperty.call(data, listId)) continue;
		const list = data[listId];
		const listElment = makeNewList(listId, list.name);
		for (const taskId in list.tasks) {
			if (!Object.prototype.hasOwnProperty.call(list.tasks, taskId)) continue;
			const task = list.tasks[taskId];
			listElment.appendChild(newTask(listId, taskId, task.name, task.done));
		}
	}
}

if (!localStorage.UUID) localStorage.UUID = `usr${Date.now()}`

window.addEventListener("resize", gridSize);
gridSize()
function gridSize() {
	const itemSize = 275;
	const windowSize = innerWidth
	const items = Math.floor(windowSize / (itemSize + 25))
	let template = ""
	for (let i = 0; i < items; i++) {
		template += `${itemSize}px `
	}
	const grid = document.getElementById("todoListGrid");
	grid.style['grid-template-columns'] = template

}

function save() {
	const data = {}
	const grid = document.getElementById("todoListGrid");
	grid.childNodes.forEach(list => {
		if (list.nodeName != "DIV") return;
		const listId = list.id;
		const name = list.childNodes[0].value
		data[listId] = {
			name: name,
			tasks: {}
		}
		list.childNodes.forEach(task => {
			if (task.nodeName != "DIV") return;
			const taskId = task.id;
			const done = task.childNodes[1].checked
			const name = task.childNodes[0].value
			if (name == "") return;
			data[listId].tasks[taskId] = {
				name: name,
				done: done
			}
		});
	});
	localStorage.setItem("data", JSON.stringify(data));
}
document.getElementById("newList").onclick = () => {
	makeNewList(`lst${Date.now()}`);
};