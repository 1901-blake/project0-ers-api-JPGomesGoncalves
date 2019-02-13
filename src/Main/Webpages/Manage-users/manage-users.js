let user = JSON.parse(localStorage.getItem('session'));
console.log(user.firstname);
console.log(user);

window.onload = function () {
    // your code here
    if (user.role == 'associate') {
        let element = document.getElementById('User_button_tab');
        element.parentNode.removeChild(element);

        element = document.getElementById('Reimbursment_button_tab');
        element.parentNode.removeChild(element);
    }

    if (user.role == 'finance-manager') {
        let table = document.getElementById('Reimbursment_table');

        let updatecell = table.rows[0].insertCell(9);

        updatecell.className = 'Table_display';

        updatecell.innerHTML = '<strong>update';

    }
};

/***********USER_TABLE*********** */
/*********************Find All***************** */
async function FindAllUserTable() {
    console.log("entering into project0/users fetch");

    const result = await fetch('http://localhost:3000/users', {// method get by default
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (result.status === 200) {
        if (result) {

            const body = await result.json();

            console.log("role: " + user.roleid);

            console.log("finished project0/users fetch");

            // Find a <table> element with id="myTable":
            let table = document.getElementById("User_table");

            console.log(table.rows.length);
            for (let index = table.rows.length - 1; index > 0; index--) {
                console.log('table delete = ' + index);
                table.deleteRow(1);
            }

            FindallUserTableRole(user.role, body, table)



            console.log('getting users success');
        }

    } else {
        console.log('error for getting users');
    }

}

function FindallUserTableRole(id, body, table) {
    //loop through how many users there are
    for (let index = 0; index < body.length; index++) {
        let temprole = body[index].roleid;

        switch (body[index].roleid) {
            case 1:
                temprole = 'finance-manager';
                break;
            case 2:
                temprole = 'admin';
                break;
            case 3:
                temprole = 'associate';
                break;

            default:
                break;
        }

        if (id === 'finance-manager') { //Finance-Manager
            let row = table.insertRow(table.rows.length);
            table.rows[0].cells[6].style = "display:none;";

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            let useridcell = row.insertCell(0);
            let usernamecell = row.insertCell(1);
            let firstnamecell = row.insertCell(2);
            let lastname = row.insertCell(3);
            let email = row.insertCell(4);
            let rolecell = row.insertCell(5);

            useridcell.className = 'Table_display';
            usernamecell.className = 'Table_display';
            firstnamecell.className = 'Table_display';
            lastname.className = 'Table_display';
            email.className = 'Table_display';
            rolecell.className = 'Table_display';


            // Add some text to the new cells:
            useridcell.innerHTML = body[index].userid;
            usernamecell.innerHTML = body[index].username;
            firstnamecell.innerHTML = body[index].firstname;
            lastname.innerHTML = body[index].lastname;
            email.innerHTML = body[index].email;
            rolecell.innerHTML = temprole;
        }
        else if (id === 'admin') {//Admin
            let row = table.insertRow(table.rows.length);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            let useridcell = row.insertCell(0);
            let usernamecell = row.insertCell(1);
            let firstnamecell = row.insertCell(2);
            let lastname = row.insertCell(3);
            let email = row.insertCell(4);
            let rolecell = row.insertCell(5);
            let updatecell = row.insertCell(6);

            let element1 = document.createElement('input');
            let element2 = document.createElement('input');
            let element3 = document.createElement('input');
            let element4 = document.createElement('input');
            let element5 = document.createElement('select');
            element5.options[element5.options.length] = new Option('finance-manager', 'finance-manager');
            element5.options[element5.options.length] = new Option('admin', 'admin');
            element5.options[element5.options.length] = new Option('associate', 'associate');


            let button1 = document.createElement('button');

            usernamecell.appendChild(element1).value = body[index].username;
            firstnamecell.appendChild(element2).value = body[index].firstname;
            lastname.appendChild(element3).value = body[index].lastname;
            email.appendChild(element4).value = body[index].email;
            rolecell.appendChild(element5).value = temprole;
            updatecell.appendChild(button1).innerHTML = 'update: ' + index;

            updatecell.addEventListener('click', UpdateUser);

            useridcell.className = 'Table_display';
            usernamecell.className = 'Table_display';
            firstnamecell.className = 'Table_display';
            lastname.className = 'Table_display';
            email.className = 'Table_display';
            rolecell.className = 'Table_display';
            updatecell.className = 'Table_display';


            useridcell.innerHTML = body[index].userid;
        }
        else {
            table.rows[0].cells[6].style = "display:none;";
        }
    }

    // Create an empty <tr> element and add it to the 1st position of the table:


}

/*********************Filter_User***************** */
async function FilterUser(e) {
    e.preventDefault();
    let inputFilter = document.getElementById("UserFilter");
    console.log('inputFilter value: ' + inputFilter.value);

    if (inputFilter.value <= 0) {
        FindAllUserTable();
    } else {
        let table = document.getElementById("User_table");

        for (let index = table.rows.length - 1; index > 0; index--) {
            console.log('table delete = ' + index);
            table.deleteRow(1);
        }

        const result = await fetch(`http://localhost:3000/users/${inputFilter.value}`, {// method get by default
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const body = await result.json();

        FilterUserRole(user.role, body, table);

    }

}
function FilterUserRole(id, body, table) {

    let temprole = body.roleid;

    switch (body.roleid) {
        case 1:
            temprole = 'finance-manager';
            break;
        case 2:
            temprole = 'admin';
            break;
        case 3:
            temprole = 'associate';
            break;

        default:
            break;
    }

    if (id === 'finance-manager') {//Finance-Manager
        let row = table.insertRow(table.rows.length);

        let useridcell = row.insertCell(0);
        let usernamecell = row.insertCell(1);
        let firstnamecell = row.insertCell(2);
        let lastname = row.insertCell(3);
        let email = row.insertCell(4);
        let rolecell = row.insertCell(5);

        useridcell.className = 'Table_display';
        usernamecell.className = 'Table_display';
        firstnamecell.className = 'Table_display';
        lastname.className = 'Table_display';
        email.className = 'Table_display';
        rolecell.className = 'Table_display';

        // Add some text to the new cells:
        useridcell.innerHTML = body.userid;
        usernamecell.innerHTML = body.username;
        firstnamecell.innerHTML = body.firstname;
        lastname.innerHTML = body.lastname;
        email.innerHTML = body.email;
        rolecell.innerHTML = temprole;

    } else if (id === 'admin') {//Admin

        let row = table.insertRow(table.rows.length);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        let useridcell = row.insertCell(0);
        let usernamecell = row.insertCell(1);
        let firstnamecell = row.insertCell(2);
        let lastname = row.insertCell(3);
        let email = row.insertCell(4);
        let rolecell = row.insertCell(5);
        let updatecell = row.insertCell(6);

        let element1 = document.createElement('input');
        let element2 = document.createElement('input');
        let element3 = document.createElement('input');
        let element4 = document.createElement('input');
        let element5 = document.createElement('select');
        element5.options[element5.options.length] = new Option('finance-manager', 'finance-manager');
        element5.options[element5.options.length] = new Option('admin', 'admin');
        element5.options[element5.options.length] = new Option('associate', 'associate');


        let button1 = document.createElement('button');

        usernamecell.appendChild(element1).value = body.username;
        firstnamecell.appendChild(element2).value = body.firstname;
        lastname.appendChild(element3).value = body.lastname;
        email.appendChild(element4).value = body.email;
        rolecell.appendChild(element5).value = temprole;
        updatecell.appendChild(button1).innerHTML = 'update';

        updatecell.addEventListener('click', UpdateUser);

        useridcell.className = 'Table_display';
        usernamecell.className = 'Table_display';
        firstnamecell.className = 'Table_display';
        lastname.className = 'Table_display';
        email.className = 'Table_display';
        rolecell.className = 'Table_display';
        updatecell.className = 'Table_display';


        useridcell.innerHTML = body.userid;

    } else {
        let row = table.insertRow(table.rows.length);

        let useridcell = row.insertCell(0);
        let usernamecell = row.insertCell(1);
        let firstnamecell = row.insertCell(2);
        let lastname = row.insertCell(3);
        let email = row.insertCell(4);
        let rolecell = row.insertCell(5);

        useridcell.className = 'Table_display';
        usernamecell.className = 'Table_display';
        firstnamecell.className = 'Table_display';
        lastname.className = 'Table_display';
        email.className = 'Table_display';
        rolecell.className = 'Table_display';

        // Add some text to the new cells:
        useridcell.innerHTML = body.userid;
        usernamecell.innerHTML = body.username;
        firstnamecell.innerHTML = body.firstname;
        lastname.innerHTML = body.lastname;
        email.innerHTML = body.email;
        rolecell.innerHTML = body.roleid;

    }

}
/*********************Update_User***************** */
async function UpdateUser() {
    //console.log(this.parentNode.cells[2].getElementsByTagName('input')[0].value)
    console.log('update clicked: ' + this.parentNode.cells[0].innerHTML);
    let userid = parseInt(this.parentNode.cells[0].innerHTML);
    console.log(userid);

    const credentialsvalue = {
        userid,
        username: this.parentNode.cells[1].getElementsByTagName('input')[0].value,
        firstname: this.parentNode.cells[2].getElementsByTagName('input')[0].value,
        lastname: this.parentNode.cells[3].getElementsByTagName('input')[0].value,
        email: this.parentNode.cells[4].getElementsByTagName('input')[0].value,
        roleid: this.parentNode.cells[5].getElementsByTagName('select')[0].selectedIndex + 1
    }
    console.log(credentialsvalue);

    const result = await fetch(`http://localhost:3000/users`, {// method get by default
        method: 'PATCH',
        body: JSON.stringify(credentialsvalue),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const body = await result.json();

    console.log(body);
}

/***********REIMBURSMENT_TABLE*********** */
//Not being Used
async function FindAllReimbursmentTable() {
    const result = await fetch('http://localhost:3000/reimbursements', {// method get by default
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })


    if (result.status === 200) {
        if (result) {

            const body = await result.json();

            // Find a <table> element with id="myTable":
            //Create a find all Reimbursment_table
            let table = document.getElementById("Reimbursment_table");

            console.log(table.rows.length);
            for (let index = table.rows.length - 1; index > 0; index--) {
                console.log('table delete = ' + index);
                table.deleteRow(1);
            }

            //have a filter for a Reimbursment_ID OR Reimbursment_Status
            FindallReimbursmentTableRole(user.roleid, body, table)



            console.log('getting users success');
        }

    } else {
        console.log('error for getting users');
    }
}
function FindallReimbursmentTableRole(id, body, table) {
    //loop through how many users there are
    for (let index = 0; index < body.length; index++) {

        if (id === 'finance-manager') {
            let row = table.insertRow(table.rows.length);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            let reimbursmentid = row.insertCell(0);
            let author = row.insertCell(1);
            let amount = row.insertCell(2);
            let datesubmitted = row.insertCell(3);
            let dateresolved = row.insertCell(4);
            let description = row.insertCell(5);
            let resolver = row.insertCell(6);
            let status = row.insertCell(7);
            let type = row.insertCell(8);

            reimbursmentid.className = 'Table_display';
            author.className = 'Table_display';
            amount.className = 'Table_display';
            datesubmitted.className = 'Table_display';
            dateresolved.className = 'Table_display';
            description.className = 'Table_display';
            resolver.className = 'Table_display';
            status.className = 'Table_display';
            type.className = 'Table_display';


            let element1 = document.createElement('input');
            let button1 = document.createElement('button');

            reimbursmentid.innerHTML = body[index].reimbursmentid;
            author.innerHTML = body[index].author;
            amount.innerHTML = body[index].amount;
            datesubmitted.innerHTML = body[index].datesubmitted;
            dateresolved.innerHTML = body[index].dateresolved;
            description.innerHTML = body[index].description;
            resolver.innerHTML = body[index].resolver;
            type.innerHTML = body[index].type;

            status.appendChild(element1).value = body[index].resolver;
            type.appendChild(button1).innerHTML = 'update: ' + index;

        }
        else if (id === 'admin') {
            let row = table.insertRow(table.rows.length);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            let reimbursmentid = row.insertCell(0);
            let author = row.insertCell(1);
            let amount = row.insertCell(2);
            let datesubmitted = row.insertCell(3);
            let dateresolved = row.insertCell(4);
            let description = row.insertCell(5);
            let resolver = row.insertCell(6);
            let status = row.insertCell(7);
            let type = row.insertCell(8);

            reimbursmentid.className = 'Table_display';
            author.className = 'Table_display';
            amount.className = 'Table_display';
            datesubmitted.className = 'Table_display';
            dateresolved.className = 'Table_display';
            description.className = 'Table_display';
            resolver.className = 'Table_display';
            status.className = 'Table_display';
            type.className = 'Table_display';


            reimbursmentid.innerHTML = body[index].reimbursmentid;
            author.innerHTML = body[index].author;
            amount.innerHTML = body[index].amount;
            datesubmitted.innerHTML = body[index].datesubmitted;
            dateresolved.innerHTML = body[index].dateresolved;
            description.innerHTML = body[index].description;
            resolver.innerHTML = body[index].resolver;
            status.innerHTML = body[index].status;
            type.innerHTML = body[index].type;

        }
        else if (id === 'associate') {
        }
    }

    // Create an empty <tr> element and add it to the 1st position of the table:


}
/*********************My_Reimbursment***************** */
async function My_ReimbursmentTable() {


    const result = await fetch(`http://localhost:3000/reimbursements//author/userId/${user.userId}`, {// method get by default
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })


    if (result.status === 200) {
        if (result) {

            const body = await result.json();
            console.log(body);
            // Find a <table> element with id="myTable":
            //Create a find all Reimbursment_table
            let table = document.getElementById("My_Reimbursment_table");

            console.log(table.rows.length);
            for (let index = table.rows.length - 1; index > 0; index--) {
                console.log('table delete = ' + index);
                table.deleteRow(1);
            }

            //have a filter for a Reimbursment_ID OR Reimbursment_Status

            for (let index = 0; index < body.length; index++) {
                let row = table.insertRow(table.rows.length);
                let reimbursmentidcell = row.insertCell(0);
                let authorcell = row.insertCell(1);
                let amountcell = row.insertCell(2);
                let datesubmittedcell = row.insertCell(3);
                let dateresolvedcell = row.insertCell(4);
                let descriptioncell = row.insertCell(5);
                let resolvercell = row.insertCell(6);
                let statuscell = row.insertCell(7);
                let typecell = row.insertCell(8);


                reimbursmentidcell.className = 'Table_display';
                authorcell.className = 'Table_display';
                amountcell.className = 'Table_display';
                datesubmittedcell.className = 'Table_display';
                dateresolvedcell.className = 'Table_display';
                descriptioncell.className = 'Table_display';
                resolvercell.className = 'Table_display';
                statuscell.className = 'Table_display';
                typecell.className = 'Table_display';

                reimbursmentidcell.innerHTML = body[index].reimbursmentid;
                authorcell.innerHTML = body[index].author;
                amountcell.innerHTML = body[index].amount;
                datesubmittedcell.innerHTML = body[index].datesubmitted;
                dateresolvedcell.innerHTML = body[index].dateresolved;
                descriptioncell.innerHTML = body[index].description;
                resolvercell.innerHTML = body[index].resolver;
                switch (body[index].status) {
                    case 1://Pending
                        statuscell.innerHTML = 'Pending';
                        break;
                    case 2://Approved
                        statuscell.innerHTML = 'Approved';

                        break;
                    case 3://Rejected
                        statuscell.innerHTML = 'Rejected';
                        break;

                    default:
                        break;
                }
                switch (body[index].type) {
                    case 1://Lodging
                        typecell.innerHTML = 'Lodging';

                        break;
                    case 2://Travel
                        typecell.innerHTML = 'Travel';

                        break;
                    case 3://Food
                        typecell.innerHTML = 'Food';
                        break;
                    case 4://Other
                        typecell.innerHTML = 'Other';
                        break;
                    default:
                        break;
                }
            }
        }

    } else {
    }
}
/*********************Filter_Reimbursment***************** */
async function FilterReimbursment(e) {
    e.preventDefault();

    let inputFilter = document.getElementById('ReimbursmentIdFilter');
    let selectstatus = document.getElementById('ReimbursmentSatusFilter');
    let table = document.getElementById('Reimbursment_table');

    console.log(table.rows.length);
    for (let index = table.rows.length - 1; index > 0; index--) {
        table.deleteRow(1);
    }

    if (inputFilter.value >= 1) { // If the input is filled
        //Takes in the userid table
        console.log('user ID is: ' + inputFilter.value);
        const userIdresult = await fetch(`http://localhost:3000/reimbursements/author/userId/${inputFilter.value}`, {// method get by default
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        let userIdBody = await userIdresult.json();

        if (userIdresult.status == 200) {

            if (selectstatus.selectedIndex >= 1) {// if the status filter is not in All
                console.log('selected index is: ' + selectstatus.selectedIndex);
                const statusresult = await fetch(`http://localhost:3000/reimbursements/status/${selectstatus.selectedIndex}`, {// method get by default
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })

                if (statusresult.status == 200) {
                    let statusbody = await statusresult.json();
                    for (let index = 0; index < statusbody.length; index++) {
                        if (statusbody[index].author == inputFilter.value) {
                            FilterReimbursmentAddCells(statusbody, table, index);
                        }
                    }
                }

            } else {// if the status filter is in All (only get the user Id)
                console.log('reimbursements length is: ' + userIdBody.length);
                for (let index = 0; index < userIdBody.length; index++) {
                    FilterReimbursmentAddCells(userIdBody, table, index);
                }
            }
        }
        else{

        }
    }
    else {// If the input is left undefined
        if (selectstatus.selectedIndex >= 1) {//If the status is not All
            console.log('selected index is: ' + selectstatus.selectedIndex);
            const statusresult = await fetch(`http://localhost:3000/reimbursements/status/${selectstatus.selectedIndex}`, {// method get by default
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            if (statusresult.status == 200) {
                let statusbody = await statusresult.json();
                for (let index = 0; index < statusbody.length; index++) {
                    FilterReimbursmentAddCells(statusbody, table, index);
                }
            }
        } else {///If the status is All
            console.log('place all reimbursmtn dao here')
        }

    }

}
function FilterReimbursmentAddCells(statusbody, table, index) {
    let row = table.insertRow(table.rows.length);

    if (user.role == 'finance-manager') {
        let reimbursmentidcell = row.insertCell(0);
        let authorcell = row.insertCell(1);
        let amountcell = row.insertCell(2);
        let datesubmittedcell = row.insertCell(3);
        let dateresolvedcell = row.insertCell(4);
        let descriptioncell = row.insertCell(5);
        let resolvercell = row.insertCell(6);
        let statuscell = row.insertCell(7);
        let typecell = row.insertCell(8);
        let updatecell = row.insertCell(9);


        let element1 = document.createElement('select');
        element1.options[element1.options.length] = new Option('Pending', 'Pending');
        element1.options[element1.options.length] = new Option('Approved', 'Approve');
        element1.options[element1.options.length] = new Option('Reject', 'Reject');
        let element2 = document.createElement('select');
        element2.options[element2.options.length] = new Option('Lodging', 'Lodging');
        element2.options[element2.options.length] = new Option('Travel', 'Travel');
        element2.options[element2.options.length] = new Option('Food', 'Food');
        element2.options[element2.options.length] = new Option('Other', 'Other');

        let button1 = document.createElement('button');


        reimbursmentidcell.className = 'Table_display';
        authorcell.className = 'Table_display';
        amountcell.className = 'Table_display';
        datesubmittedcell.className = 'Table_display';
        dateresolvedcell.className = 'Table_display';
        descriptioncell.className = 'Table_display';
        resolvercell.className = 'Table_display';
        statuscell.className = 'Table_display';
        typecell.className = 'Table_display';
        updatecell.className = 'Table_display';

        updatecell.addEventListener('click', UpdateReimbursment);

        reimbursmentidcell.innerHTML = statusbody[index].reimbursmentid;
        authorcell.innerHTML = statusbody[index].author;
        amountcell.innerHTML = statusbody[index].amount;
        datesubmittedcell.innerHTML = statusbody[index].datesubmitted;
        dateresolvedcell.innerHTML = statusbody[index].dateresolved;
        descriptioncell.innerHTML = statusbody[index].description;
        resolvercell.innerHTML = statusbody[index].resolver;
        updatecell.appendChild(button1).innerHTML = 'update';
        statuscell.appendChild(element1).selectedIndex = statusbody[index].status - 1;
        typecell.appendChild(element2).selectedIndex = statusbody[index].type - 1;
        console.log(statusbody);
        console.log(element1.options.length);
    } else {
        let reimbursmentidcell = row.insertCell(0);
        let authorcell = row.insertCell(1);
        let amountcell = row.insertCell(2);
        let datesubmittedcell = row.insertCell(3);
        let dateresolvedcell = row.insertCell(4);
        let descriptioncell = row.insertCell(5);
        let resolvercell = row.insertCell(6);
        let statuscell = row.insertCell(7);
        let typecell = row.insertCell(8);


        reimbursmentidcell.className = 'Table_display';
        authorcell.className = 'Table_display';
        amountcell.className = 'Table_display';
        datesubmittedcell.className = 'Table_display';
        dateresolvedcell.className = 'Table_display';
        descriptioncell.className = 'Table_display';
        resolvercell.className = 'Table_display';
        statuscell.className = 'Table_display';
        typecell.className = 'Table_display';

        reimbursmentidcell.innerHTML = statusbody[index].reimbursmentid;
        authorcell.innerHTML = statusbody[index].author;
        amountcell.innerHTML = statusbody[index].amount;
        datesubmittedcell.innerHTML = statusbody[index].datesubmitted;
        dateresolvedcell.innerHTML = statusbody[index].dateresolved;
        descriptioncell.innerHTML = statusbody[index].description;
        resolvercell.innerHTML = statusbody[index].resolver;
        switch (statusbody[index].status) {
            case 1://Pending
                statuscell.innerHTML = 'Pending';
                break;
            case 2://Approved
                statuscell.innerHTML = 'Approved';

                break;
            case 3://Rejected
                statuscell.innerHTML = 'Rejected';
                break;

            default:
                break;
        }
        switch (statusbody[index].type) {
            case 1://Lodging
                typecell.innerHTML = 'Lodging';

                break;
            case 2://Travel
                typecell.innerHTML = 'Travel';

                break;
            case 3://Food
                typecell.innerHTML = 'Food';
                break;
            case 4://Other
                typecell.innerHTML = 'Other';
                break;
            default:
                break;
        }
    }


}
/*********************Update_Reimbursment***************** */
async function UpdateReimbursment() {
    //console.log(this.parentNode.cells[2].getElementsByTagName('input')[0].value)
    console.log('update clicked: ' + this.parentNode.cells[0].innerHTML);
    reimbursmentid = parseInt(this.parentNode.cells[0].innerHTML);
    console.log(reimbursmentid);

    if (this.parentNode.cells[7].getElementsByTagName('select')[0].selectedIndex == 0) {
        console.log('You cant update a pending to pending value');

        this.parentNode.cells[7].getElementsByTagName('select')[0] = setInterval(function () {
                $('#DivToolTip').toggleClass('red-border');
            }, 1000);
            
   return;
    }
    const credentialsvalue = {
        reimbursmentid: parseInt(this.parentNode.cells[0].innerHTML),
        author: this.parentNode.cells[1].innerHTML,
        amount: this.parentNode.cells[2].innerHTML,
        datesubmitted: this.parentNode.cells[3].innerHTML,
        dateresolved: this.parentNode.cells[4].innerHTML,
        description: this.parentNode.cells[5].innerHTML,
        resolver: this.parentNode.cells[6].innerHTML,
        status: this.parentNode.cells[7].getElementsByTagName('select')[0].selectedIndex + 1,
        type: this.parentNode.cells[8].getElementsByTagName('select')[0].selectedIndex + 1
    }
    console.log(credentialsvalue);

    const result = await fetch(`http://localhost:3000/reimbursements`, {// method get by default
        method: 'PATCH',
        body: JSON.stringify(credentialsvalue),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const body = await result.json();

    this.parentNode.cells[4].innerHTML = body.dateresolved;
    this.parentNode.cells[6].innerHTML = user.userId;


    console.log(body);
}
/*********************Submit_Reimbursment***************** */
async function Submit_Reimbursment() {

    let amount = document.getElementById('submit_amount');
    let datesubmitted = document.getElementById('submit_date');
    let description = document.getElementById('submit_description');
    let type = document.getElementById('submit_type');


    console.log('Submit_Reimbursment_userid: ' + user.userId);
    console.log('Submit_Reimbursment_amount: ' + amount.value);
    console.log('Submit_Reimbursment_date: ' + datesubmitted.value);
    console.log('Submit_Reimbursment_description: ' + description.value);
    console.log('Submit_Reimbursment_type: ' + type.value);
    //SubmitReimbursement(+req.body.reimbursmentid, req.session.user.userid, +req.body.amount, req.body.datesubmitted, req.body.dateresolved, req.body.description, +req.body.resolver, +req.body.status, +req.body.type)

    if (!amount.value || !datesubmitted.value || !description.value) {

        if (!amount.value) {
            amount.className = 'inputerror';
        } else {
            amount.className = '';
        }

        if (!datesubmitted.value) {
            datesubmitted.className = 'inputerror';
        } else {
            datesubmitted.className = '';
        }

        if (!description.value) {
            description.className = 'inputerror';
        } else {
            description.className = '';
        }

        return;
    } else {
        amount.className = '';
    }




    let credentialsvalue = {
        author: user.userId,
        amount: amount.value,
        datesubmitted: datesubmitted.value,
        description: description.value,
        type: type.selectedIndex + 1
    }

    const result = await fetch(`http://localhost:3000/reimbursements`, {// method get by default
        method: 'POST',
        body: JSON.stringify(credentialsvalue),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    My_ReimbursmentTable();

    console.log('Finished');

}


function openCity(evt, ID) {


    let prevactive = false;

    //if the button is already active when clicked then event want to turn it off
    if (evt.currentTarget.className == "active") {
        prevactive = true;
    }

    if (ID == 'User_tab') {
        Resettabs();
        FindAllUserTable();
    }
    else if (ID == 'Reimbursment_tab') {
        Resettabs();
    } else if (ID == 'My_profile_tab') {
        Resettabs();
        MyProfileUser();
    } else if (ID == 'My_Reimbursment_tab') {
        Resettabs();
        My_ReimbursmentTable();
    }
    // console.log(prevactive);
    // Get all elements with class="tabcontent" and hide them
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    let tablinks = document.getElementById("Tabdiv").querySelectorAll("button");
    console.log(tablinks.length);
    for (let i = 0; i < tablinks.length; i++) {
        // console.log(tablinks[i].className +" for index: "+i)
        tablinks[i].className = "tablinks";
    }

    // // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(ID).style.display = "block";

    if (evt.currentTarget.className == "active") {
        evt.currentTarget.className = "tablinks";
    } else {
        evt.currentTarget.className = "active";

    }

    if (prevactive) {
        evt.currentTarget.className = "tablinks";
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
    }
}





function MyProfileUser() {

    let table = document.getElementById('My_User_table');

    if (table.rows.length < 2) {

        let row = table.insertRow(table.rows.length);
        console.log(table.rows.length);

        let useridcell = row.insertCell(0);
        let usernamecell = row.insertCell(1);
        let firstnamecell = row.insertCell(2);
        let lastname = row.insertCell(3);
        let email = row.insertCell(4);
        let rolecell = row.insertCell(5);

        useridcell.className = 'Table_display';
        usernamecell.className = 'Table_display';
        firstnamecell.className = 'Table_display';
        lastname.className = 'Table_display';
        email.className = 'Table_display';
        rolecell.className = 'Table_display';

        // Add some text to the new cells:
        console.log(user);
        useridcell.innerHTML = user.userId;
        usernamecell.innerHTML = user.username;
        firstnamecell.innerHTML = user.firstname;
        lastname.innerHTML = user.lastname;
        email.innerHTML = user.email;
        rolecell.innerHTML = user.role;
    }

}

function Resettabs(){
    let amount = document.getElementById('submit_amount');
    let datesubmitted = document.getElementById('submit_date');
    let description = document.getElementById('submit_description');

    amount.className = '';
    datesubmitted.className = '';
    description.className = '';
}