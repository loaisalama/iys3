async function startCheck() {
  const data = document.getElementById("dataInput").value.trim().split("\n");
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  for (const line of data) {
    const [cc, dd, yy, vv] = line.split("|");
    const response = await fetch("/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cc, dd, yy, vv }),
    });

    const resultText = await response.text();
    const div = document.createElement("div");
    div.className = "result " + (response.ok ? "success" : "failed");
    div.textContent = resultText;
    resultsContainer.appendChild(div);
  }
}