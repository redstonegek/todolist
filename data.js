import { UserData } from "./dataTypes/userData.ts";

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

export class dataManager {
	instances = {};
	getInstances(id) {
		if (this.instances[id]) {
			return this.instances[id];
		}
	}
	getObj(id, Recursive = false) {
		const type = getType(id);
		switch (type) {
			case "user":
				break;
			default:
				break;
		}
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
