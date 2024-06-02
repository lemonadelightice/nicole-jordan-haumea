//add functionality to nav bar
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll('#navigation a');

  navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          targetSection.scrollIntoView({ behavior: 'smooth' });
      });
  });
});

//Skills section

let skills = ["JavaScript", "HTML", "CSS", "AWS Cloud"];
let skillsContainer = document.getElementById("skills-container");
console.log("Skills Container:", skillsContainer);

for(let skill of skills) {
  let skillItem = document.createElement("div");
  skillItem.className = "skill-item";
  skillItem.innerText = skill;
  skillsContainer.appendChild(skillItem);
}

//create a fetch for github repos for projects
const userName = "lemonadelightice";

fetch(`https://api.github.com/users/${userName}/repos`)   

 .then((response) => {
    if (response.ok) {
      return response.text();
      } else {
        throw new Error("Failed to fetch repositories");
      }
    })
  .then((data) => {
    const repositories = JSON.parse(data);
    console.log(repositories);
 
  //DOM to select Projects section by ID
  const projectSection = document.getElementById("projects");

  //Create ul in projects section
  let projectList = document.createElement("ul");
  projectList.classList.add("project-list");
  projectSection.appendChild(projectList);

    for (let repository of repositories) {
    let project = document.createElement("li");
    project.classList.add("project-item");
    let link = document.createElement("a");
    link.href = repository.html_url;
    link.textContent = repository.name;
    link.classList.add("button-link");
    project.appendChild(link);
    projectList.appendChild(project);
  }
  })

 .catch((error) => {
    if (error instanceof SyntaxError) {
        console.error("Unparsable response from server");
    } else {
        console.error("Error fetching data: ", error.message);
    }
});


//Create Message Section
let messageForm = document.querySelector("[name='leave-message']");
let messageSection = document.getElementById('message-section');
let messageList = messageSection.querySelector('ul');
messageSection.hidden = true;

let idCounter = 0;

function makeId() {
    let id= 'entry' + idCounter++;
    return id;
}

let entryById={};

//handle message form submission

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message', message);
    let uid = makeId();
    let newMessage = document.createElement('li');
    newMessage.classList.add('message-item');

    newMessage.innerHTML = `<a href="mailto:${email} ">${name} </a><span>wrote: ${message} </span>`;
    newMessage.setAttribute('id', uid);

    entryById[uid] = { usersName: name, usersEmail: email, usersMessage: message };
    newMessage.appendChild(makeRemoveButton());

    messageList.appendChild(newMessage);
    messageForm.reset();
    messageSection.hidden = false;
});

//Create remove button
function makeRemoveButton() {
    let removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
        let entry = removeButton.parentNode;
        let uid1 = entry.getAttribute('id');
        delete entryById[uid1];
        entry.remove();
        if (messageList.childElementCount === 0) {
            messageSection.hidden = true;
        };
    });
    return removeButton;
};

//Footer
const currentDate = new Date();
const thisYear = currentDate.getFullYear();

const footer = document.createElement('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `<small>Nicole Jordan &copy; ${thisYear}</small>`;

footer.appendChild(copyright);
document.body.appendChild(footer);





























