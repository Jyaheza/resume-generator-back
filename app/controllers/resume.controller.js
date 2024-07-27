const convertHtmlToPdfBase64 = require('../services/pdf-generate-service');
const ejs = require('ejs');
const path = require('path');
const db = require('../models');
const fs = require('fs');
const Resumes = db.Resumes;
const ResumeData = db.ResumeData;
const { QueryTypes, where } = require('sequelize');

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

exports.findMetaForUser = async (req, res) => {
    let userId = req.params.id;
    try {
        const results = await db.sequelize.query(`
            SELECT 
              rd.*,
              r.id as resume_id,
              r.createdAt,
              r.title,
              r.cs_visible,
              r.user_id
            FROM Resumes as r
            JOIN ResumeData as rd ON r.user_id = rd.user_id
            WHERE r.user_id = :userId
          `, {
            replacements: { userId },
            type: QueryTypes.SELECT
        });

        if (!results || results.length === 0) {
            return res.status(404).send({ message: "No data found for the given user ID" });
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send(results);
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

/** Stubs. Add implementation later */
exports.findAll = (req, res) => { /* stub */ };
exports.findOne = (req, res) => { };
exports.createResume = (req, res) => { /* stub */ };
exports.update = (req, res) => { /* stub */ };
exports.delete = async (req, res) => {
    const resumeId = req.params.id;
    try {
        const result = await Resumes.destroy({
            where: { id: resumeId }
        });

        if (result === 0) {
            console.error(`No resume found with id: ${resumeId}`);
            return res.status(500).send({
                message: 'No resume found',
            });
        }

        try {
            return res.send({ message: 'Resume deleted successfully', success: true });
        } catch (error) {
            console.error(`An error occurred while sending the PDF response: ${error.message}`);
            return res.status(500).send({
                message: "An error occurred while returning the PDF.",
            });
        }
    } catch (error) {
        console.error("Error deleting resume: ", error);
        return res.status(500).send({
            message: "An error occurred while deleting the resume."
        });
    }
};

exports.findResumePdfById = async (req, res) => {
    const resumeId = req.params.id;

    try {
        const resume = await Resumes.findOne({
            where: { id: resumeId },
            attributes: ['resume_pdf']
        });

        if (!resume) {
            return res.status(404).send({ message: "Resume not found" });
        }

        // Send the resume_pdf as the response
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send({ "pdf": resume.resume_pdf });
    } catch (error) {
        console.error("Error fetching resume PDF:", error);
        return res.status(500).send({
            message: "An error occurred while retrieving the resume PDF.",
        });
    }
};

exports.findResumeJsonById = async (req, res) => {
    const resumeId = req.params.id;

    try {
        const resume = await Resumes.findOne({
            where: { id: resumeId },
            attributes: ['resume_text']
        });

        if (!resume) {
            throw new Error("Resume not found");
        }

        // Send the resume_pdf as the response
        return resume.resume_text;
    } catch (error) {
        console.error("Error fetching resume JSON:", error);
        throw new Error("An error occurred while retrieving the resume JSON.");
    }
};

exports.updateCsVisible = async (req, res) => {
    const resumeId = req.params.id;
    const csVisible = req.params.csvisible;

    try {
        const [affectedRows] = await Resumes.update(
            { cs_visible: csVisible },
            { where: { id: resumeId } }
        );

        try{
            if (affectedRows > 0) {
                return res.status(200).send({
                    message: 'cs_visible has been successfully updated.'
                });
              } else {
                return res.status(500).send({
                    message: 'No resume found with id' + resumeId,
                });
              }
        } catch ( error ){
            console.error(`An error occurred while returning cs_visibiliy update status: ${error.message}`);
            return res.status(500).send({
                message: "An error occurred while returning cs_visibiliy update status",
            });
        }
    } catch (error) {
        console.error("Error updating cs_visible", error);
        throw new Error("An error occurred while updating cs_visible.");
    }
}

function getMySQLDateTime() {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace('T', ' ');
}