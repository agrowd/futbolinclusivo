const fs = require('fs');
const path = require('path');

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
  
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Image Analysis Gallery</title>
    <style>
      body { font-family: sans-serif; padding: 20px; background: #eee; }
      .container { max-width: 1200px; margin: 0 auto; }
      .image-card { background: #fff; margin-bottom: 40px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
      .title { padding: 15px; background: #333; color: #fff; margin: 0; font-size: 16px; word-break: break-all; }
      img { width: 100%; height: auto; display: block; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Visual Analysis Directory</h1>
  `;

  results.forEach(file => {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const relativePath = path.relative(baseDir, file);
      const fileUrl = `file:///${file.replace(/\\/g, '/')}`;
      html += `
        <div class="image-card">
          <h2 class="title">${relativePath}</h2>
          <img src="${fileUrl}" alt="${relativePath}" loading="lazy" />
        </div>
      `;
    }
  });

  html += `
    </div>
  </body>
  </html>
  `;

  const outputPath = path.resolve('c:/Users/Try Hard/Desktop/Nexte/futbolinclusivo-org/public/gallery.html');
  fs.writeFileSync(outputPath, html);
  console.log(`Gallery generated at ${outputPath}`);
});
