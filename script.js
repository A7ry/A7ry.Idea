const folderDiv = document.getElementById("folders");

vault.forEach(folder => {
  // === Folder Button ===
  const folderBtn = document.createElement("button");
  folderBtn.textContent = `${folder.icon} ${folder.name}`;
  folderBtn.style.fontWeight = "bold";

  // === Dropdown Container ===
  const dropdown = document.createElement("div");
  dropdown.style.display = "none";
  dropdown.style.marginLeft = "15px";

  // Toggle open/close
  folderBtn.onclick = () => {
    dropdown.style.display =
      dropdown.style.display === "none" ? "block" : "none";
  };

  // === Add Files Inside Folder ===
  folder.files.forEach(path => {
    const fileName = path.split("/").pop();

    const fileBtn = document.createElement("button");

    // Decide icon based on file type
    if (fileName.endsWith(".txt")) {
      fileBtn.textContent = `📄 ${fileName}`;
    } else if (fileName.endsWith(".png")) {
      fileBtn.textContent = `🖼️ ${fileName}`;
    } else {
      fileBtn.textContent = `📦 ${fileName}`;
    }

    fileBtn.style.fontWeight = "normal";

    fileBtn.onclick = async () => {
      openFile(path, fileName);
    };

    dropdown.appendChild(fileBtn);
  });

  // Add folder + dropdown to page
  folderDiv.appendChild(folderBtn);
  folderDiv.appendChild(dropdown);
});


// === File Viewer Logic ===
async function openFile(path, fileName) {
  const title = document.getElementById("title");
  const content = document.getElementById("content");

  title.textContent = fileName;

  // If it's a text file
  if (fileName.endsWith(".txt")) {
    const res = await fetch(path);
    const text = await res.text();

    content.innerHTML = "";
    content.textContent = text;
  }

  // If it's an image
  else if (fileName.endsWith(".png")) {
    content.innerHTML = "";

    const img = document.createElement("img");
    img.src = path;
    img.style.maxWidth = "100%";
    img.style.border = "1px solid white";
    img.style.marginTop = "10px";

    content.appendChild(img);
  }

  // Unknown file type
  else {
    content.textContent = "Unsupported file type.";
  }
}
