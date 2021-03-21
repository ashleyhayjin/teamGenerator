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
                    name: 'officeNum',
                    message: "What is the manager's office number?"
                }
            )
        .then(function (managerRes) {
            const newManager = new Manager(res.name, res.id, res.email, managerRes.officeNum);
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
            const intern = new Intern(res.name, res.id, res.email, internRes.school);
            team.push(intern);
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
        console.log("No more members.");
    }})

}


start();

function writeHtml (team){
    const htmlData = [];
    const htmlOpening =`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>`
    
    htmlData.push(htmlOpening);

    for(i=0; i < team.length; i++){
        let htmlFile = `<div class="card" style="width: 15rem;">
        <img src='https://dummyimage.com/25x25.png' alt=''/>
        <div class="card-body">
          <h2> class="card-title">${team[i].typeOfRole}</h2>
            <h4>${team[i].name}</h4>
            <h4>${team[i].id}</h4>
            <h4>${team[i].email}</h4>`;


          if(team[i].officeNum){
            htmlFile+= `<h4>${team[i].officeNum}</h4> 
            </div>`;
            htmlData.push(htmlFile);
          }
          if(team[i].github){
            htmlFile+= `<h4>${team[i].github}</h4> 
            </div>`;
            htmlData.push(htmlFile);

          }  
          if(team[i].school){
            htmlFile += `<h4>${team[i].officeNum}</h4> 
            </div>`
            htmlData.push(htmlFile);
          }

        
    }
    const closingBody = `</body></html>`;
    htmlData.push(closingBody);
    console.log(htmlData);
}

