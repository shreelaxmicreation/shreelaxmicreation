const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('/Users/aadigolecha/Desktop/shree_laxmi_creation_website/Fabric Catalog SEO Descriptions.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const json = xlsx.utils.sheet_to_json(worksheet);

fs.writeFileSync('/Users/aadigolecha/.gemini/antigravity-ide/brain/9503fb14-9511-4734-8378-6bcb10402f32/artifacts/excel_data.json', JSON.stringify(json, null, 2));
console.log('Saved to excel_data.json');
