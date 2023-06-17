const fs = require("fs");

var UserData = 
{
    "firstName": "",
    "secondName": "",
    "age": ""
}

var Users = [];

function main()
{
    let text = fs.readFileSync("text.txt").toString();
    let file = "script.js";

    fs.appendFileSync(file, "console.log('" + text + "');");
}

function newUser(name, secondName, age)
{
    var UserData = 
    {
    "firstName": name,
    "secondName": secondName,
    "age": age
    }

    Users.append(UserData);
    saveNewUsersData();
}

function saveNewUsersData()
{
    fs.appendFileSync("data", Users);
}

main();