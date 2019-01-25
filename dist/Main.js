"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const User_Router_1 = require("./Routers/User.Router");
const app = express_1.default();
app.use(body_parser_1.default.json());
// // create logging middleware
// app.use((req, res, next) => {
//     console.log(`request was made with url: ${req.path}
//     and method: ${req.method}`);
//     next(); // will past the request on to the search for the next piece for the next piece of(pass on to the next middleware)
// });
app.use('/project0', User_Router_1.userRouter);
app.listen(3000);
console.log('application started on port: 3000');
//# sourceMappingURL=Main.js.map