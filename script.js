const inputFileUpload = document.getElementById("file-upload");
const canvas = document.getElementById("image-canvas");
const ctx = canvas.getContext("2d");
const textarea = document.getElementById("image-textarea");
const stepCount = document.getElementById("step-count");
const lineHeight = document.getElementById("line-height");
const letterSpacing = document.getElementById("letter-spacing");
const densityString = document.getElementById("density-string");

textarea.style.lineHeight = `${lineHeight.value}px`;
textarea.style.letterSpacing = `${letterSpacing.value}px`;

inputFileUpload.addEventListener("change", () => {
    readImage();
    convertToASCII();
});

stepCount.addEventListener("change", () => {
    convertToASCII();
});

lineHeight.addEventListener("change", () => {
    textarea.style.lineHeight = `${lineHeight.value}px`;
});

letterSpacing.addEventListener("change", () => {
    textarea.style.letterSpacing = `${letterSpacing.value}px`;
});

densityString.addEventListener("keydown", () => {
    convertToASCII();
});

function readImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let imgSrc = "";
    if (inputFileUpload.value !== "") {
        imgSrc = window.URL.createObjectURL(inputFileUpload.files[0]);
    }

    const img = new Image();
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    }
    img.src = imgSrc;
}

function convertToASCII() {
    textarea.value = "";

    if (inputFileUpload.value == "" || densityString.value == "") {
        return;
    }

    setTimeout(() => {
        for (let i = 0; i < canvas.height; i += +stepCount.value) {
            for (let j = 0; j < canvas.width; j += +stepCount.value) {
                const imageData = ctx.getImageData(j, i, 1, 1).data;
                const whiteDensity = (imageData[0] + imageData[1] + imageData[2]) / 3;
                const densityIndex = Math.floor((densityString.value.length - 1) * whiteDensity / 255);
                textarea.value += densityString.value[densityIndex];
            }
            textarea.value += "\n";
        }
    }, 100);
}
