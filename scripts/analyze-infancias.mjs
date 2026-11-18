import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/all_infancias.json', 'utf8'));

console.log(`Analyzing ${data.length} total records...`);

// 1. Overall Attendance
const totalRecords = data.length;
const activeRecords = data.filter(d => d.status !== 'cancelled');
const cancelledRecords = data.filter(d => d.status === 'cancelled');

const attended = activeRecords.filter(d => d.attended);
const notAttended = activeRecords.filter(d => !d.attended);

const attendanceRate = ((attended.length / activeRecords.length) * 100).toFixed(2);

// 2. Family Groups & Tutors
const familyGroupMap = {};
data.forEach(d => {
  const fg = d.familyGroupId || d.tutorPhone || d.tutorName || 'SIN_GRUPO';
  if (!familyGroupMap[fg]) familyGroupMap[fg] = [];
  familyGroupMap[fg].push(d);
});
const uniqueFamilyGroupsCount = Object.keys(familyGroupMap).length;

const uniqueTutors = new Set(data.map(d => (d.tutorName || '').trim().toLowerCase()).filter(Boolean));
const uniquePhones = new Set(data.map(d => (d.tutorPhone || '').trim()).filter(Boolean));

// Estimate total adults/parents
// Each unique family group / tutor phone represents a tutor/parent attending with the child(ren)
const totalAdultsEstimated = uniquePhones.size;
const totalPeopleEstimated = totalRecords + totalAdultsEstimated;
const totalAttendedPeopleEstimated = attended.length + new Set(attended.map(d => d.tutorPhone).filter(Boolean)).size;

// 3. Ages Analysis
const ageList = [];
const ageRawMap = {};
const ageGroupMap = {
  'Primera Infancia (0-3 años)': 0,
  'Infancia Temprana (4-6 años)': 0,
  'Infancia Intermedia (7-9 años)': 0,
  'Pre-adolescencia (10-12 años)': 0,
  'Adolescencia (13+ años)': 0,
  'Sin especificar / No informado': 0
};

activeRecords.forEach(d => {
  const rawAge = d.childAge ? String(d.childAge).trim() : '';
  ageRawMap[rawAge || 'Sin dato'] = (ageRawMap[rawAge || 'Sin dato'] || 0) + 1;

  const parsed = parseInt(rawAge, 10);
  if (!isNaN(parsed) && parsed >= 0 && parsed <= 99) {
    ageList.push(parsed);
    if (parsed <= 3) ageGroupMap['Primera Infancia (0-3 años)']++;
    else if (parsed <= 6) ageGroupMap['Infancia Temprana (4-6 años)']++;
    else if (parsed <= 9) ageGroupMap['Infancia Intermedia (7-9 años)']++;
    else if (parsed <= 12) ageGroupMap['Pre-adolescencia (10-12 años)']++;
    else ageGroupMap['Adolescencia (13+ años)']++;
  } else {
    ageGroupMap['Sin especificar / No informado']++;
  }
});

const avgAge = ageList.length > 0 ? (ageList.reduce((a, b) => a + b, 0) / ageList.length).toFixed(1) : 0;
const sortedAges = [...ageList].sort((a, b) => a - b);
const medianAge = sortedAges.length > 0 ? (sortedAges.length % 2 !== 0 ? sortedAges[Math.floor(sortedAges.length / 2)] : (sortedAges[sortedAges.length / 2 - 1] + sortedAges[sortedAges.length / 2]) / 2) : 0;

// Age breakdown by attendance
const ageByAttendance = {};
activeRecords.forEach(d => {
  const parsed = parseInt(d.childAge, 10);
  const key = !isNaN(parsed) ? `${parsed} años` : 'Sin dato';
  if (!ageByAttendance[key]) ageByAttendance[key] = { total: 0, attended: 0, absent: 0 };
  ageByAttendance[key].total++;
  if (d.attended) ageByAttendance[key].attended++;
  else ageByAttendance[key].absent++;
});

// 4. Localities Analysis
const localityMap = {};
activeRecords.forEach(d => {
  const loc = (d.locality || 'Sin Especificar').trim();
  const normalized = loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase();
  if (!localityMap[normalized]) localityMap[normalized] = { total: 0, attended: 0 };
  localityMap[normalized].total++;
  if (d.attended) localityMap[normalized].attended++;
});

// 5. Clubs & Schools
const clubMap = {};
activeRecords.forEach(d => {
  const club = (d.clubOrSchool || 'Ninguno / Particular').trim();
  if (!clubMap[club]) clubMap[club] = { total: 0, attended: 0 };
  clubMap[club].total++;
  if (d.attended) clubMap[club].attended++;
});

// 6. Medical Notes / Special Needs
const medicalCases = activeRecords.filter(d => d.medicalNotes && d.medicalNotes.trim().length > 0);

// 7. Image Consent
const imageConsentYes = activeRecords.filter(d => d.imageConsent === true).length;
const imageConsentNo = activeRecords.filter(d => d.imageConsent === false).length;

// 8. Timestamps of Attendance (Peak hours)
const hourlyAttendance = {};
attended.forEach(d => {
  if (d.attendedAt) {
    const date = new Date(d.attendedAt);
    const hour = date.getUTCHours() - 3;
    const hourFormatted = `${(hour < 0 ? hour + 24 : hour).toString().padStart(2, '0')}:00 hs`;
    hourlyAttendance[hourFormatted] = (hourlyAttendance[hourFormatted] || 0) + 1;
  } else {
    hourlyAttendance['Acreditación Manual / Puerta'] = (hourlyAttendance['Acreditación Manual / Puerta'] || 0) + 1;
  }
});

// 9. Children per Family Distribution
const childrenPerFamily = {};
Object.values(familyGroupMap).forEach(children => {
  const count = children.length;
  const key = `${count} niño${count > 1 ? 's' : ''}`;
  childrenPerFamily[key] = (childrenPerFamily[key] || 0) + 1;
});

const reportData = {
  totalRecords,
  activeRecords: activeRecords.length,
  cancelledRecords: cancelledRecords.length,
  attended: attended.length,
  notAttended: notAttended.length,
  attendanceRate: parseFloat(attendanceRate),
  absenteeRate: parseFloat((100 - parseFloat(attendanceRate)).toFixed(2)),
  uniqueFamilyGroupsCount,
  uniqueTutorsCount: uniqueTutors.size,
  uniquePhonesCount: uniquePhones.size,
  totalAdultsEstimated,
  totalPeopleEstimated,
  totalAttendedPeopleEstimated,
  avgAge: parseFloat(avgAge),
  medianAge,
  minAge: sortedAges[0] || 0,
  maxAge: sortedAges[sortedAges.length - 1] || 0,
  ageGroupMap,
  ageRawMap,
  ageByAttendance,
  localityMap,
  clubMap,
  medicalCasesCount: medicalCases.length,
  medicalCases: medicalCases.map(m => ({ childName: m.childName, medicalNotes: m.medicalNotes, attended: m.attended })),
  imageConsentYes,
  imageConsentNo,
  hourlyAttendance,
  childrenPerFamily
};

fs.writeFileSync('scripts/infancias_metrics.json', JSON.stringify(reportData, null, 2));
console.log('Saved rich analysis to scripts/infancias_metrics.json');
