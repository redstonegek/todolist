// "userId": {
//         "ids": [
//             "listId"
//         ]
//     }
export class UserData {
	id;
	IDlists = [];
	file;
	manager;
	constructor(id, manager) {
		this.id = id;
		this.manager = manager;
		this.file = `data/user/${id}.json`;
		this.readFile();
	}

	readFile() {
		const json = readJsonFile(this.file);
		this.IDlists = json.ids;
		//TODO:parse json to userdate object
	}

	update() {
		// TODO: update the object with the data that was given
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
			ids: this.IDlists
		}
		// write this object to the file(creating it if needed)
	}
}

function writeJsonFile(path, json) {
	
}

function readJsonFile(path) {
	Deno.createSync(path);
	const text = Deno.readTextFileSync(path);
	if (text == "") {
		return {};
	}
	try {
		return JSON.parse(text);
	} catch (_error) {
		console.log("failed to load json file: " + path);

		return {};
	}
}
