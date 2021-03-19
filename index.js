const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require("chalk");



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
        .then(function (managerResponse) {
            console.log("New Manager");
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
        .then(function (engineerResponse) {
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
        .then(function (internResponse) {
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
