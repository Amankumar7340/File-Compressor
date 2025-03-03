# File Compressor

A simple web-based file compressor that supports multiple compression techniques, including Huffman Coding, LZ77, DEFLATE, Brotli, and Zstandard. Users can upload or drag & drop a file, preview it, and compress it using different algorithms.

## Features

- **File Upload & Drag-Drop Support:** Users can select a file via the upload button or drag and drop it into the designated area.
- **Image Preview:** If the uploaded file is an image, it will be displayed before compression.
- **Multiple Compression Algorithms:** Supports five compression methods:
  - Huffman Coding
  - LZ77
  - DEFLATE
  - Brotli
  - Zstandard
- **Download Compressed Files:** Users can download the compressed versions of their uploaded file.
- **Stylish UI:** A modern, responsive design with a gradient background and glassmorphism effects.

## Weblink: (https://file-compressor-ak47.web.app/)

## Project Structure

```
/file-compressor
│── index.html         # Main HTML file
│── styles.css         # Stylesheet for UI
│── script.js          # Main JavaScript logic
```

## How It Works

1. Upload or drag and drop a file.
2. The selected file’s name and size appear, and an image preview is displayed if applicable.
3. Click the "Compress File" button.
4. The file is compressed using five different techniques.
5. Download the compressed versions from the results section.

## Compression Simulation

Currently, the compression algorithms are simulated by reducing file size using JavaScript slicing. Future improvements may include real implementations using WebAssembly or server-side processing.

## Future Enhancements

- Implement real compression algorithms.
- Support more file formats.
- Provide a progress bar for compression.

Feel free to modify the description based on your needs! 🚀
