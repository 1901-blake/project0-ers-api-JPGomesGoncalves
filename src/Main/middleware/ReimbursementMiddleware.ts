export function ReimbursementMiddleware(req, res, next) {
    const user = req.session.user;
    const role = req.session.role;

    if (user && req.params.userId && user.userid === +req.params.userId) {
        console.log("leaving login middleware valid user id param");
        next();
    } else if (user && role.role === 'finance-manager') {
        console.log("leaving login middleware valid role");
        next();
    } else {
        console.log("leaving login middleware invalid role");
        res.status(400);
        res.send("Invalid Role");
    }
}