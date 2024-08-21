const fs = require("fs");
const axios = require("axios");

const url = "http://localhost:5273/swagger/v1/swagger.json";
const path = "./swagger-provisioning.json";

async function download() {
  const response = await axios.get(url);
  fs.writeFileSync(path, JSON.stringify(response.data, null, 4));
}

async function dowload_file() {
  const _swagger = fs.readFileSync(path, "utf8");
  const swagger = JSON.parse(_swagger);
  const response = await fetch("https://generator3.swagger.io/api/generate", {
    headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Linux"',
      Referer: "https://editor-next.swagger.io/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: JSON.stringify({
      lang: "typescript-angular",
      type: "CLIENT",
      spec: swagger,
    }),
    method: "POST",
  });

  // Response its application/octet-stream we need to save on file
  const buff = await response.arrayBuffer();
  const buffer = Buffer.from(buff);
  fs.writeFileSync("./typescript-angular-client-generated.zip", buffer);
}

async function main() {
  await download();
  await dowload_file();
}

main();
