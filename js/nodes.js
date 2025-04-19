import { saveToLocalStorage, getFromLocalStorage } from './localStorage.js';
import { addClickToConnect } from './connections.js';

const nodesContainer = document.getElementById('nodes-container');
const nodes = getFromLocalStorage('nodes');

export const createNode = ({ name, jobTitle, image }) => {
    const node = document.createElement('div');
    node.classList.add('node');
    node.style.top = `${Math.random() * 90}vh`;
    node.style.left = `${Math.random() * 90}vw`;

    if (image) {
        const img = document.createElement('img');
        img.src = image;
        node.appendChild(img);
    } else {
        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        node.appendChild(avatar);
    }

    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');
    textContainer.innerHTML = `<strong>${name}</strong><br>${jobTitle}`;
    node.appendChild(textContainer);

    nodesContainer.appendChild(node);
    nodes.push({ name, jobTitle, image });
    saveToLocalStorage('nodes', nodes);

    addClickToConnect(node);
};

nodes.forEach(createNode);