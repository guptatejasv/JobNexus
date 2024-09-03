document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const data = {
      userId: userId,
      name: name,
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/user/job", {
        method: "GET",

        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      document.getElementById("result").innerText =
        result.message || "Signup successful!";
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("result").innerText =
        "Error: Could not complete signup.";
    }
  });
