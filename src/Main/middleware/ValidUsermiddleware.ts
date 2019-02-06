export function ValidUserMiddleware(req, res, next) {
    const user = req.session.user;

    if (user) {
        console.log("leaving login middleware with valid user");
        next();
    } else {
        console.log("leaving login middleware invalid role");
        res.send("Not valid user");
    }
}