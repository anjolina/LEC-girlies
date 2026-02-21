// ...existing code...
const tops = [
  "image/top1.jpeg",
  "image/top2.jpeg",
  "image/top3.jpeg",
  "image/top4.jpeg"
];

const bottoms = [
  "image/bottom.jpeg",
  "image/bottom1.jpeg",
  "image/panta.jpeg"
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomOutfit() {
  const randomTop = getRandom(tops);
  const randomBottom = getRandom(bottoms);

  const topPreview = document.getElementById("topPreview");
  const bottomPreview = document.getElementById("bottomPreview");
  const aiOutput = document.getElementById("aiOutput");

  if (!topPreview || !bottomPreview || !aiOutput) {
    console.warn("Missing preview or output elements (topPreview, bottomPreview, aiOutput).");
    return;
  }

  console.log("Chosen images:", randomTop, randomBottom);
  console.log("Page URL:", document.location.href);

  const imgTop = new Image();
  const imgBottom = new Image();

  imgTop.onload = () => { topPreview.src = randomTop; };
  imgTop.onerror = () => { console.warn("Failed to load", randomTop); topPreview.src = "./image/placeholder.png"; };

  imgBottom.onload = () => { bottomPreview.src = randomBottom; };
  imgBottom.onerror = () => { console.warn("Failed to load", randomBottom); bottomPreview.src = "./image/placeholder.png"; };

  imgTop.src = randomTop;
  imgBottom.src = randomBottom;

  aiOutput.innerHTML = "✨ Cher recommends this outfit!";
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateBtn");
  if (btn) btn.addEventListener("click", generateRandomOutfit);
});
// ...existing code...