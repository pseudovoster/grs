// Signup
document.getElementById("signupForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value
  };
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
  window.location.href = "login.html";
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const uname = document.getElementById("loginUsername").value;
  const pwd = document.getElementById("loginPassword").value;
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === uname && u.password === pwd);
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = user.role === "admin" ? "admin.html" : "user.html";
  } else {
    document.getElementById("loginMessage").innerText = "Invalid credentials!";
  }
});

// Grievance submission
document.getElementById("grievanceForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const complaint = document.getElementById("complaintText").value;
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  let complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
  complaints.push({ username: user.username, complaint });
  localStorage.setItem("complaints", JSON.stringify(complaints));
  document.getElementById("statusMessage").innerText = "Grievance submitted!";
  document.getElementById("grievanceForm").reset();
});

// Load complaints (admin)
if (document.getElementById("grievanceList")) {
  const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
  const list = document.getElementById("grievanceList");
  if (complaints.length === 0) {
    list.innerHTML = "<p>No complaints found.</p>";
  } else {
    complaints.forEach(c => {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${c.username}:</strong> ${c.complaint}`;
      list.appendChild(p);
    });
  }
}
