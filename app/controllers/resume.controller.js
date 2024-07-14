const convertHtmlToPdfBase64 = require('../services/pdf-generate-service');
const ejs = require('ejs');
const path = require('path');
const db = require('../models');
const fs = require('fs');
const Resumes = db.Resumes;

exports.create = async (req, res) => {
    try {
        const resumeJson = req.body.resume;
        const templateId = req.body.templateId;
        const html = await ejs.renderFile(path.join(__dirname, `../templates/template${templateId}.ejs`), resumeJson);
        const base64Pdf = await convertHtmlToPdfBase64(html);
        const newResume = {
            createdAt: getMySQLDateTime(),
            resume_pdf: base64Pdf,
            resume_text: JSON.stringify(resumeJson),
            title: req.body.title,
            updatedAt: getMySQLDateTime(),
            user_id: req.body.userId
        };

        const createdResume = await Resumes.create(newResume);

        try {
            res.send({ status: "success", createdResumeId: createdResume.id });
        } catch (error) {
            console.error(`An error occurred while sending the PDF response: ${error.message}`);
            res.status(500).send({
                message: "An error occurred while returning the PDF.",
            });
        }
    } catch (error) {
        console.log(error);
        console.error(`An error occurred while generating the PDF: ${error.message}`);
        res.status(500).send({
            message: "An error occurred while generating the PDF.",
        });
    }
}

exports.findAllForUser = async (req, res) => {
    let resumes;
    try {
        resumes = await Resumes.findAll({
            where: { user_id: req.params.userId }
        });
    } catch (error) {
        console.error("Error fetching resumes: ", error);
        throw error;
    }

    try {
        return res.send(resumes);
    } catch (error) {
        console.error("Error occurred in resume respose: ", error);
        return res.status(500).send({
            message: "An error occurred while retrieving resumes."
        });
    }
};

/** Stubs. Add implementation later */
exports.findAll = (req, res) => { /* stub */ };
exports.findOne = (req, res) => { /* stub */ };
exports.createResume = (req, res) => { /* stub */ };
exports.update = (req, res) => { /* stub */ };
exports.delete = (req, res) => { /* stub */ };

function getMySQLDateTime() {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace('T', ' ');
}