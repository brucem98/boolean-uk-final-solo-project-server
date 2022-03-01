const prisma = require("../../utils/database");
const puppeteer = require('puppeteer');


const getIngredientPrice = (async (req, res) => {console.log("inside getIngredientPrice")
console.log("req.query", req.query.ingredient)
try {
    const shoppingUrl = `https://www.tesco.com/groceries/en-GB/search?query=${req.query.ingredient}`;
    const browser = await puppeteer.launch({ 'args' : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]});
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.goto(shoppingUrl, {waitUntil: 'networkidle2'});
    let data = await page.evaluate(()=> {
        let results = []
        let items = document.querySelectorAll('.product-tile-wrapper')
        
        items.forEach((item) => {
            const priceEl = item.querySelector('.value')
            const unitOfMeasureEl = item.querySelector('.weight')
            if (priceEl){
            results.push({
                product: item.querySelector('.ui__StyledLink-sc-18aswmp-0').innerText,
                price: parseFloat(priceEl.innerText),
                unitOfMeasure: unitOfMeasureEl.innerText.replace('/',''),
                link: item.querySelector('.ui__StyledLink-sc-18aswmp-0').href
            })
        }
        })
        return results
    })

    console.log("data: ", data)

    res.json(data)
    await browser.close();
  } catch (error) {
      console.error({error})

      res.status(500).json({ error: error.message })
  }


})




module.exports = {
    getIngredientPrice
}


