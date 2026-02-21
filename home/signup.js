document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  alert("🎉 Account created successfully!");

  // Redirect to home page
  window.location.href = "index.html";
});