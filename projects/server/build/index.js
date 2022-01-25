var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// projects/server/src/index.ts
var import_http = __toESM(require("http"));

// projects/server/src/config.ts
function nonNull(x) {
  if (x === void 0) {
    return false;
  }
  if (x === null) {
    return false;
  }
  if (isNaN(x)) {
    return false;
  }
  return true;
}
function parseParamValue(spec) {
  const defaultVal = spec.defaultValue;
  const envVal = process.env[spec.env];
  if (nonNull(envVal)) {
    return spec.parseFn.call(void 0, envVal);
  }
  return defaultVal;
}
function readConfigParam(name, spec) {
  const value = parseParamValue(spec);
  return { name, value };
}
function entries(obj) {
  return Object.entries(obj);
}
function readConfig(spec) {
  return entries(spec).map(([name, spec2]) => readConfigParam(name, spec2)).reduce((acc, curr) => {
    acc[curr.name] = curr.value;
    return acc;
  }, {});
}

// projects/server/src/index.ts
var configSpec = {
  "httpPort": {
    parseFn: parseInt,
    env: "XRAY_HTTP_PORT",
    defaultValue: 3001
  },
  "httpHost": {
    defaultValue: "localhost"
  }
};
var { httpPort, httpHost } = readConfig(configSpec);
var server = import_http.default.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("okay");
});
server.listen(httpPort, httpHost, () => {
  console.log("listening ", httpHost, httpPort);
});
//# sourceMappingURL=index.js.map
