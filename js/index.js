const skills = ['JavaScript','HTML', 'CSS', 'Python', 'MySQL', 'GitHub'];
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}

const body = document.querySelector('body');
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.createElement('footer');
body.appendChild(footer);
const copyright = document.createElement('p');
copyright.innerHTML = "&copy; Alina Dalantaeva " + thisYear;
footer.appendChild(copyright);
