function getUsersList() {
    console.log("Invoked getUsersList()");     //console.log your BFF for debugging client side - also use debugger statement
    const url = "/Pros/list/";    		// API method on web server will be in Users class, method list
    fetch(url, {
        method: "GET",				//Get method
    }).then(response => {
        return response.json();                 //return response as JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from the web server has an "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert (pop up window)
        } else {
            formatUsersList(response);          //this function will create an HTML table of the data (as per previous lesson)
        }
    });
}

function formatUsersList(myJSONArray){
    let dataHTML = "";
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.proPseudo + "<td><td>" + item.proId + "<tr><td>";
    }
    document.getElementById("UsersTable").innerHTML = dataHTML;
}
//getUser() returns one row of data from the database using a GET and path parameter
function getUser() {
    console.log("Invoked getUser()");     //console.log your BFF for debugging client side
    const proId = document.getElementById("proId").value;  //get the proId from the HTML element with id=UserID
    //let proId = 1; 			  //You could hard code it if you have problems
    //debugger;				  //debugger statement to allow you to step through the code in console dev F12
    const url = "/Pro/getPro/";       // API method on webserver
    fetch(url + proId, {                // proId as a path parameter
        method: "GET",
    }).then(response => {
        return response.json();                         //return response to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {         //checks if response from server has an "Error"
            alert(JSON.stringify(response));            // if it does, convert JSON object to string and alert
        } else {
            document.getElementById("DisplayOneUser").innerHTML = response.proId + " " + response.proPseudo;  //output data
        }
    });
}
//addUser function to add a user to the database
function addUser() {
    console.log("Invoked AddUser()");
    const formData = new FormData(document.getElementById('InputUserDetails'));
    let url = "/Pros/add";
    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json()
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            window.open("/client/welcome.html", "_self");   //URL replaces the current page.  Create a new html file
        }                                                  //in the client folder called welcome.html
    });
}
function UsersLogin() {
    //debugger;
    console.log("Invoked UsersLogin() ");
    let url = "/Admin/login";
    let formData = new FormData(document.getElementById('InputUserDetails'));
    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.set("Token", response.Token);
            Cookies.set("userName", response.UserName);
            window.open("Maintenance.html", "_self");       //open Maintenance.html in same tab
        }
    });
}
function logout() {
    debugger;
    console.log("Invoked logout");
    let url = "/users/logout";
    fetch(url, {method: "POST"
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.remove("Token", response.Token);    //UserName and Token are removed
            Cookies.remove("userName", response.UserName);
            window.open("Maintenance.html", "_self");       //open index.html in same tab
        }
    });
}