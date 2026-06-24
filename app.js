import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
  // ADD YOUR FIREBASE CONFIG HERE
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function now() {
  return new Date().toLocaleTimeString();
}

window.logEvent = function(type) {
  const empId = document.getElementById('emp').value;
  if (!empId) return alert('Enter ID');

  set(ref(db, 'employees/' + empId), {
    status: type,
    time: now()
  });

  document.getElementById('msg').textContent = type + ' logged';
};

let allData = {};

window.listenData = function() {
  onValue(ref(db, 'employees'), (snap) => {
    allData = snap.val() || {};
    renderDashboard();
  });
};

window.renderDashboard = function() {
  const el = document.getElementById('dashboard');
  let html = '';

  Object.keys(allData).forEach(id => {
    html += `<p>#${id} - ${allData[id].status}</p>`;
  });

  el.innerHTML = html;
};