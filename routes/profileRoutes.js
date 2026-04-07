const express = require('express');
const profileRouter = express.Router();

const profileController = require('../Controller/profile');
const {requireAuth} = require('../Middleware/authMiddleware');


// ==========================
// CORE PROFILE ROUTES
// ==========================

// Create profile
profileRouter.post('/', profileController.createProfile);

// Get current user's profile
profileRouter.get('/',  profileController.getProfile);

// Update entire profile
profileRouter.put('/',  profileController.updateProfile);

// Delete entire profile
profileRouter.delete('/',  profileController.deleteProfile);



// ==========================
// DEGREES
// ==========================

profileRouter.post('/degrees',  profileController.addDegree);
profileRouter.patch('/degrees/:degreeId',  profileController.updateDegree);
profileRouter.delete('/degrees/:degreeId', profileController.removeDegree);


// ==========================
// CERTIFICATIONS
// ==========================

profileRouter.post('/certifications', profileController.addCertification);
profileRouter.patch('/certifications/:certificationId', profileController.updateCertification);
profileRouter.delete('/certifications/:certificationId', profileController.removeCertification);


// ==========================
// LICENSES
// ==========================

profileRouter.post('/licenses', profileController.addLicense);
profileRouter.patch('/licenses/:licenseId', profileController.updateLicense);
profileRouter.delete('/licenses/:licenseId', profileController.removeLicense);


// ==========================
// COURSES
// ==========================

profileRouter.post('/courses', profileController.addCourse);
profileRouter.patch('/courses/:courseId', profileController.updateCourse);
profileRouter.delete('/courses/:courseId', profileController.removeCourse);


// ==========================
// EMPLOYMENT HISTORY
// ==========================

profileRouter.post('/employment', profileController.addEmploymentHistory);
profileRouter.patch('/employment/:employmentId', profileController.updateEmploymentHistory);
profileRouter.delete('/employment/:employmentId', profileController.removeEmploymentHistory);


module.exports = profileRouter;