"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const projects = await getProjects();
  displayProjects(projects);
  displayProjectsGrid(projects);
}

async function getProjects(){
  const response = await fetch ("https://extracurricularexam.connorkilroy.dk//wp-json/wp/v2/projects?acf_format=standard"); // Link to the JSON file, where the project data is kept.
const data = await response.json();
return data;
}

function displayProjects(projects) {
  const projectsList = document.querySelector("#projects-list");
  for (const post of projects){
    projectsList.insertAdjacentHTML(
      "beforeend",
      /*html*/ 
      `
      <li>${post.title.rendered}</li>
      `
    );
  }
}

function displayProjectsGrid(projects){
  const projectsGrid = document.querySelector("#projects-grid");

  for (const project of projects){
    console.log(project.acf.image); // Log the image URL to the console

    projectsGrid.insertAdjacentHTML( //In here is where all the so called attributes are being called, so the image, link, title and description
      "beforeend",
      /*html*/ 
      `
      <article class="grid-item">
        <img src="${project.acf.image}" alt="${project.title.rendered}" />
        <div class="grid-item-content">
          <h2>${project.acf.title}</h2>
          <p>${project.acf.description}</p>
          <p>${project.acf.client}</p>
          <a href="${project.acf.link}">${project.acf.link}</a>
          </div>
      </article>
      `
    )
  }
}

