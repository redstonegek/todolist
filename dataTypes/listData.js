import { readJsonFile, writeJsonFile } from "../utils/fileUtil.js";
// "listId": {
// 		"name": "string",
// 		"user": "userId",
// 		"ids": [
// 			"taskId"
// 		]
// 	}
export class listData {
	id;
	IDlists = [];
	name = "";
	user = "";
	file;
	manager;
	constructor(id, manager) {
		this.id = id;
		this.manager = manager;
		this.file = `data/list/${id}.json`;
		this.readFile();
	}

	readFile() {
		const json = readJsonFile(this.file);
		this.IDlists = json.ids ? json.ids : [];
		this.name = json.name ? json.name : "";
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
