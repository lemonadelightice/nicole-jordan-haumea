

const currentDate = new Date();
const thisYear = currentDate.getFullYear();

const footer = document.createElement('footer');
const copyright = document.createElement('p');
copyright.innerHTML = `<small>Nicole Jordan &copy; ${thisYear}</small>`

footer.appendChild(copyright);
document.body.appendChild(footer);

//const footer = document.querySelector('footer');

let specSkills = ["AWS Cloud", "JavaScript", "CSS", "HTML", "CSS", "JSON"];
let skillsSect = document.getElementById("skills")
let skillsList = document.createElement("ul");
skillsSect.appendChild(skillsList);

for (let specSkill of specSkills) {
    let skillItem = document.createElement("li");
    skillItem.innerText = specSkill;
    skillsList.appendChild(skillItem);
}




























