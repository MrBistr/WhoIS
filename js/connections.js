import { saveToStorage, getFromStorage } from './storage.js';

let lines = [];
export function getConnections() {
    return getFromStorage('connections', []);
}
export function setConnections(conns) {
    saveToStorage('connections', conns);
}

export function clearLines() {
    lines.forEach(line => line.remove());
    lines = [];
}

export function drawConnections(nodes) {
    clearLines();
    const nodeMap = {};
    document.querySelectorAll('.node').forEach(el => {
        nodeMap[el.dataset.nodeId] = el.querySelector('.circle');
    });
    const connections = getConnections();
    connections.forEach(conn => {
        const from = nodeMap[conn.from];
        const to = nodeMap[conn.to];
        if (from && to) {
            lines.push(new LeaderLine(from, to, { color: 'white', size: 2 }));
        }
    });
}