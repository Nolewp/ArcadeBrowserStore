// Function to decode URL parameters
function parseURLParams() {
    const params = new URLSearchParams(window.location.search); // Extract query parameters
    const title = params.get('title') ? decodeURIComponent(params.get('title')) : 'Title edit me!';
    const code = params.get('code') ? decodeURIComponent(params.get('code')) : '// Write your Arcade Script here';
    return { title, code };
}


// Extract and use URL parameters
const { title, code } = parseURLParams();
document.getElementById('pageTitleInput').value = title; // Set the title input value
document.title = title; // Update the browser's title

// Initialize CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'default',
    value: code
});
editor.setValue(code); // Set initial code from URL

// Add functionality to save the code and title
document.getElementById('runCode').innerText = 'Save Code & Title';

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }

 // Update button text
document.getElementById('runCode').addEventListener('click', () => {
    const updatedCode = encodeURIComponent(editor.getValue());
    const updatedTitle = encodeURIComponent(document.getElementById('pageTitleInput').value);
    const newURL = `${window.location.origin}${window.location.pathname}?title=${updatedTitle}&code=${updatedCode}`;
    history.replaceState(null, '', newURL); // Update the URL without refreshing
    document.title = document.getElementById('pageTitleInput').value; // Update browser title dynamically
    alert('Title and Code saved to URL!');
    copyToClipboard(newURL);


});
