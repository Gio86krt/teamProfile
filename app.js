const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const team = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function newEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Insert employee name: ",
        name: "name",
      },
      {
        type: "input",
        message: "Insert employee's ID: ",
        name: "id",
      },
      {
        type: "input",
        message: "Insert employee's email: ",
        name: "email",
      },
      {
        type: "list",
        choices: ["Manager", "Engineer", "Intern", "Employee"],
        massage: "Select new employee's role: ",
        name: "role",
      },
    ])
    .then((res) => {
      if (res.role === "Manager") {
        const newManager = new Manager(
          res.name,
          res.id,
          res.email,
          (officeNumber = inquirer
            .prompt([
              {
                type: "input",
                message: "Insert new manager office: ",
                name: "officeNumber",
              },
            ])
            .then((res) => {
              newManager.officeNumber = res.officeNumber;
              team.push(newManager);
              console.log(newManager.getRole());
              register();
            }))
        );
      } else if (res.role === "Engineer") {
        const newEngineer = new Engineer(
          res.name,
          res.id,
          res.email,
          res.role,
          (github = inquirer
            .prompt([
              {
                type: "input",
                message: "Insert engineer's GitHub: ",
                name: "github",
              },
            ])
            .then((res) => {
              newEngineer.github = res.github;
              team.push(newEngineer);
              console.log(newEngineer.getRole());
              register();
            }))
        );
      } else if (res.role === "Intern") {
        const newIntern = new Intern(
          res.name,
          res.id,
          res.email,
          res.role,
          (school = inquirer
            .prompt([
              {
                type: "input",
                message: "Insert intern's University",
                name: "school",
              },
            ])
            .then((res) => {
              newIntern.school = res.school;
              team.push(newIntern);
              console.log(newIntern.getRole());
              register();
            }))
        );
      } else {
        const newEmployee = new Employee(res.name, res.id, res.email, res.role);
        team.push(newEmployee);
        console.log(team);
        register();
      }
    });
}

function register() {
  inquirer
    .prompt([
      {
        message: "Would you like to register a new employee?",
        type: "list",
        choices: ["Yes", "No"],
        name: "answer",
      },
    ])
    .then((res) => {
      console.log(res);
      if (res.answer === "Yes") newEmployee();
      else display(team);
    });
}

register();

function display(team) {
  console.log(team);
  let htmls = render(team);
  fs.writeFileSync(outputPath, htmls);
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
