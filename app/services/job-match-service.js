const { startCohereChat } = require("./cohere-client-service");

/**
 * Scores the strenth of the match between the resume and the job description.
 * 
 * @param {*} resume 
 * @param {*} jobDescription 
 * @returns a number 0-5.
 */
async function generateJobMatchScore(resume, jobDescription) {
    if(!resume || !jobDescription){
        throw new Error("Job match requires a valid resume and job description.");
    }

    const preamble = `You are a career services staff member at a university helping students enter the workforce by comparing how their resumes matchs job descriptions.`;

    let chatInputMessage = `Please compare the given resume against the given job description and 
    return only a single numerical value based on how close the resume content matches the requirements 
    of the job description. Strong matches can be emphasized, but if there is no match, please to not attempt to 
    draw positive match conclusions from the resume and job description. Job descriptions that are out of alignment with the student's 
    area of education or relevant experience should naturally score lower since this would not be advantageous to go 
    into a different field than what the student has been pursuing in education and experience. There's no need to add explanation or critique of the strength of the match at this time. 
    The numerical value should be between 0 and 5, 0 being absolutely no match, 1 being the weakest match, 3 being a moderate match, and 5 being the strongest match. 
    You should score based on any factors available in both the resume and job description including, but not limited to: job title, 
    the student's area of study, industry, business domain, education, certifications, required experience, salary range and geographic location. `;

    chatInputMessage += `Here's the resume of interest: ${resume}. `;
    chatInputMessage += `Here's the jobDescription of interest: ${jobDescription}.`;

    let score = await startCohereChat(preamble, chatInputMessage);

    if(isNumber(score) && isValidRange(score)){
        return score;
    }

    throw new Error("Job Match Score service returned an invalid value response.");
}

/**
 * Provides critique of the match between the resume and the job description.
 * 
 * @param {*} resume 
 * @param {*} jobDescription 
 * @returns response string
 */
async function generateJobMatchCritique(resume, jobDescription) {
    if(!resume || !jobDescription){
        throw new Error("Job match requires a valid resume and job description.");
    }
    
    const preamble = `You are a career services staff member at a university helping students enter the workforce by comparing how their resumes matchs job descriptions`;
    
    let chatInputMessage = `Please compare the given resume against the given job description and 
    return a brief summary, no more than 2 paragraphs, about how the resume content does or does not match the requirements 
    of the job description. Strong matches can be emphasized, but if there is no match, please to not attempt to 
    draw positive match conclusions from the resume and job description. Job descriptions that are out of alignment with the student's 
    area of education or relevant experience should naturally score lower since this would not be advantageous to go 
    into a different field than what the student has been pursuing in education and experience. You should base your comments on any factors available in both the resume and 
    job description including, but not limited to: job title, the student's area of study, industry, 
    business domain, education, certifications, required experience, salary range and geographic location. Please direct this commentary
    directly to the student, and do not refer to them in the 3rd person. `;
    
    chatInputMessage += `Here's the resume of interest: ${resume}. `;
    chatInputMessage += `Here's the jobDescription of interest: ${jobDescription}.`;

    return await startCohereChat(preamble, chatInputMessage);
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
 * Determines whether value falls in the requested 0-5 range
 * @param {*} value 
 * @returns boolean
 */
function isValidRange(value){
    const num = Number(value);
    return num > -1 && num < 6;
}

module.exports = { generateJobMatchScore, generateJobMatchCritique };