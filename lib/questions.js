// Variables for inquirer questions.
const addOrUpdateQuestions = {
    name: "addOrUpdate",
    type: "list",
    message: "Would you like to ADD or VIEW departments, roles or employees or UPDATE employee roles?",
    choices: ["ADD", "VIEW", "UPDATE", "DELETE", "DONE"]
};

const addViewWhatQuestions = {
    name: "addViewWhat",
    type: "list",
    message: "What do you want to ADD, VIEW or DELETE?",
    choices: ["Department", "Role", "Employee"]
};

const updateWhatQuestions = [
    {
        name: "updateWho",
        type: "input",
        message: "What is the ID of the employee whose role, or manager, you want to UPDATE?",
    },
    {
        name: "updateWhat",
        type: "list",
        message: "What do you want to UPDATE for this employee?",
        choices: ["Role", "Manager"]
    },
    {
        name: "newItem",
        typw: "input",
        message: "What is the ID for their new role or manager?"
    }
];

const addDepartmentQuestion = {
    name: "departmentName",
    type: "input",
    message: "What is the name of the department you want to ADD?"
};

const addRoleQuestions = [{
    name: "roleTitle",
    type: "input",
    message: "What is the title of the role you want to ADD?"
},
{
    name: "roleSalary",
    type: "input",
    message: "What is the salary for this new role? (Only numbers, no commas)"
},
{
    name: "roleDepartment",
    type: "input",
    message: "What is the ID for the department this new role is in?"
}];

const addEmployeeQuestions = [{
    name: "firstName",
    type: "input",
    message: "What is the first name of the employee you want to ADD?"
},
{
    name: "lastName",
    type: "input",
    message: "What is the last name of your new employee?"
},
{
    name: "roleId",
    type: "input",
    message: "What is the ID for the role this new employee will have?"
},
{
    name: "managerId",
    type: "input",
    message: "What is the ID for your new employee's manager? (If there is no manager hit enter)"
}];

const deleteDepartment = {
    name: "deleteDepartment",
    type: "input",
    message: "What is the ID of the department you want to delete?"
};

const deleteRole = {
    name: "deleteRole",
    type: "input",
    message: "What is the ID of the role you want to delete?"
};

const deleteEmployee = {
    name: "deleteEmployee",
    type: "input",
    message: "What is the ID of the employee you want to delete?"
}

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
module.exports.deleteDepartment = deleteDepartment;
module.exports.deleteRole = deleteRole;
module.exports.deleteEmployee = deleteEmployee;
module.exports.reRunQuestion = reRunQuestion;