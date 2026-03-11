const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach((file) => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const baseDir = path.resolve('c:/Users/Try Hard/Desktop/Nexte/futbolinclusivo-org/futbolinclusivo_recorrido');

walk(baseDir, (err, results) => {
  if (err) throw err;
  
  const extracted = {};

  results.forEach(file => {
    if (file.endsWith('.txt')) {
      const relativePath = path.relative(baseDir, file);
      const content = fs.readFileSync(file, 'utf-8');
      
      const $ = cheerio.load(content);
      $('script, style, noscript, header, footer').remove();
      
      const textNodes = [];
      // Only extract significant text to avoid noise
      $(':not(body):not(html)').each((i, el) => {
          // ensure el is element
          if (el.type !== 'tag') return;
          const tagName = el.tagName.toLowerCase();
          if (['h1','h2','h3','h4','p','li','td','th'].includes(tagName)) {
             const text = $(el).text().trim().replace(/\s+/g, ' ');
             if (text.length > 5 && !textNodes.find(t => t.text === text)) {
                 textNodes.push({ tag: tagName, text });
             }
          }
      });

      const images = [];
      $('img').each((i, el) => {
         const src = $(el).attr('src');
         if(src && !src.includes('base64')) {
             images.push(src);
         }
      });
      
      extracted[relativePath] = { textNodes, images };
    }
  });

  const outputPath = path.resolve('c:/Users/Try Hard/Desktop/Nexte/futbolinclusivo-org/.synapse/extracted_content.json');
  fs.writeFileSync(outputPath, JSON.stringify(extracted, null, 2));
  console.log(`Extraction complete! Data saved to ${outputPath}`);
});
