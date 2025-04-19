import { createNode } from './nodes.js';

document.getElementById('add-node-btn').addEventListener('click', () => {
    const name = document.getElementById('name-input').value.trim();
    const jobTitle = document.getElementById('job-title-input').value.trim();
    const imageFile = document.getElementById('image-upload').files[0];

    if (!name || !jobTitle) {
        alert('Please fill in all the fields.');
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const image = reader.result;
        createNode({ name, jobTitle, image });
    };

    if (imageFile) reader.readAsDataURL(imageFile);
    else createNode({ name, jobTitle, image: null });

    document.getElementById('name-input').value = '';
    document.getElementById('job-title-input').value = '';
    document.getElementById('image-upload').value = '';
    document.getElementById('input-form').classList.add('hidden');
});