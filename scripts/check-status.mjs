import fs from "node:fs";
import { assertBoard } from "./board-schema.mjs";

const inputPath = process.argv[2] ?? "product/data-model.json";
const board = JSON.parse(fs.readFileSync(inputPath, "utf8"));

assertBoard(board, inputPath);

console.log(`${inputPath} is a valid agent owner-action board`);
