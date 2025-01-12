// Function to decode URL parameters
function parseURLParams() {
    const params = new URLSearchParams(window.location.search); // Extract query parameters
    const title = params.get('title') ? decodeURIComponent(params.get('title')) : 'Title edit me!';
    const code = params.get('code') ? decodeURIComponent(params.get('code')) : '// Write your Arcade Script here';
    const saves = params.get('saves') ? decodeURIComponent(params.get('saves')) : 0;
    return { title, code, saves };
}


// Extract and use URL parameters
var { title, code, saves } = parseURLParams();
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

document.getElementById('runCode').addEventListener('click', () => {
    const updatedCode = encodeURIComponent(editor.getValue());
    const updatedTitle = encodeURIComponent(document.getElementById('pageTitleInput').value);
    const updatedSavesNumber =  encodeURIComponent(saves +=1)
    const newURL = `${window.location.origin}${window.location.pathname}?title=${updatedTitle}&saves=${updatedSavesNumber}&code=${updatedCode}`;
    history.replaceState(null, '', newURL); // Update the URL without refreshing
    document.title = document.getElementById('pageTitleInput').value; // Update browser title dynamically
    if (saves == 1){
      alert('Welcome to the Arcade Browser Store! After saving, the URL is encoded with the information in your browser. This makes it easy to share the URL or bookmark it for quick access later.');
    }
    else{
      alert('Title and Code saved to URL!');
    }
    copyToClipboard(newURL);


});
