import dotenv from "dotenv";
import JWT from "./JWT";

dotenv.config();

const token = JWT.create({ id: 1, name: "bob" }, 86400);

const invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImJvYiIsImV4cCI6IjE2ODIxODA3NTc4NjQwMCJ9.Ijvvv71cdTAwMTXvv73vv73cpDZNXHUwMDFmYe-_ve-_vXzvv73am--_vWRxQlx1MDAxMdsa1x1MDAxddsaxe-_ve-_vTPvv70qTFx1MDAxNe-_vV0i";
console.log(token);
console.log(JWT.verify(token));
console.log(JWT.extractPayload(token));

console.log("**********INVALID_TOKEN***********");
console.log(invalidToken);
console.log(JWT.verify(invalidToken));
console.log(JWT.extractPayload(invalidToken));
