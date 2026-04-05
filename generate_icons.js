const fs = require('fs');

console.log("Checking for logo.png...");
if (!fs.existsSync('logo.png')) {
  console.error("❌ logo.png not found! Please place your logo in this folder before running.");
  process.exit(1);
}

// We rely on Jimp to prevent needing compiled binaries like Sharp
const Jimp = require('jimp');

async function generateFavicons() {
  console.log("Found logo.png! Processing...");
  try {
    const image = await Jimp.read('logo.png');

    const sizes = [16, 32, 48];
    for (const size of sizes) {
      const clone = image.clone();
      // Use cover to properly center and pad if the image isn't perfectly square
      clone.cover(size, size).quality(100);
      const outputName = `favicon-${size}x${size}.png`;
      await clone.writeAsync(outputName);
      console.log(`✅ Generated ${outputName}`);
    }

    console.log("\nAll favicons generated successfully!");
    console.log("Refresh your browser to see the new layout.");

  } catch (err) {
    console.error("Error processing image:", err.message);
  }
}

generateFavicons();
