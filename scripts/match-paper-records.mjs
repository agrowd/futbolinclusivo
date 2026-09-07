import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/all_infancias.json', 'utf8'));

const phoneQueries = [
  '31898430',
  '41722042',
  '41987242',
  '27959765',
  '26113471',
  '23060815',
  '55884123',
  '30151251',
  '51038584',
  '22798052',
  '68428574'
];

const nameQueries = [
  'ramiro', 'cuñer', 'cufier', 'benicio', 'señoca', 'soñoca',
  'estefania', 'mendez',
  'renato', 'nataly', 'gerez',
  'sarzi', 'bozo', 'garzi', 'bazo',
  'owen', 'lopez',
  'tiara', 'colque', 'maica', 'gimenez',
  'naomi', 'isabel',
  'alexander', 'sofia', 'martinez',
  'bautista', 'rodriguez',
  'emily', 'fonsalida', 'fuenzalida', 'cluney', 'chaney',
  'benjamin', 'brenda', 'huerta'
];

console.log('=== SEARCHING BY PHONE NUMBER ===');
for (const pq of phoneQueries) {
  const matches = data.filter(d => {
    const cleanP = (d.tutorPhone || '').replace(/\D/g, '');
    return cleanP.includes(pq);
  });
  console.log(`\nPhone contains [${pq}]: ${matches.length} matches`);
  matches.forEach(m => {
    console.log(`  - ID: ${m._id} | Ticket: ${m.ticketCode} | Child: ${m.childName} | Tutor: ${m.tutorName} | Phone: ${m.tutorPhone} | Attended: ${m.attended}`);
  });
}

console.log('\n=== SEARCHING BY NAME ===');
for (const nq of nameQueries) {
  const matches = data.filter(d => {
    const cName = (d.childName || '').toLowerCase();
    const tName = (d.tutorName || '').toLowerCase();
    return cName.includes(nq) || tName.includes(nq);
  });
  if (matches.length > 0) {
    console.log(`\nName contains [${nq}]: ${matches.length} matches`);
    matches.forEach(m => {
      console.log(`  - Child: "${m.childName}" | Tutor: "${m.tutorName}" | Phone: ${m.tutorPhone} | Ticket: ${m.ticketCode} | Attended: ${m.attended}`);
    });
  }
}
