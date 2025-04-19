document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name-input');
    const jobTitleInput = document.getElementById('job-title-input');
    const imageUpload = document.getElementById('image-upload');
    const addNodeBtn = document.getElementById('add-node-btn');
    const toggleFormBtn = document.getElementById('toggle-form-btn');
    const inputForm = document.getElementById('input-form');
    const nodesContainer = document.getElementById('nodes-container');
    const nodes = [];
    let selectedNode = null;

    // Toggle the visibility of the "Add a Node" form
    toggleFormBtn.addEventListener('click', () => {
        inputForm.classList.toggle('hidden');
    });

    // Add a new node on button click
    addNodeBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const jobTitle = jobTitleInput.value.trim();
        const file = imageUpload.files[0];

        if (!name || !jobTitle) {
            alert('Please fill in both name and job title!');
            return;
        }

        const node = document.createElement('div');
        node.classList.add('node');
        node.style.top = `${Math.random() * 90}vh`;
        node.style.left = `${Math.random() * 90}vw`;

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                node.appendChild(img);
            };
            reader.readAsDataURL(file);
        }

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');
        textContainer.innerHTML = `<strong>${name}</strong><br>${jobTitle}`;

        node.appendChild(textContainer);
        nodesContainer.appendChild(node);
        nodes.push(node);

        // Reset inputs
        nameInput.value = '';
        jobTitleInput.value = '';
        imageUpload.value = '';

        // Add click-to-connect functionality
        addClickToConnect(node);
    });

    function addClickToConnect(node) {
        node.addEventListener('click', () => {
            if (!selectedNode) {
                // Select the first node
                selectedNode = node;
                node.classList.add('selected'); // Optional: Add a CSS style for the selected node
            } else if (selectedNode === node) {
                // Deselect the node if clicked again
                selectedNode.classList.remove('selected');
                selectedNode = null;
            } else {
                // Create a connection between the selected node and the clicked node
                new LeaderLine(selectedNode, node, { color: 'white', size: 2 });
                selectedNode.classList.remove('selected');
                selectedNode = null; // Reset selection
            }
        });
    }
});