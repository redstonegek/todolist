

export class UserData {
    id
    lists = []
    file
    manager
    constructor(id, manager) {
        this.id = id
        this.manager = manager
        this.file = `data/user/${id}.json`
        this.readFile()
    }

    readFile() {
        // TODO: read file if it exist
    }

    update() {
        // TODO: update the object with the data that was given
    }

    getObj(Recursive = false) {
        let list = {}
        if (Recursive) {
            this.lists.forEach(listId => {
                list[listId] = this.manager.getObj(listId, true)
                // TODO: call all lists and get their data
            });
        } else {
            list = this.lists
        }
        const user = {
            id: this.id,
            lists: list
        }
        return
    }

    save() {
        // write this object to the file(creating it if needed)
    }

}