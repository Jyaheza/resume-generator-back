const { generateJobMatchScore, generateJobMatchCritique } = require('../../app/services/job-match-service');
const { startCohereChat } = require('../../app/services/cohere-client-service');

jest.mock('../../app/services/cohere-client-service');

describe('generateJobMatchScore', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const resume = 'Sample resume text';
    const jobDescription = 'Sample job description text';

    it('should return a valid score (0-5) when startCohereChat returns a valid score', async () => {
        startCohereChat.mockResolvedValue("3.0"); // Mock returning a valid score

        const score = await generateJobMatchScore(resume, jobDescription);
        expect(score).toBe("3.0");
    });

    it('should throw an error when startCohereChat returns a non-numeric value', async () => {
        startCohereChat.mockResolvedValue('invalid-score'); // Mock returning an invalid score

        await expect(generateJobMatchScore(resume, jobDescription)).rejects.toThrow(
            'Job Match Score service returned an invalid value response.'
        );
    });

    it('should throw an error when startCohereChat throws an error', async () => {
        startCohereChat.mockRejectedValue(new Error('Service error')); // Mock throwing an error

        await expect(generateJobMatchScore(resume, jobDescription)).rejects.toThrow(
            'Service error'
        );
    });

    it('should throw an error when startCohereChat returns a number outside the valid range', async () => {
        startCohereChat.mockResolvedValue("6.0"); // Mock returning an invalid score

        await expect(generateJobMatchScore(resume, jobDescription)).rejects.toThrow(
            'Job Match Score service returned an invalid value response.'
        );
    });

    it('should throw an error if invalid jobDescription is provided', async () => {
        const resume = 'Sample resume text';
        const jobDescription = null;

        await expect(generateJobMatchScore(resume, jobDescription)).rejects.toThrow(
            'Job match requires a valid resume and job description.'
        );
    });

    it('should throw an error if invalid resume is provided', async () => {
        const resume = null;
        const jobDescription = 'Sample job description text';

        await expect(generateJobMatchScore(resume, jobDescription)).rejects.toThrow(
            'Job match requires a valid resume and job description.'
        );
    });
});

describe('generateJobMatchCritique', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a string response', async () => {
        const resume = 'Sample resume text';
        const jobDescription = 'Sample job description text';

        const result = await generateJobMatchCritique(resume, jobDescription);

        expect(typeof result).toBe('string');
    });

    it('should throw an error if invalid jobDescription is provided', async () => {
        const resume = 'Sample resume text';
        const jobDescription = null;

        await expect(generateJobMatchCritique(resume, jobDescription)).rejects.toThrow(
            'Job match requires a valid resume and job description.'
        );
    });

    it('should throw an error if invalid resume is provided', async () => {
        const resume = null;
        const jobDescription = 'Sample job description text';

        await expect(generateJobMatchCritique(resume, jobDescription)).rejects.toThrow(
            'Job match requires a valid resume and job description.'
        );
    });
});
