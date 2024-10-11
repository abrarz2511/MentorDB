// Allows client to perform CRUD opertaions (Create, Read, Update, Delete)
const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');
const ROLES_LIST = require('../configurations/roles_list');
const verifyRoles = require('../middleware/verifyRoles');


router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST. Editor), employeesController.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);
router.route('/:id')
    .get(employeesController.getEmployeebyID);
    
module.exports = router;