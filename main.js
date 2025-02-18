import { DataManager } from "./data.js";
import { SafeFileReader } from "./SafeFileReader.js";

const dataManager = new DataManager();
const reader = new SafeFileReader("page", "/404.html");

Deno.serve((req) => {
	const url = new URL(req.url);

	const qerry = url.pathname.split("/");
	// todo: find qerry
	if (qerry[1] == "api") {
		return handleDataReq(req);
	}
	return handlePageReq(req);
});

function handlePageReq(req) {
	const url = new URL(req.url);
	return new Response(reader.readFile(url.pathname));
}

function handleDataReq(req) {
	// check data type and use right handle
	const method = req.method; // get or post, delete
	const url = new URL(req.url);
	const qerry = url.pathname.split("/");
	const body = req.json();

	return dataManager.handleDataReq(method, qerry, body)
}
