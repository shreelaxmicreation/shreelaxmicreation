const fs = require('fs');
const path = require('path');
const excelData = require('/Users/aadigolecha/.gemini/antigravity-ide/brain/9503fb14-9511-4734-8378-6bcb10402f32/artifacts/excel_data.json');

const dir = '/Users/aadigolecha/Desktop/shree_laxmi_creation_website/Assets/products';

function run() {
  const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.JPG'));
  
  const designCodes = excelData.map(item => item['Design Code']);
  
  // Find matched design codes
  const matchedCodes = [];
  const unmatchedFiles = [];
  
  for (const file of allFiles) {
    let matched = false;
    for (const dc of designCodes) {
      if (file.includes(dc)) {
        matchedCodes.push(dc);
        matched = true;
        break;
      }
    }
    if (!matched && file.startsWith('PHOTO')) {
      unmatchedFiles.push(file);
    }
  }

  const unmatchedCodes = designCodes.filter(dc => !matchedCodes.includes(dc));

  console.log(`Matched ${matchedCodes.length} images via OCR.`);
  console.log(`Unmatched Images: ${unmatchedFiles.length}`);
  console.log(`Unmatched Codes: ${unmatchedCodes.length}`);

  // Sort unmatched files alphabetically to ensure consistent sequential mapping
  unmatchedFiles.sort();

  // If counts match, map them 1-to-1
  if (unmatchedFiles.length === unmatchedCodes.length) {
    console.log('Counts match! Performing sequential fallback mapping...');
    for (let i = 0; i < unmatchedFiles.length; i++) {
      const file = unmatchedFiles[i];
      const code = unmatchedCodes[i];
      const oldPath = path.join(dir, file);
      const newFileName = `${code}${path.extname(file)}`;
      const newPath = path.join(dir, newFileName);
      
      fs.renameSync(oldPath, newPath);
      console.log(`🔄 Fallback Renamed ${file} -> ${newFileName}`);
    }
  } else {
    console.log('❌ Counts do not match, cannot perform safe fallback mapping.');
  }
}

run();
