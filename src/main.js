const scrapeBtn = document.getElementById("scrapeBtn");
const keywordInput = document.getElementById("keyword");
const resultsContainer = document.getElementById("results");

async function scrape() {
  const keyword = keywordInput.value.trim();

  if (!keyword) {
    alert("Please enter a search keyword");
    return;
  }

  resultsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`); // Adjust the URL as needed, this is the local server URL for the backend
    const data = await res.json();

    if (!Array.isArray(data)) {
      resultsContainer.innerHTML = `<p>Error: ${data.error || "Something went wrong."}</p>`;
      return;
    }

    //this is where we will display the results by iterating over the data array
    resultsContainer.innerHTML = data
      .map(
        (item) => `
        <div class="product">
          <img src="${item.imageUrl}" alt="${item.title}" />
          <div class="product-details">
            <h3>${item.title}</h3>
            <p>⭐ ${item.rating || "N/A"} | 🗳️ ${item.reviewsNumber || "0 reviews"}</p>
          </div>
        </div>`
      )
      .join("");
  } catch (err) {
    resultsContainer.innerHTML = `<p>Fetch failed: ${err.message}</p>`;
  }
}

scrapeBtn.addEventListener("click", scrape);

keywordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    scrape();
  }
});
