const prisma = require("../../utils/database");
const puppeteer = require("puppeteer");

const getIngredientPrice = async (req, res) => {
  console.log("inside getIngredientPrice");
  console.log("req.query", req.query.ingredient);
  try {
    const shoppingUrl = `https://www.tesco.com/groceries/en-GB/search?query=${req.query.ingredient}`;
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    );
    await page.goto(shoppingUrl, { waitUntil: "networkidle2" });
    let data = await page.evaluate(() => {
      let results = [];
      let items = document.querySelectorAll(".product-details--wrapper");

      items.forEach((item) => {
        const priceEl = item.querySelector(".beans-price__text");
        const unitOfMeasureEl = item.querySelector(".beans-price__subtext");
        if (priceEl) {
          results.push({
            // product: item.querySelector(".ddsweb-link__text").innerText,
            price: parseFloat(priceEl.innerText.replace("£", "")),
            // unitOfMeasure: unitOfMeasureEl.innerText,
            link: item.querySelector(".ddsweb-link__anchor").href,
          });
        }
      });
      return results;
    });

    console.log("data: ", data);

    res.json(data);
    await browser.close();
  } catch (error) {
    console.error({ error });

    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getIngredientPrice,
};
