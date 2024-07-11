const puppeteer = require('puppeteer');
const fs = require('fs');

/**
 * Converts HTML/CSS to a PDF and returns it as a base64 string.
 * @param {string} html - The HTML content to convert to PDF.
 * @returns {Promise<string>} - A promise that resolves to the base64 string of the PDF.
 */
async function convertHtmlToPdfBase64(html) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"]});
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
    const pdfBuffer = await page.pdf();
    return pdfBuffer.toString('base64');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = convertHtmlToPdfBase64;
