// At the top of app.js (after const db = ...)
let allData = {};

window.listenData = function() {
  console.log("🔄 Setting up Firebase listener...");

  onValue(ref(db, "employees"), (snapshot) => {
    console.log("📡 Data received from Firebase!", snapshot.val());
    allData = snapshot.val() || {};
    renderDashboard();
  }, (error) => {
    console.error("❌ Firebase listener error:", error);
    document.getElementById("dashboard").innerHTML = 
      `<p style="color:red;text-align:center;">Firebase Error: ${error.message}</p>`;
  });
};

window.renderDashboard = function(filterStatus = "", filterTask = "") {
  const container = document.getElementById("dashboard");
  if (!container) return;

  let html = "";

  if (Object.keys(allData).length === 0) {
    container.innerHTML = "<p style='text-align:center;'>No employees logged yet. Use the operator page first.</p>";
    return;
  }

  // ... rest of your renderDashboard code remains the same