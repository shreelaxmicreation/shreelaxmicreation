const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');
const excelData = require('/Users/aadigolecha/.gemini/antigravity-ide/brain/9503fb14-9511-4734-8378-6bcb10402f32/artifacts/excel_data.json');

const dir = '/Users/aadigolecha/Desktop/shree_laxmi_creation_website/Assets/products';

function normalizeText(text) {
  return text.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

async function run() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.JPG'));
  
  const designCodes = excelData.map(item => ({
    original: item['Design Code'],
    normalized: normalizeText(item['Design Code'])
  }));

  console.log(`Starting OCR on ${files.length} images...`);

  const worker = await Tesseract.createWorker('eng');

  for (const file of files) {
    // Skip if already renamed to a known design code
    if (designCodes.some(dc => file.includes(dc.original))) {
      console.log(`Skipping ${file}, already renamed.`);
      continue;
    }

    const filePath = path.join(dir, file);
    try {
      console.log(`Scanning ${file}...`);
      const { data: { text } } = await worker.recognize(filePath);
      const normalizedText = normalizeText(text);

      // Find match
      let matchedCode = null;
      for (const dc of designCodes) {
        if (normalizedText.includes(dc.normalized)) {
          matchedCode = dc.original;
          break;
        }
      }

      if (matchedCode) {
        const newFileName = `${matchedCode}${path.extname(file)}`;
        const newFilePath = path.join(dir, newFileName);
        
        if (filePath !== newFilePath) {
          fs.renameSync(filePath, newFilePath);
          console.log(`✅ Renamed ${file} -> ${newFileName}`);
        }
      } else {
        console.log(`❌ No match found for ${file}`);
        console.log(`   OCR Output: ${text.replace(/\\n/g, ' ')}`);
      }

    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  await worker.terminate();
  console.log('Finished processing all images.');
}

run().catch(console.error);
