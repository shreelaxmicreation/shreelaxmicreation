const fs = require('fs');
const html = fs.readFileSync('page3.html', 'utf-8');
const act2Idx = html.indexOf('absolute inset-0 pointer-events-none flex items-center justify-center z-20');
if (act2Idx > -1) {
  console.log(html.substring(act2Idx - 20, act2Idx + 500));
} else {
  console.log('Act 2 Not Found');
}
