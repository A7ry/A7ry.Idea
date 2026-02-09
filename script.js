const folderDiv = document.getElementById("folders");

for (let folder in vault) {

  // Folder title
  const header = document.createElement("h3");
  header.textContent = "📁 " + folder;
  folderDiv.appendChild(header);

  // File buttons
  vault[folder].forEach(path => {

    const fileName = path.split("/").pop();

    const btn = document.createElement("button");
    btn.textContent = "📄 " + fileName;

    btn.onclick = async () => {
      const res = await fetch(path);
      const text = await res.text();

      document.getElementById("title").textContent = fileName;
      document.getElementById("content").textContent = text;
    };

    folderDiv.appendChild(btn);
  });
}
