import { readJsonFile, writeJsonFile } from "../utils/fileUtil.js";
// "taskId": {
// 		"list": "listId",
// 		"name": "string",
// 		"done": "bool"
// 	}
export class taskData {
	id;
	list = "";
	name = "";
	done = false;
	file;
	manager;
	constructor(id, manager) {
		this.id = id;
		this.manager = manager;
		this.file = `data/task/${id}.json`;
		this.readFile();
	}

	readFile() {
		const json = readJsonFile(this.file);
		this.IDlists = json.ids ? json.ids : [];
		//TODO:test for data
	}

	update(json, type) { //type = post, or delete
		// TODO: update the object with the data that was given
	}

	addID(id) {
		//TODO:check if id is not yet added
		this.IDlists.push(id);
		this.save();
	}

	removeID(id) {
		const i = this.IDlists.indexOf(id);
		if (i > -1) {
			this.IDlists.splice(i, 1);
		}

		this.save();
	}

	getObj(Recursive = false) {
		let list = {};
		if (Recursive) {
			this.IDlists.forEach((listId) => {
				list[listId] = this.manager.getObj(listId, true);
			});
		} else {
			list = this.IDlists;
		}
		const user = {
			id: this.id,
			lists: list,
		};
		return user;
	}

	save() {
		const json = {
			ids: this.IDlists,
		};
		writeJsonFile(this.file, json);
		// write this object to the file(creating it if needed)
	}
}
