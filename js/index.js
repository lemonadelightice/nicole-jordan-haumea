

const currentDate = new Date();
const thisYear = currentDate.getFullYear();

const footer = document.createElement('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `<small>Nicole Jordan &copy; ${thisYear}</small>`;

footer.appendChild(copyright);
document.body.appendChild(footer);

//const footer = document.querySelector('footer');

let skills = ["AWS Cloud", "JavaScript", "CSS", "HTML", "CSS", "JSON"];
let skillsSect = document.getElementById("skills");
let skillsList = document.createElement("ul");
skillsSect.appendChild(skillsList);

for (let skill of skills) {
    let skillItem = document.createElement("li");
    skillItem.innerText = skill;
    skillsList.appendChild(skillItem);
}

let messageForm = document.querySelector("[name='leave_message']");
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

//create a fetch for github repos
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
  projectSection.appendChild(projectList);

  for (let repository of repositories) {
    let project = document.createElement("li");
    project.innerText = repository.name;
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

































