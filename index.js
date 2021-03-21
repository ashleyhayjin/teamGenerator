const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require("chalk");
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
// const templateFile = require("./src/template");
let team = [];

function start () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is your id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your email?"
        },
        {
            type: 'list',
            name: "typeOfRole",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ])
    .then(function(res){
        console.log(res);
        if(res.typeOfRole === 'Manager'){
            inquirer.prompt(
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: "What is the manager's office number?"
                }
            )
        .then(function (managerRes) {
            const newManager = new Manager(res.name, res.id, res.email, managerRes.officeNumber);
            team.push(newManager);
            moreMembers();
        })}

        else if(res.typeOfRole === "Engineer"){
            inquirer.prompt(
                {
                    type: 'input',
                    name: 'github',
                    message: "What is the github account username?"
                }
            )
        .then(function (engineerRes) {
            const newEngineer = new Engineer(res.name, res.id, res.email, engineerRes.github);
            team.push(newEngineer);
            console.log("New Engineer");
            moreMembers();    
        })}

        else if (res.typeOfRole === "Intern"){
            inquirer.prompt(
                {
                    type: 'input',
                    name: 'school',
                    message: "What is the school name?"
                }
            )
        .then(function (internRes) {
            const newIntern = new Intern(res.name, res.id, res.email, internRes.school);
            team.push(newIntern);
            console.log("New Intern");
            moreMembers();   
        })} 
    })
    
    .catch(function(err) {
        console.log(err);
    });
};


function moreMembers (){
    inquirer.prompt({

        type: 'list',
        name: 'moreMembers',
        message: 'Do you want to add more members?',
        choices: [
            "yes",
            "no"
        ]     
    }).then(function(res){
    if(res.moreMembers === "yes"){
    start();            
    } 
    else {
        console.log(team);
        writeHtml(team);
    }})

}


start();

function writeHtml (){
    const htmlData = [];
    const htmlOpening =`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Builder</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    </head>
    <body>`
    
    htmlData.push(htmlOpening);

    for(let i=0; i < team.length; i++){
        let htmlFile = `<div class="card" style="width: 15rem;">
        <img src='https://dummyimage.com/25x25.png' alt=''/>
        <div class="card-body">
          <h2 class="card-title">${team[i].getRole()}</h2>
            <h4>Name: ${team[i].name}</h4>
            <h4>ID: ${team[i].id}</h4>
            <h4>Email: <a href="mailto:${team[i].email}">${team[i].email}</a></h4>`;

          if(team[i].officeNum){
            htmlFile+= `<h4>$Office Number: {team[i].officeNumber}</h4> 
            </div>`;
          }
          if(team[i].github){
            htmlFile+= `<h4>Github Username: <a href="http://github.com/${team[i].github}">${team[i].github}</a></h4> 
            </div>`;

          }  
          if(team[i].school){
            htmlFile += `<h4>School: ${team[i].school}</h4> 
            </div>`
          }

        htmlData.push(htmlFile);
        
    }
    const closingBody = `</body></html>`;
    htmlData.push(closingBody);
    console.log(htmlData);
    fs.writeFileSync("index.html", htmlData.join(""));
}

