import { saveToLocalStorage, getFromLocalStorage } from './localStorage.js';

const connections = getFromLocalStorage('connections');
let selectedNode = null;

export const addClickToConnect = (node) => {
    node.addEventListener('click', () => {
        if (!selectedNode) {
            selectedNode = node;
            node.classList.add('selected');
        } else if (selectedNode === node) {
            selectedNode.classList.remove('selected');
            selectedNode = null;
        } else {
            const line = new LeaderLine(selectedNode, node, { color: 'white', size: 2 });
            selectedNode.classList.remove('selected');
            selectedNode = null;

            // Stop motion and move nodes closer
            node.style.animation = 'none';
            selectedNode.style.animation = 'none';

            connections.push({ from: selectedNode, to: node });
            saveToLocalStorage('connections', connections);
        }
    });
};