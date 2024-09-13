const skills = ['JavaScript','HTML', 'CSS', 'Python', 'MySQL', 'GitHub'];
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
};

const body = document.querySelector('body');
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.createElement('footer');
body.appendChild(footer);
const copyright = document.createElement('p');
copyright.innerHTML = "&copy; " + thisYear + " Alina Dalantaeva";
footer.appendChild(copyright);

const messageForm = document.forms['leave_message'];
messageForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const userName = event.target.usersName.value;
    const userEmail = event.target.usersEmail.value;
    const userMessage = event.target.usersMessage.value;

    console.log("Name: ", userName);
    console.log("Email: ", userEmail);
    console.log("Message: ", userMessage);

    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');

    const newMessage = document.createElement('li');
    newMessage.innerHTML = `
        <a href="mailto:${userEmail}">${userName}</a>: 
        <span>${userMessage}</span>
    `;
    const removeButton = document.createElement('button');
    removeButton.innerHTML = "Remove";
    removeButton.type = "button";
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function() {
        const entry = removeButton.parentNode;
        entry.remove();

        if (messageList.children.length === 0) {
            messageSection.style.display = 'none';
        }
    });
 
    function saveEdit() {
        const span = newMessage.querySelector('span');
        const textarea = span.querySelector('textarea');
        const newMessageText = textarea.value;
        span.innerHTML = newMessageText;
        editButton.textContent = "Edit";
        editButton.classList.remove('save-button');
        editButton.classList.add('edit-button');
        editButton.removeEventListener('click', saveEdit);
        editButton.addEventListener('click', startEdit);
    }
    
    function startEdit() {
        const span = newMessage.querySelector('span');
        const currentMessage = span.textContent;
        span.innerHTML = `<textarea>${currentMessage}</textarea>`;
        editButton.textContent = "Save";
        editButton.classList.remove('edit-button');
        editButton.classList.add('save-button');
        editButton.removeEventListener('click', startEdit);
        editButton.addEventListener('click', saveEdit);
    }

    const editButton = document.createElement('button');
    editButton.innerHTML = "Edit";
    editButton.type = "button";
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', startEdit);

    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    messageSection.style.display = 'block';

    messageForm.reset();
});

const closeNavButton = document.querySelector('.close-nav');
const openNavButton = document.querySelector('.open-nav');
const navigation = document.querySelector('.navigation');

closeNavButton.addEventListener("click", () => {
    navigation.classList.remove('navigation-open');
});

openNavButton.addEventListener("click", () => {
    navigation.classList.add('navigation-open')
});

const navLinks = document.querySelectorAll('.navigation a');

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove('navigation-open');
    });
});


const projectSection = document.getElementById('projects');
const projectList = projectSection.querySelector('ul');

fetch('https://api.github.com/users/Alina5884/repos')
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
    }
        return response.json();
    })
    .then(repositories => {
        for (let i = 0; i < repositories.length; i++) {
            const project = document.createElement('li');
            project.innerHTML = repositories[i].name;
            projectList.appendChild(project);
        }
    })
    .catch(error => {
        console.error('There was a problem: ', error);
    })

