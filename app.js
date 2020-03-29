const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = []
const question =[
    {
        type: "list",
        name: "position",
        message: "What is your position",
        choices:["Employee","Engineer", "Intern", "Manager"]  
    }
];

const questionEngineer =[
    {
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    },
    {
        type: "input",
        name: "github",
        message: "What is your github name?",
    }
]

const questionEmployee =[
    {
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    }
]

const questionIntern =[
    {
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    },
    {
        type: "input",
        name: "school",
        message: "What is your school name?",
    }
]

const questionManager =[
    {
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
    }
];
const addMore =[
    {
        type: "confirm",
        name: "addMore",
        message: "Do you have someone else to add?",
        default:true 
    }
]
function addMember(){
    inquirer.prompt(addMore).then(function(answer){
        if(answer.addMore){
            addPeople();
        }
        else{
            const html = render(teamMembers);
            fs.writeFileSync(outputPath, html, err=>{
                if(err){
                    throw err;
                }
                console.log("Created an html page")
            });
        }
    })
}

function addPeople(){
    inquirer.prompt(question).then(function(answers){
        switch (answers.position){
            case "Engineer": 
            return inquirer.prompt(questionEngineer).then(function(answer){
                teamMembers.push(new Engineer(answer.name, answer.id, answer.email, answer.github));
                console.log("Added Engineer")
                addMember(); 
            })
            case "Employee": 
            return inquirer.prompt(questionEmployee).then(function(answer){
                teamMembers.push(new Employee(answer.name, answer.id, answer.email));
                console.log("Added Employee")
                addMember();
            })
            case "Intern": 
            return inquirer.prompt(questionIntern).then(function(answer){
                teamMembers.push(new Intern(answer.name, answer.id, answer.email, answer.school));
                console.log("Added Intern")
                addMember();
            })
            case "Manager": 
            return inquirer.prompt(questionManager).then(function(answer){
                teamMembers.push(new Manager(answer.name, answer.id, answer.email, answer.officeNumber));
                console.log("Added Manager")
                addMember();
            })
        }       
    })
}

addPeople();