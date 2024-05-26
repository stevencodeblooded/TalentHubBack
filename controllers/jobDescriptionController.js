const JobDescription = require('../model/jobDescription')

//create job description
const jds = async (req, res) => {
    const { userId, title, company_info, job_description, requirements, benefits, location, salary } = req.body

    let jd
    try {
        jd = new JobDescription({ userId, title, company_info,  job_description,  requirements,  benefits,  location,  salary })
        await jd.save()
        res.status(201).json({ message: 'Job details submitted successfully', job: jd })
    } catch (error) {
        res.status(401).json({message: 'Failed to submit job description'})
    } 
}

const getAlljobs = async (req, res) => {
    let jobs
    try {
        jobs = await JobDescription.find({})
        if (jobs !== null) {
            res.status(200).json({ message: 'Successfully retrieved all jobs', data: jobs})
        } else {
            res.status(200).json({ message: 'Sorry there are no jobs at the moment'})
        }
    } catch (error) {
        res.status(401).json({ message: 'Something went wrong, Try again later!'})
    }
} 

//retrieve job description
const jobDesc = async (req, res) => {
    const { id } = req.params

    let job
    try {
        job = await JobDescription.findById(id)
        res.status(200).json({ data: job, message: 'Successfully retrieved' })
    } catch (error) {
        return res.status(401).json({ message: 'Something went wrong, Try again later!' })
    }

    if (!job) {
        return res.status(404).json({ message: 'Sorry the job does not exist.'})
    }
}


const getMyJobs = async (req, res) => {
    const { userId } = req.params

    let jobs
    try {
        jobs = await JobDescription.find({ userId })
        res.json({ result: jobs })
    } catch (error) {
        console.log(error);
    }

}

const editJob = async (req, res) => {
    let jobId = req.params.id  

    if (!jobId) {
        res.status(401).json({ message: 'You cannot update the job!' })
    }

    const { title, company_info, job_description, requirements, benefits, location, salary } = req.body

    let updatedJobData = { title, company_info, job_description, requirements, benefits, location, salary }

    let newJobData
    try {
        newJobData = await JobDescription.findByIdAndUpdate(jobId, updatedJobData, { new: true })
        return res.status(200).json({ message: 'Job has been updated successfully', newJobData })
    } catch (error) {
        return res.status(401).json({ message: 'Update Failed! Could not find user with the specified id'})
    }
}

const deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedJob = await JobDescription.findByIdAndDelete(id);

        if (deletedJob) {
            res.status(200).json({ message: 'Job successfully deleted' });
        } else {
            res.status(404).json({ error: 'Job not found' });
        }
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Failed to delete the job' });
    }
};


module.exports = { jds, jobDesc, getAlljobs, getMyJobs, editJob, deleteJob }