"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schoolController_1 = require("../controllers/schoolController");
const router = (0, express_1.Router)();
router.post('/addSchool', schoolController_1.addSchool);
router.get('/listSchools', schoolController_1.listSchools);
exports.default = router;
