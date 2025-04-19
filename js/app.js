import { getNodes, setNodes, createNodeDOM, clearNodes } from './nodes.js';
import { getConnections, setConnections, drawConnections } from './connections.js';
import { getGroups, setGroups, createGroupDOM, clearGroups, randomColor } from './groups.js';

let nodes = getNodes();
let connections = getConnections();
let groups = getGroups();
let selectedNodeId = null;
let selectedGroupId = null;

function render() {
    clearNodes();
    clearGroups();
    nodes.forEach((node, idx) => createNodeDOM(node, node.id === selectedNodeId, idx === 0));
    groups.forEach(g => createGroupDOM(g, g.id === selectedGroupId));
    setTimeout(() => drawConnections(nodes, groups), 0);
}

// --- Add Node Button Logic ---
const addNodeFab = document.getElementById('add-node-fab');
const inputForm = document.getElementById('input-form');
addNodeFab.addEventListener('click', function(e) {
    e.stopPropagation();
    inputForm.classList.remove('hidden');
    groupForm.classList.add('hidden');
    document.getElementById('name-input').focus();
});

// --- Add Group Button Logic ---
const groupBtn = document.getElementById('add-group-btn');
const groupForm = document.getElementById('group-form');
groupBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    groupForm.classList.remove('hidden');
    inputForm.classList.add('hidden');
    document.getElementById('group-name-input').focus();
});

// --- Hide forms on click outside or ESC ---
document.addEventListener('mousedown', (e) => {
    if (!inputForm.classList.contains('hidden') && !inputForm.contains(e.target) && !addNodeFab.contains(e.target)) {
        inputForm.classList.add('hidden');
    }
    if (!groupForm.classList.contains('hidden') && !groupForm.contains(e.target) && !groupBtn.contains(e.target)) {
        groupForm.classList.add('hidden');
    }
});
document.addEventListener('touchstart', (e) => {
    if (!inputForm.classList.contains('hidden') && !inputForm.contains(e.target) && !addNodeFab.contains(e.target)) {
        inputForm.classList.add('hidden');
    }
    if (!groupForm.classList.contains('hidden') && !groupForm.contains(e.target) && !groupBtn.contains(e.target)) {
        groupForm.classList.add('hidden');
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        inputForm.classList.add('hidden');
        groupForm.classList.add('hidden');
    }
});

// --- Add node form handling ---
document.getElementById('add-node-btn').onclick = function() {
    const name = document.getElementById('name-input').value.trim();
    const jobTitle = document.getElementById('job-title-input').value.trim();
    const fileInput = document.getElementById('image-upload');
    if (!name || !jobTitle) {
        alert('Please fill in all fields.');
        return;
    }
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            addNode(name, jobTitle, e.target.result);
            inputForm.classList.add('hidden');
            fileInput.value = '';
            document.getElementById('name-input').value = '';
            document.getElementById('job-title-input').value = '';
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        addNode(name, jobTitle, null);
        inputForm.classList.add('hidden');
        document.getElementById('name-input').value = '';
        document.getElementById('job-title-input').value = '';
    }
};

// --- Add group form handling ---
document.getElementById('create-group-btn').onclick = function() {
    const groupName = document.getElementById('group-name-input').value.trim();
    if (!groupName) {
        alert('Please enter a group name.');
        return;
    }
    addGroup(groupName);
    groupForm.classList.add('hidden');
    document.getElementById('group-name-input').value = '';
};

function addNode(name, jobTitle, image) {
    const id = 'n' + Date.now() + Math.floor(Math.random()*100000);
    let top, left;
    if (nodes.length === 0) {
        top = `${window.innerHeight/2 - 60}px`;
        left = `${window.innerWidth/2 - 60}px`;
    } else {
        top = `${Math.random() * (window.innerHeight-110) + 50}px`;
        left = `${Math.random() * (window.innerWidth-110) + 10}px`;
    }
    const node = { id, name, jobTitle, image, top, left, floating: true };
    nodes.push(node);
    setNodes(nodes);
    render();
}
function addGroup(name) {
    const id = 'g' + Date.now() + Math.floor(Math.random()*100000);
    const top = `${Math.random() * (window.innerHeight-60) + 30}px`;
    const left = `${Math.random() * (window.innerWidth-60) + 10}px`;
    const color = randomColor();
    const group = { id, name, color, top, left };
    groups.push(group);
    setGroups(groups);
    render();
}

// The rest of your node/group interaction and floating logic goes here...

window.onload = render;