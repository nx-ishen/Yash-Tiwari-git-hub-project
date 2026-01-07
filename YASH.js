const username = "nx-ishen";
const container = document.getElementById("project-container");

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toDateString();
}

fetch("https://api.github.com/users/" + username + "/repos")
  .then(res => res.json())
  .then(repos => {
    repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .forEach(repo => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML =
          "<h3>" + repo.name + "</h3>" +
          "<p><strong>Description:</strong> " + (repo.description || "Not provided") + "</p>" +
          "<p><strong>Technology:</strong> " + (repo.language || "N/A") + "</p>" +
          "<p><strong>Created:</strong> " + formatDate(repo.created_at) + "</p>" +
          "<p><strong>Last Updated:</strong> " + formatDate(repo.updated_at) + "</p>" +
          "<a href='" + repo.html_url + "' target='_blank'>View Project</a>";

        container.appendChild(card);
      });
  })
  .catch(err => console.error("GitHub fetch error:", err));
