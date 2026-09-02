import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const staffMembers = [
  { file: 'juan-rivas.jpg', initials: 'JR', name: 'Prof. Juan Rivas', role: 'Director Andar FC', bg1: '#002B5C', bg2: '#36b37e' },
  { file: 'pablo-lucero.jpg', initials: 'PL', name: 'Pablo Lucero', role: 'Coord. MEL / Ligas', bg1: '#1e1b4b', bg2: '#4338ca' },
  { file: 'rocio-di-nicola.jpg', initials: 'RD', name: 'Rocío Di Nicola', role: 'Coord. Fútbol Inclusivo', bg1: '#064e3b', bg2: '#10b981' },
  { file: 'roberto-salazar.jpg', initials: 'RS', name: 'Roberto Salazar', role: 'Coord. Fútbol Infantil', bg1: '#7c2d12', bg2: '#f97316' },
  { file: 'guido-oliva.jpg', initials: 'GO', name: 'Guido Oliva', role: 'Coord. Administrativo', bg1: '#14532d', bg2: '#22c55e' },
  { file: 'federico-romero.jpg', initials: 'FR', name: 'Federico Romero', role: 'Coord. Sistemas e Innovación', bg1: '#0f172a', bg2: '#0284c7' },
  { file: 'luciano-filippini.jpg', initials: 'LF', name: 'Luciano Filippini', role: 'Entrenador F. Inclusivo', bg1: '#022c22', bg2: '#059669' },
  { file: 'santiago-conde.jpg', initials: 'SC', name: 'Santiago Conde', role: 'Entrenador F. Infantil', bg1: '#431407', bg2: '#ea580c' },
  { file: 'sebastian-subira.jpg', initials: 'SS', name: 'Sebastián Subirá', role: 'Entrenador F. Infantil', bg1: '#431407', bg2: '#ea580c' },
  { file: 'yuliana-servian.jpg', initials: 'YS', name: 'Yuliana Servián', role: 'Equipo Técnico de Ligas', bg1: '#581c87', bg2: '#a855f7' },
  { file: 'marcos-lopez.jpg', initials: 'ML', name: 'Marcos López', role: 'Equipo Técnico de Ligas', bg1: '#1e3a8a', bg2: '#3b82f6' }
];

const outDir = path.join(process.cwd(), 'public', 'staff');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function makePlaceholders() {
  for (const m of staffMembers) {
    const svg = `
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-${m.initials}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${m.bg1}" />
            <stop offset="100%" stop-color="${m.bg2}" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#grad-${m.initials})" />
        <circle cx="200" cy="170" r="85" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="4" />
        <circle cx="200" cy="145" r="35" fill="rgba(255,255,255,0.85)" />
        <path d="M140 225 C140 185, 260 185, 260 225 Z" fill="rgba(255,255,255,0.85)" />
        <circle cx="255" cy="215" r="26" fill="#36b37e" stroke="#000B1A" stroke-width="4" />
        <text x="255" y="223" font-family="sans-serif" font-size="18" font-weight="900" fill="#000B1A" text-anchor="middle">${m.initials}</text>
        <text x="200" y="320" font-family="sans-serif" font-size="20" font-weight="800" fill="#ffffff" text-anchor="middle">${m.name}</text>
        <text x="200" y="350" font-family="sans-serif" font-size="13" font-weight="600" fill="rgba(255,255,255,0.7)" text-anchor="middle">${m.role}</text>
      </svg>
    `;
    const dest = path.join(outDir, m.file);
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(dest);
    console.log('Created placeholder:', m.file);
  }
}

makePlaceholders().catch(err => {
  console.error(err);
  process.exit(1);
});
