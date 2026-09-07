import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/all_infancias.json', 'utf8'));

// 1. Inspect Huertas family
console.log('=== HUERTAS FAMILY ===');
const huertas = data.filter(d => 
  (d.tutorPhone || '').includes('68228374') || 
  (d.familyGroupId && d.familyGroupId === 'FAM-321D5E') ||
  (d.childName || '').toLowerCase().includes('huerta') ||
  (d.tutorName || '').toLowerCase().includes('campos')
);
huertas.forEach(h => {
  console.log(`  - ID: ${h._id} | Ticket: ${h.ticketCode} | Child: "${h.childName}" | Tutor: "${h.tutorName}" | Phone: ${h.tutorPhone} | Attended: ${h.attended} | FamGroup: ${h.familyGroupId}`);
});

// 2. Inspect Jerez / Chavez family (1141987242)
console.log('\n=== JEREZ / CHAVEZ FAMILY (1141987242) ===');
const jerez = data.filter(d => 
  (d.tutorPhone || '').includes('41987242') ||
  (d.tutorName || '').toLowerCase().includes('chavez') ||
  (d.childName || '').toLowerCase().includes('jerez') ||
  (d.childName || '').toLowerCase().includes('gerez')
);
jerez.forEach(j => {
  console.log(`  - ID: ${j._id} | Ticket: ${j.ticketCode} | Child: "${j.childName}" | Tutor: "${j.tutorName}" | Phone: ${j.tutorPhone} | Attended: ${j.attended} | FamGroup: ${j.familyGroupId}`);
});

// 3. Search for phone variations or partial numbers:
// 1131898430 -> parts: 3189, 8430, 98430, etc.
// 1141722042 -> parts: 4172, 2042, 1722042
// 1155884123 -> parts: 5588, 4123, 5884123
// 1130151251 -> parts: 3015, 1251
// 1151038584 -> parts: 5103, 8584
console.log('\n=== FUZZY SEARCH FOR REMAINING PHONES ===');
const fuzzyPhones = [
  { label: 'Ramiro/Benicio (1131898430)', q: ['3189', '8430', '9843', '1898'] },
  { label: 'Estefania Mendez (1141722042)', q: ['4172', '2042', '1722', '7220'] },
  { label: 'Naomi Isabel (1155884123)', q: ['5588', '4123', '8841', '5884'] },
  { label: 'Alexander/Sofia Martinez (1130151251)', q: ['3015', '1251', '0151'] },
  { label: 'Bautista Rodriguez (1151038584)', q: ['5103', '8584', '1038'] }
];

fuzzyPhones.forEach(({ label, q }) => {
  console.log(`\nChecking ${label}:`);
  const found = data.filter(d => {
    const p = (d.tutorPhone || '').replace(/\D/g, '');
    return q.some(part => p.includes(part));
  });
  found.forEach(f => {
    console.log(`  -> Child: "${f.childName}" | Tutor: "${f.tutorName}" | Phone: "${f.tutorPhone}" | Ticket: ${f.ticketCode} | Attended: ${f.attended}`);
  });
});

// 4. Search for Mendez, Cuñer/Cufier, Señoca/Soñoca, Naomi, Isabel, Rodriguez
console.log('\n=== NAME SUBSTRING SEARCHES ===');
const terms = ['mendez', 'cuñer', 'cufier', 'cuñe', 'señoca', 'soñoca', 'sañudo', 'quñer', 'naomi', 'isabel', 'rodriguez', 'bautista'];
terms.forEach(t => {
  const matches = data.filter(d => 
    (d.childName || '').toLowerCase().includes(t) ||
    (d.tutorName || '').toLowerCase().includes(t)
  );
  if (matches.length > 0) {
    console.log(`\nTerm [${t}]: ${matches.length} found`);
    matches.forEach(m => {
      console.log(`  -> Child: "${m.childName}" | Tutor: "${m.tutorName}" | Phone: "${m.tutorPhone}" | Attended: ${m.attended}`);
    });
  }
});
