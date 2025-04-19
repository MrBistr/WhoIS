import { getNodes, setNodes, createNodeDOM, clearNodes } from './nodes.js';
import { getConnections, setConnections, drawConnections } from './connections.js';

let nodes = getNodes();
let connections = getConnections();
let selectedNodeId = null;

// Render everything
function render() {
    clearNodes();
    nodes.forEach(node => createNodeDOM(node, selectedNodeId));
    setTimeout(() => drawConnections(nodes), 0);
}

// Node creation logic
function addNode(name, jobTitle, image) {
    const id = 'n' + Date.now() + Math.floor(Math.random()*100000);
    // random position, not overlapping the title or form
    const top = `${Math.random() * 60 + 50}px`;
    const left = `${Math.random() * 70 + 10}%`;
    const node = { id, name, jobTitle, image, top, left, floating: true };
    nodes.push(node);
    setNodes(nodes);
    render();
}

// Click-to-connect logic
document.getElementById('nodes-container').addEventListener('click', function(e) {
    const nodeEl = e.target.closest('.node');
    if (!nodeEl) return;
    const nodeId = nodeEl.dataset.nodeId;
    if (!selectedNodeId) {
        selectedNodeId = nodeId;
        render();
    } else if (selectedNodeId === nodeId) {
        selectedNodeId = null;
        render();
    } else {
        // Connect and move closer
        if (!connections.find(c => (c.from === selectedNodeId && c.to === nodeId) || (c.from === nodeId && c.to === selectedNodeId))) {
            connections.push({ from: selectedNodeId, to: nodeId });
            setConnections(connections);

            // Move them closer visually & stop motion
            nodes = nodes.map(n => {
                if (n.id === nodeId || n.id === selectedNodeId) {
                    const el = document.querySelector(`.node[data-node-id="${n.id}"]`);
                    if (el) el.style.animation = 'none';
                    // Move to midpoint between their current positions
                    const other = nodes.find(nn => nn.id === (n.id === nodeId ? selectedNodeId : nodeId));
                    if (other) {
                        // Parse px/% positions
                        let t1 = parseFloat(n.top), l1 = parseFloat(n.left);
                        let t2 = parseFloat(other.top), l2 = parseFloat(other.left);
                        // If left is in %, convert to px for calculation
                        if (n.left.includes('%')) l1 = window.innerWidth * (l1/100);
                        if (other.left.includes('%')) l2 = window.innerWidth * (l2/100);
                        if (n.top.includes('%')) t1 = window.innerHeight * (t1/100);
                        if (other.top.includes('%')) t2 = window.innerHeight * (t2/100);
                        // Move closer by 35% of the distance
                        const newTop = t1 + 0.35 * (t2 - t1);
                        const newLeft = l1 + 0.35 * (l2 - l1);
                        n.top = `${newTop}px`;
                        n.left = `${newLeft}px`;
                        n.floating = false;
                    }
                }
                return n;
            });
            setNodes(nodes);
            selectedNodeId = null;
            render();
        }
    }
});

// Form open/close logic
const toggleBtn = document.getElementById('toggle-form-btn');
const inputForm = document.getElementById('input-form');
toggleBtn.onclick = function() {
    inputForm.classList.toggle('hidden');
};
// Close form on outside click
document.addEventListener('mousedown', (e) => {
    if (!inputForm.classList.contains('hidden') && !inputForm.contains(e.target) && !toggleBtn.contains(e.target)) {
        inputForm.classList.add('hidden');
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !inputForm.classList.contains('hidden')) {
        inputForm.classList.add('hidden');
    }
});

// Add node form handling
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
window.onload = render;