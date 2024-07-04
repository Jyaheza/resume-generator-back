const puppeteer = require('puppeteer');
const convertHtmlToPdfBase64 = require('../../app/services/pdf-generate-service');

jest.mock('puppeteer');

describe('convertHtmlToPdfBase64', () => {
  let browser;
  let page;

  beforeEach(() => {
    page = {
      setContent: jest.fn(),
      pdf: jest.fn().mockResolvedValue(Buffer.from('test pdf content')),
    };
    browser = {
      newPage: jest.fn().mockResolvedValue(page),
      close: jest.fn().mockResolvedValue(),
    };
    puppeteer.launch.mockResolvedValue(browser);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should convert HTML to a base64 PDF string', async () => {
    const htmlContent = '<html><body><h1>Hello, world!</h1></body></html>';
    const base64Pdf = await convertHtmlToPdfBase64(htmlContent);

    expect(puppeteer.launch).toHaveBeenCalledWith({ headless: true, args: ["--no-sandbox"] });
    expect(browser.newPage).toHaveBeenCalled();
    expect(page.setContent).toHaveBeenCalledWith(htmlContent, { waitUntil: 'networkidle0', timeout: 60000 });
    expect(page.pdf).toHaveBeenCalled();
    expect(base64Pdf).toBe(Buffer.from('test pdf content').toString('base64'));
  });

  it('should handle errors', async () => {
    const htmlContent = '<html><body><h1>Hello, world!</h1></body></html>';
    const error = new Error('Test error');
    page.setContent.mockRejectedValueOnce(error);

    await expect(convertHtmlToPdfBase64(htmlContent)).rejects.toThrow('Test error');

    expect(puppeteer.launch).toHaveBeenCalledWith({ headless: true, args: ["--no-sandbox"] });
    expect(browser.newPage).toHaveBeenCalled();
    expect(page.setContent).toHaveBeenCalledWith(htmlContent, { waitUntil: 'networkidle0', timeout: 60000 });
    expect(browser.close).toHaveBeenCalled();
  });
});
