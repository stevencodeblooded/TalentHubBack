const router = require('express').Router()
const userControllers = require('../controllers/userControllers')
const contactController = require('../controllers/contactController')
const applicationController = require('../controllers/applicationController')
const jobDescriptionController = require('../controllers/jobDescriptionController')

router.get('/', (req, res) => {
    res.json({ message: 'Api Functions Okay' })
})

router.post('/', userControllers.register)//register
router.post('/login', userControllers.login)//login
router.put('/:id', userControllers.updateUser) //update user
router.post('/contact', contactController.contact)//contact
router.post('/jd', jobDescriptionController.jds) //upload job desc
router.get('/jds', jobDescriptionController.getAlljobs) //get all jobs
router.get('/description/:id', jobDescriptionController.jobDesc) //get single job
router.get('/myjobs/:userId', jobDescriptionController.getMyJobs) //my jobs
router.put('/edit/:id', jobDescriptionController.editJob) //edit job
router.delete('/delete/:id', jobDescriptionController.deleteJob) //delete job
router.post('/application', applicationController.upload.single('resume'), applicationController.apply) //job application

module.exports = router