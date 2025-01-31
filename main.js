import { SafeFileReader } from "./SafeFileReader.js";

const reader = new SafeFileReader("page", "/404.html");

Deno.serve((req) => {
    const url = new URL(req.url);
    return new Response(reader.readFile(url.pathname))
});


function handlePageReq(req) {
    const url = new URL(req.url);
    return new Response(reader.readFile(url.pathname))
}

function handleDataReq(req) {
    // check data type and use right handle
}


