const scrapeBtn = document.getElementById("scrapeBtn");
const resultsContainer = document.getElementById("results");

scrapeBtn.addEventListener("click", async () => {
  const keyword = document.getElementById("keyword").value.trim();

  if (!keyword) {
    alert("Please enter a search keyword");
    return;
  }

  resultsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`http://localhost:3000/api/scrape?keyword=${(keyword)}`);
    const data = await res.json();

    if (!Array.isArray(data)) {
      resultsContainer.innerHTML = `<p>Error: ${data.error || "Something went wrong."}</p>`;
      return;
    }

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
});
