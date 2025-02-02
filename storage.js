function getData(UUID) {
	const data = JSON.parse(Deno.readTextFileSync("data.json"));
	if (!data.users[UUID]) {
		data.users[UUID] = {
			UUID: UUID,
		};
	}
	const userData = data.users[UUID];

	return userData;
}

function saveData(UUID) {
}
