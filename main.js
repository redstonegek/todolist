import { SafeFileReader } from "./SafeFileReader.js";
import { UserData } from "./dataTypes/userData.js";

const reader = new SafeFileReader("page", "/404.html");
const user = new UserData("test", "");

Deno.serve((req) => {
	const url = new URL(req.url);
	return new Response(reader.readFile(url.pathname));
});

function handlePageReq(req) {
	const url = new URL(req.url);
	return new Response(reader.readFile(url.pathname));
}

function handleDataReq(req) {
	// check data type and use right handle
}
