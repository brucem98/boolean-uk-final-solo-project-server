const prisma = require("../../utils/database");
const puppeteer = require('puppeteer');

const getPrice = (async () => {console.log("inside prices")
    try {
    const shoppingUrl = 'https://www.sainsburys.co.uk/shop/gb/groceries';
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
    await page.goto(shoppingUrl);
    let data = await page.evaluate(()=> {
    console.log("string here")
        let results = []
        let items = document.querySelectorAll('.mNavigationPropositionTile-titleTableRow')
        console.log("items: ", items)
        items.forEach((item) => {
            results.push({
                title: item.querySelector('.mNavigationPropositionTile-titleText').innerText
            })
        })
        return results
    })

    console.log("data: ", data)
    await browser.close();
  } catch (error) {
      console.error(error)
  }
})

// const getPrice = (async () => {console.log("insideprice")
//     let shoppingUrl = 'https://www.sainsburys.co.uk/shop/gb/groceries';

//     let browser = await puppeteer.launch();  
//     let page = await browser.newPage()

//     await page.goto(shoppingUrl, { waitUntil: 'networkidle2' }); 

    
//     let data = await page.evaluate(()=> { 

//         let title = document.querySelector('div[class="mNavigationPropositionTile-titleTableRow"]>h3').innerText
        
//         return {
//             title
//         }
//     })  

//     console.log("data: ", data);

//     await browser.close();
// })();




module.exports = {
    getPrice
}