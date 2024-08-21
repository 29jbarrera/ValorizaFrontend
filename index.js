const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const SwaggerParser = require("@apidevtools/swagger-parser");
const Ajv = require("ajv");
const { writeFileSync } = require("fs");

const ajv = new Ajv();
ajv.addFormat("int32", {
  type: "integer",
  validate: (x) => Number.isInteger(x) && x >= -2147483648 && x <= 2147483647,
});
// date-time format
ajv.addFormat("date-time", {
  type: "string",
  validate: (x) => {
    if (typeof x !== "string") return false;
    return !isNaN(Date.parse(x));
  },
});
ajv.addFormat("date", {
  type: "string",
  validate: (x) => {
    if (typeof x !== "string") return false;
    return !isNaN(Date.parse(x));
  },
});
// Double format
ajv.addFormat("double", {
  type: "number",
  validate: (x) => typeof x === "number" && !isNaN(x),
});

// uuid format
ajv.addFormat("uuid", {
  type: "string",
  validate: (x) =>
    typeof x === "string" &&
    x.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    ),
});

// Función para validar respuestas contra el esquema
async function validateResponse(url, method, expectedSchema) {
  try {
    const response = await axios({ method, url });

    expect(response.status).to.equal(200);
    if (response.status !== 200) {
      return;
    }

    // // Validar el esquema usando AJV
    const valid = ajv.validate(expectedSchema, response.data);

    if (!valid) {
      // console.log(`Validation errors for ${url}:`, ajv.errors);
      // console.log(response.data['results'][0])
      return {
        valid: false,
        errors: ajv.errors,
      };
    } else {
      // console.log(`Response from ${url} is valid.`);
      return {
        valid: true,
        errors: null,
      };
    }
  } catch (error) {
    // console.error(`Error testing ${url}:`, error.message);
    return {
      valid: false,
      errors: error.message,
    };
  }
}

// Función para analizar el Swagger y validar todas las rutas GET
async function testApiWithSwagger(swaggerPath) {
  try {
    console.log("Parsing Swagger file:", swaggerPath);
    // Analizar el archivo Swagger
    const api = await SwaggerParser.validate(swaggerPath);

    api.host = api.host || "http://10.243.53.212:5051";
    api.basePath = api.basePath || "";
    const response_lines = [];
    // Iterar sobre cada ruta y método
    for (const path in api.paths) {
      for (const method in api.paths[path]) {
        if (method.toLowerCase() === "get") {
          const endpoint = `${api.host}${api.basePath}${path}`;
          if (endpoint.includes("{")) {
            continue;
          }

          // if (!endpoint.includes("v2/amortizacionHistorico")) {
          //   continue;
          // }
          // console.log(`Testing ${method} ${endpoint}`);
          // Obtener el esquema de respuesta esperado
          const responses = api.paths[path][method].responses;
          const schema =
            responses["200"] &&
            responses["200"]["content"]["application/json"].schema;
          //   console.log(responses["200"]);
          if (schema) {
            // Validar la respuesta para cada endpoint GET
            const check = await validateResponse(endpoint, method, schema);
            response_lines.push({ ...check, endpoint });
            // console.log(check);
          }
        }
      }
    }

    writeFileSync("errors.json", JSON.stringify(response_lines, null, 2));
  } catch (error) {
    console.error("Error parsing Swagger file:", error.message);
  }
}

// Llama a la función principal con la ruta o URL del archivo Swagger
testApiWithSwagger("swagger.json");
