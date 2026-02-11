const folderDiv = document.getElementById("folders");

vault.forEach(folder => {
  const folderBtn = document.createElement("button");
  folderBtn.textContent = `${folder.icon} ${folder.name}`;
  folderBtn.style.fontWeight = "bold";

  const dropdown = document.createElement("div");
  dropdown.style.display = "none";
  dropdown.style.marginLeft = "15px";

  folderBtn.onclick = () => {
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  };

  folder.files.forEach(path => {
    const fileName = path.split("/").pop();
    const fileBtn = document.createElement("button");

    if (fileName.endsWith(".txt")) {
      fileBtn.textContent = `📄 ${fileName}`;
    } else if (fileName.endsWith(".png")) {
      fileBtn.textContent = `🖼️ ${fileName}`;
    }

    fileBtn.onclick = () => openFile(path, fileName);
    dropdown.appendChild(fileBtn);
  });

  folderDiv.appendChild(folderBtn);
  folderDiv.appendChild(dropdown);
});

async function openFile(path, fileName) {
  const title = document.getElementById("title");
  const content = document.getElementById("content");

  title.textContent = fileName;

  if (fileName.endsWith(".txt")) {
    const res = await fetch(path);
    const text = await res.text();
    content.textContent = text;
  }

  if (fileName.endsWith(".png")) {
    content.innerHTML = "";
    const img = document.createElement("img");
    img.src = path;
    img.style.maxWidth = "100%";
    content.appendChild(img);
  }
}
