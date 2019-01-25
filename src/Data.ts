import { userinfo, reimbursement } from "./Models/User";


export let userInfoArr: userinfo[] = [
    new userinfo(0,'testfm','password',undefined,undefined,undefined,'finance-manager'),
    new userinfo(1,'testad','password',undefined,undefined,undefined,'admin'),
    new userinfo(2,'test2','password0',undefined,undefined,undefined,undefined),
    new userinfo(3,'test3','password1',undefined,undefined,undefined,undefined),
    new userinfo(4,'test4','password2',undefined,undefined,undefined,undefined),
    new userinfo(5,'test5','password3',undefined,undefined,undefined,undefined),
];

export let reimbursementInfoArr: reimbursement[] = [];