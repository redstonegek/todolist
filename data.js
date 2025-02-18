import { UserData } from "./dataTypes/userData.js";
import { listData } from "./dataTypes/listData.js";
import { taskData } from "./dataTypes/taskData.js";

export class DataManager {
	instances = {};
	getInstances(id) {
		if (this.instances[id]) {
			return this.instances[id];
		}
		let instances;
		switch (getType(id)) {
			case "user":
				instances = new UserData(id, this);
				break;
			case "list":
				instances = new listData(id, this);
				break;
			case "task":
				instances = new taskData(id, this);
				break;
			default:
				console.log("invaled id used");
				return null;
		}
		this.instances[id] = instances;
		return instances;
	}

	get(id, Recursive = false) {
		const instances = this.getInstances(id);
	}

	post(id, object) {
		const instances = this.getInstances(id);
	}
}

function getType(id) {
	const typeObject = {
		tsk: "task",
		lst: "list",
		usr: "user",
	};
	const shortType = id.slice(2)[0];
	return typeObject[shortType];
}

function getData(Id, Recursive = false) {
	const data = JSON.parse(Deno.readTextFileSync(`data/${getType(Id)}.json`));
	const object = data[Id];
	if (Recursive) {
		if (object.child) {
			const child = {};
			object.ids.forEach((childId) => {
				child[childId] = getData(childId, Recursive);
			});
			object.ids = child;
		}
	}
}
