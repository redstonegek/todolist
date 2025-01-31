export class SafeFileReader {
    basePath = "page"
    files = []
    notFoundFile = "/404.html"
    constructor(basePath, notFoundFile) {
        this.basePath = basePath
        this.notFoundFile = notFoundFile
        this.updateList()
    }
    updateList() {
        this.files = []
        this.getList()
    }
    getList(Path = this.basePath) {
        const array = Deno.readDirSync(Path)
        for (const file of array) {

            if (file.isFile) {
                this.files.push(Path + "/" + file.name)
            }
            else {
                this.getList(Path + "/" + file.name)
            }
        }
    }
    readFile(pathName) {
        const pathEnd = pathName.split(".")
        if (!pathEnd[1]) {
            pathName += "main.html"
        }
        if (!this.files.includes(this.basePath + pathName))
            pathName = this.notFoundFile;
        return Deno.readFileSync(this.basePath + pathName)
    }
}

