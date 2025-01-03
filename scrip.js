const inputs = document.querySelectorAll(".css-controller input");
const cssOutput = document.getElementById("css-output");

inputs.forEach((input) => input.addEventListener("input", update));

function update() {
    const suffix = this.dataset.sizing || "";
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    displayCSS();
    updateDescription();
}

function displayCSS() {
    const cssText = `
    img {
        width: ${getComputedStyle(document.documentElement).getPropertyValue('--width')};
        padding: ${getComputedStyle(document.documentElement).getPropertyValue('--padding')};
        filter: blur(${getComputedStyle(document.documentElement).getPropertyValue('--blur')});
        background-color: ${getComputedStyle(document.documentElement).getPropertyValue('--base')};
        border-radius: ${getComputedStyle(document.documentElement).getPropertyValue('--border-radius')};
        top: ${getComputedStyle(document.documentElement).getPropertyValue('--position-top')};
        left: ${getComputedStyle(document.documentElement).getPropertyValue('--position-left')};
       
    }`;

    cssOutput.textContent = cssText;
}

function updateDescription() {
    const baseColor = document.getElementById("base").value;
    const width = document.getElementById("width").value;
    const borderRadius = document.getElementById("border-radius").value;
    const padding = document.getElementById("padding").value;
    const blur = document.getElementById("blur").value;
    const positionTop = document.getElementById("position-top").value;
    const positionLeft = document.getElementById("position-left").value;

    document.getElementById("base-description").textContent = `Changes the background color of the image. Current color: ${baseColor}`;
    document.getElementById("width-description").textContent = `Changes the width of the image to ${width}%.`;
    document.getElementById("border-radius-description").textContent = `Rounds the corners of the image with ${borderRadius}px.`;
    document.getElementById("padding-description").textContent = `Adjusts the padding of the image by ${padding}px.`;
    document.getElementById("blur-description").textContent = `Applies a blur effect of ${blur}px to the image.`;
    document.getElementById("position-top-description").textContent = `Moves the image ${positionTop}px down from the top.`;
    document.getElementById("position-left-description").textContent = `Moves the image ${positionLeft}px to the right.`;

}

// Initialize on page load
displayCSS();


// Reset Button Functionality
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', () => {
    window.location.reload(); // Reload the page to reset everything
});

const copyButton = document.getElementById('copyButton');

copyButton.addEventListener('click', () => {
    const cssText = cssOutput.textContent; // Get the text from the <pre> element
    
    // Create a temporary textarea element to select and copy the text
    const textarea = document.createElement('textarea');
    textarea.value = cssText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea); // Clean up the textarea element
    
    // Optional: Show a message or change button text for feedback
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = 'Copy CSS'; // Reset button text after 1 second
    }, 4000);
});
