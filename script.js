// script.js
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const previewContainer = document.getElementById('previewContainer');
    const compressBtn = document.getElementById('compressBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    let file = null;
    let compressedResults = []; // Store compressed files globally

    // Handle file upload
    fileInput.addEventListener('change', (e) => {
        file = e.target.files[0];
        if (file) {
            // Display file name and size
            previewContainer.innerHTML = `
                <p>Selected File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)</p>
            `;

            // Display image preview if the file is an image
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewContainer.innerHTML += `
                        <img src="${e.target.result}" alt="Uploaded Image">
                    `;
                };
                reader.readAsDataURL(file);
            }

            compressBtn.disabled = false;
        }
    });

    // Handle drag and drop
    const uploadContainer = document.querySelector('.upload-container');
    uploadContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });

    uploadContainer.addEventListener('dragleave', () => {
        uploadContainer.style.backgroundColor = 'transparent';
    });

    uploadContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadContainer.style.backgroundColor = 'transparent';
        file = e.dataTransfer.files[0];
        if (file) {
            // Display file name and size
            previewContainer.innerHTML = `
                <p>Selected File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)</p>
            `;

            // Display image preview if the file is an image
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewContainer.innerHTML += `
                        <img src="${e.target.result}" alt="Uploaded Image">
                    `;
                };
                reader.readAsDataURL(file);
            }

            compressBtn.disabled = false;
        }
    });

    // Handle compression
    compressBtn.addEventListener('click', async () => {
        if (file) {
            resultsContainer.innerHTML = '<p>Compressing... Please wait.</p>';
            compressedResults = await compressWithAllTechniques(file); // Store results globally
            displayResults(compressedResults);
        }
    });

    // Compress using all 5 techniques
    async function compressWithAllTechniques(file) {
        const results = [];

        // Huffman Coding
        const huffmanCompressed = await compressWithHuffman(file);
        results.push({ name: 'Huffman Coding', compressedFile: huffmanCompressed });

        // LZ77
        const lz77Compressed = await compressWithLZ77(file);
        results.push({ name: 'LZ77', compressedFile: lz77Compressed });

        // DEFLATE
        const deflateCompressed = await compressWithDeflate(file);
        results.push({ name: 'DEFLATE', compressedFile: deflateCompressed });

        // Brotli
        const brotliCompressed = await compressWithBrotli(file);
        results.push({ name: 'Brotli', compressedFile: brotliCompressed });

        // Zstandard
        const zstdCompressed = await compressWithZstd(file);
        results.push({ name: 'Zstandard', compressedFile: zstdCompressed });

        return results;
    }

    // Display compression results
    function displayResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach((result, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <span>${result.name}: ${(result.compressedFile.size / 1024).toFixed(2)} KB</span>
                <button class="download-btn" onclick="downloadFile('${result.name}', ${index})">Download</button>
            `;
            resultsContainer.appendChild(resultItem);
        });
    }

    // Download compressed file
    window.downloadFile = (name, index) => {
        const result = compressedResults[index]; // Access the global compressedResults array
        if (result && result.compressedFile) {
            const url = URL.createObjectURL(result.compressedFile);
            const a = document.createElement('a');
            a.href = url;
            a.download = `compressed_${name}_${file.name}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            console.error('Compressed file not found.');
        }
    };

    // Compression functions (simulated for demonstration)
    async function compressWithHuffman(file) {
        return new Blob([file.slice(0, file.size * 0.7)], { type: file.type });
    }

    async function compressWithLZ77(file) {
        return new Blob([file.slice(0, file.size * 0.65)], { type: file.type });
    }

    async function compressWithDeflate(file) {
        return new Blob([file.slice(0, file.size * 0.6)], { type: file.type });
    }

    async function compressWithBrotli(file) {
        return new Blob([file.slice(0, file.size * 0.55)], { type: file.type });
    }

    async function compressWithZstd(file) {
        return new Blob([file.slice(0, file.size * 0.5)], { type: file.type });
    }
});