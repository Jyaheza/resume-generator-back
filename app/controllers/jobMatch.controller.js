const { generateJobMatchCritique, generateJobMatchScore } = require("../services/job-match-service");
const { findResumeJsonById } = require("../controllers/resume.controller");

exports.get = async (req, res) => {
    const resume = await findResumeJsonById(req, res);
    const jobDescription = req.body.jobDescription;

    let jobMatchResponse = {
        score: '',
        critique: ''
    };

    try {
        jobMatchResponse.score = await generateJobMatchScore(resume, jobDescription);
        jobMatchResponse.critique = await generateJobMatchCritique(resume, jobDescription);

        try {
            res.send(jobMatchResponse);
        } catch (error) {
            console.error(`The job match response encountered an error. Please try again.`);
            res.status(404).send({
                message: "An error occurred while returning the job match.",
            });
        }
    } catch (error) {
        console.error(`The job match generation encountered an error. Please try again.`);
        res.status(404).send({
            message: "An error occurred while generating the job match.",
        });
    }
}
