function makeFrame(id) {
	const frame = document.createElement("div");
	frame.className = "frame";
	frame.id = id;
	document.body.appendChild(frame); //TODO:fix
	return frame;
}

function makeCharDisplay(id) {
	const frame = makeFrame(id);
}
