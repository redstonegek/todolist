export function writeJsonFile(path, json) {
	const text = JSON.stringify(json);
	Deno.writeTextFileSync(path, text);
}

export function readJsonFile(path) {
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
