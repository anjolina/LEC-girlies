// CASUAL
const casualTops = [
  "image/top1.jpeg",
  "image/top2.jpeg",
  "image/top3.jpeg",
  "image/top4.jpeg"
];

const casualBottoms = [
  "image/bottom.jpeg",
  "image/bottom1.jpeg",
  "image/panta.jpeg"
];

// FORMAL
const formalTops = [
  "image/top1.jpeg",
  "image/top2.jpeg"
];

const formalBottoms = [
  "image/bottom.jpeg",
  "image/panta.jpeg"
];

// TRADITIONAL (ONLY ONE IMAGE)
const traditionalOutfits = [
  "image/tra.jpeg",
  "image/tra1.jpeg",
  "image/tra2.jpeg"
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomOutfit() {
  const category = document.getElementById("category").value;

  const topPreview = document.getElementById("topPreview");
  const bottomPreview = document.getElementById("bottomPreview");
  const aiOutput = document.getElementById("aiOutput");

  if (!topPreview || !bottomPreview || !aiOutput) {
    console.warn("Missing elements");
    return;
  }

  // CASUAL
  if (category === "casual") {
    const top = getRandom(casualTops);
    const bottom = getRandom(casualBottoms);

    topPreview.src = top;
    bottomPreview.src = bottom;
    bottomPreview.style.display = "inline-block";

    aiOutput.innerHTML = "✨ Casual outfit selected!";
  }

  // FORMAL
  else if (category === "formal") {
    const top = getRandom(formalTops);
    const bottom = getRandom(formalBottoms);

    topPreview.src = top;
    bottomPreview.src = bottom;
    bottomPreview.style.display = "inline-block";

    aiOutput.innerHTML = "💼 Formal outfit selected!";
  }

  // TRADITIONAL
  else if (category === "traditional") {
    const outfit = getRandom(traditionalOutfits);

    topPreview.src = outfit;

    // HIDE bottom
    bottomPreview.style.display = "none";

    aiOutput.innerHTML = "🌸 Traditional outfit selected!";
  }
}