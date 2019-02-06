export function AdminMiddleware(req, res, next) {
    const user = req.session.user;
    const role = req.session.role;
    console.log("Entered login middleware " + req.params.id);

    // let acceptedroles = ['admin'];

    // acceptedroles.forEach(element => {
    //     if (!user) {
    //     }
    //     else if (element === role.role) {
    //         next();
    //     }
    // });

    // for (let index = 0; index < acceptedroles.length; index++) {
    //     if (!user) {
    //         break;
    //     }
    //     else if (acceptedroles[index] === role.role) {
    //         next();
    //     }
    // }

    if (user) {
        if (role.role === 'admin') {
            console.log("leaving login middleware with valid role");
            next();
        } else {
            console.log("leaving login middleware with invalid role");
            res.send("Invalid Role");
        }
    }else{
        res.send("Need to log in");
    }
}