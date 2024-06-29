const { generateJobMatchCritique, generateJobMatchScore } = require("../services/job-match-service");

exports.get = async (req, res) => {
    const resume = req.body.resume; //TODO - When ready, this will come from the database rather than being passed in with request. 
    const jobDescription = req.body.jobDescription;

    let jobMatchResponse = {
        score: '',
        critique: ''
    };

    try {
        jobMatchResponse.score = await generateJobMatchScore(resume, jobDescription);

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
