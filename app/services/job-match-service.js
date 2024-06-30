const { startCohereChat } = require("./cohere-client-service");

/**
 * Scores the strenth of the match between the resume and the job description.
 * 
 * @param {*} resume 
 * @param {*} jobDescription 
 * @returns a number 0-5.
 */
async function generateJobMatchScore(resume, jobDescription) {
    const preamble = `You are a career services staff member at a university helping students enter the workforce by reviewing and critiquing their resumes.`;

    let chatInputMessage = `Please compare the given resume against the given job description and 
    return only a single numerical value based on how close the resume content matches the requirements 
    of the job description. There's no need to add explanation or critique of the strength of the match at this time. 
    The numerical value should be between 0 and 5, 0 being absolutely no match, 1 being the weakest match, and 5 being the strongest match. 
    You should score based on any factors available in both the resume and job description including, but not limited to: job title, 
    the student's area of study, industry, business domain, education, required experience, salary range and geographic location. `;

    chatInputMessage += `Here's the resume of interest: ${resume}. `;
    chatInputMessage += `Here's the jobDescription of interest: ${jobDescription}.`;

    let score = await startCohereChat(preamble, chatInputMessage);

    if(isNumber(score) && isValidRange(score)){
        return score;
    }

    throw new Error("Job Match Score service returned an invalid value response.");
}

/**
 * Stub
 * @returns 
 */
async function generateJobMatchCritique() {
    return '';
}

/**
 * Determines whether value is a number
 * @param {*} value 
 * @returns boolean
 */
function isNumber(value) {
    const num = Number(value);
    return !isNaN(num) && isFinite(num);
}

/**
 * Determinse whether value falls in the requested 0-5 range
 * @param {*} value 
 * @returns boolean
 */
function isValidRange(value){
    const num = Number(value);
    return num > -1 && num < 6;
}

module.exports = { generateJobMatchScore, generateJobMatchCritique };