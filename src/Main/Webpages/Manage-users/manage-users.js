async function table_users() {
    // const User_id = document.getElementById("User_id").value;
    // const username = document.getElementById("username").value;
    // const firstname = document.getElementById("firstname").value;
    // const lastname = document.getElementById("lastname").value;
    // const email = document.getElementById("email").value;
    // const roleid = document.getElementById("roleid").value;

    // const senddata = {
    //     userid : 1,
    //     username : 'not filled',
    //     password : 'not filled',
    //     firstname : 'not filled',
    //     lastname : 'not filled',
    //     email : 'not filled',
    //     roleid : 1,
    // }

    console.log("entering into project0/users fetch");

    const result = await fetch('http://localhost:3000/users', {// method get by default
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const body = await result.json();
    console.log('Value of Json table: ' + body.length);
   // console.log('Value of Json table 2: ' + body.products[0]);

    console.log('Value of table: ' + result);

    //console.log(body);
    console.log("finished project0/users fetch");

    if (result.status === 200) {

        // Find a <table> element with id="myTable":
        var table = document.getElementById("User_table");
        //loop through how many users there are
        for (let index = 0; index < body.length; index++) {

            // Create an empty <tr> element and add it to the 1st position of the table:
            var row = table.insertRow(table.rows.length);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            var useridcell = row.insertCell(0);
            var usernamecell = row.insertCell(1);
            var firstnamecell = row.insertCell(2);
            var lastname = row.insertCell(3);
            var email = row.insertCell(4);
            var rolecell = row.insertCell(5);

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
            rolecell.innerHTML = body[index].roleid;
        }



        console.log('getting users success');
    } else {
        console.log('error for getting users');
    }

}