'use strict'

/*
  Created by Spentine
  2024.3.13
*/

function download(url, name) {
  fetch(url) // url
    .then(resp => resp.status === 200 ? resp.blob() : Promise.reject('something went wrong'))
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = name; // name of file
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => alert('oh no!'));
}

function redir(x) {
  return (() => {
    document.location.href = x;
  });
}

function rDownload(url, name) {
  return (() => {
    download(url, name)
  });
}

const headerButtons = {
  "About": "/about",
  "Homepage": "/homepage",
  "Download": "/download",
  "Contact": "/contact",
  "GitHub": "/github",
  "Credits": "/credits",
  "Terms Of Use": "/termsOfUse",
  "Privacy Policy": "/privacyPolicy",
}

function load(e) {
  const header = document.getElementById("header");
  
  Object.keys(headerButtons).forEach((i) => {
    const n = document.createElement("button");
    n.classList.add("headerButton");
    n.innerHTML = i;
    n.onclick = redir(headerButtons[i]);
    header.appendChild(n);
  });
  
  document.getElementById("windowsDownload").onclick = rDownload("/downloadPage/downloadsDemo/Windows.txt", "Windows.txt");
  document.getElementById("macDownload").onclick = rDownload("/downloadPage/downloadsDemo/Mac.txt", "Mac.txt");
  document.getElementById("linuxDownload").onclick = rDownload("/downloadPage/downloadsDemo/Linux.txt", "Linux.txt");
}

function main() {
  document.addEventListener("DOMContentLoaded", load);
}

main();