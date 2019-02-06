export function ReimbursementMiddleware(req, res, next) {
    const user = req.session.user;
    const role = req.session.role;

    if (user && req.params.id && user.userid === +req.params.id) {
        console.log("leaving login middleware valid user id param");
        next();
    } else if (user && role.role === 'finance-manager') {
        console.log("leaving login middleware valid role");
        next();
    } else {
        console.log("leaving login middleware invalid role");
        res.send("Invalid Role");
    }
}