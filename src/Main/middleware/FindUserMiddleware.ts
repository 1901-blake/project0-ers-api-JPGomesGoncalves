export function FindUserMiddleware(req, res, next) {
    const user = req.session.user;
    const role = req.session.role;
    console.log('User in FindUserMiddleware: ' + user);
    console.log('User in FindUserMiddleware: ' + user);

    console.log('User seesion in FindUserMiddleware: ' + req.session.user);
    if (user) {

         if (user && role.role === 'finance-manager' || role.role === 'admin' || user.userid === +req.params.id) {
            console.log("leaving login middleware with valid role");
            next();
        } else {
            console.log("leaving login middleware with invalid role");
            res.send("Invalid Role");
        }
    }else{
        console.log('need to log in FindUserMiddleware ');
        res.send("Need to login");

    }

}