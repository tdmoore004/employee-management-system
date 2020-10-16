// Variables for inquirer questions.
const addOrUpdateQuestions = {
    name: "addOrUpdate",
    type: "list",
    message: "Would you like to ADD or VIEW departments, roles or employees or UPDATE employee roles?",
    choices: ["ADD", "VIEW", "UPDATE", "DONE"]
};

const addViewWhatQuestions = {
    name: "addViewWhat",
    type: "list",
    message: "What do you want to add or view?",
    choices: ["Department", "Role", "Employee"]
};

const updateWhatQuestions = [
    {
        name: "updateWhat",
        type: "input",
        message: "What is the ID of the employee whose role you want to update?",
    },
    {
        name: "newRole",
        typw: "input",
        message: "What is the ID for their new role?"
    }
];

const addDepartmentQuestion = {
    name: "departmentName",
    type: "input",
    message: "What is the name of the department you want to add?"
};

const addRoleQuestions = [{
    name: "roleTitle",
    type: "input",
    message: "What is the title of the role you want to add?"
},
{
    name: "roleSalary",
    type: "input",
    message: "What is the salary for this role? (Only numbers, no commas)"
},
{
    name: "roleDepartment",
    type: "input",
    message: "What is the ID for the department this role is in?"
}];

const addEmployeeQuestions = [{
    name: "firstName",
    type: "input",
    message: "What is the first name of the employee you are adding?"
},
{
    name: "lastName",
    type: "input",
    message: "What is the last name of the employee you are adding?"
},
{
    name: "roleId",
    type: "input",
    message: "What is the ID for the role this employee will have?"
},
{
    name: "managerId",
    type: "input",
    message: "What is the ID for this employee's manager? (If there is no manager hit enter)"
}];

const reRunQuestion = {
    name: "reRun",
    type: "list",
    message: "Do you have more to do in EMS?",
    choices: ["Yes", "No"],
};

module.exports.addOrUpdateQuestions = addOrUpdateQuestions;
module.exports.addViewWhatQuestions = addViewWhatQuestions;
module.exports.updateWhatQuestions = updateWhatQuestions;
module.exports.addDepartmentQuestion = addDepartmentQuestion;
module.exports.addRoleQuestions = addRoleQuestions;
module.exports.addEmployeeQuestions = addEmployeeQuestions;
module.exports.reRunQuestion = reRunQuestion;