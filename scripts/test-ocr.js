const Tesseract = require('tesseract.js');
const path = require('path');

async function testOCR() {
  const imagePath = path.join('/Users/aadigolecha/Desktop/shree_laxmi_creation_website/Assets/products', 'PHOTO-2026-06-21-19-31-03 2.jpg');
  
  console.log(`Running OCR on: ${imagePath}`);
  
  try {
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'eng',
      { logger: m => console.log(m) }
    );
    console.log('--- OCR Result ---');
    console.log(text);
    console.log('------------------');
  } catch (error) {
    console.error('OCR failed:', error);
  }
}

testOCR();
