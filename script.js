const folderDiv = document.getElementById("folders");

vault.forEach(folder => {
  // Folder title with icon
  const header = document.createElement("h3");
  header.textContent = `${folder.icon} ${folder.name}`;
  folderDiv.appendChild(header);

  // File buttons
  folder.files.forEach(path => {
    const fileName = path.split("/").pop();
    const btn = document.createElement("button");
    btn.textContent = `📄 ${fileName}`;

    btn.onclick = async () => {
      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error("File not found");
        const text = await res.text();
        document.getElementById("title").textContent = fileName;
        document.getElementById("content").textContent = text;
      } catch (err) {
        document.getElementById("content").textContent =
          "ERROR loading file.\n" + err;
      }
    };

    folderDiv.appendChild(btn);
  });
});
