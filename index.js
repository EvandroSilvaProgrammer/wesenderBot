const express = require('express');
const app = express();
const puppeteer = require('puppeteer');


app.get('https://app.wesender.co.ao/auth/', async(req, res) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://app.wesender.co.ao/auth/');
    //await page.screenshot({ path: 'example.png' });
    await page.waitForTimeout(2500); // espera 2 segundo e meio para a próxma linha 

    // // await page.waitForSelector("nomedoseletor");
    // // await page.click("nomedoseletor");

    await page.waitForSelector('#email');
    await page.type("#email", "edgar.chiquito@geniusideas.co.ao");

    await page.type("#password", "GI_EcSe_sms_8789"); // await page.type("#password", "GI_EcSe_sms_8789", { delay: 100 });
    await page.click("#btn-load");
    await page.waitForTimeout(2500);


    const pageData = await page.evaluate(() => {
        return {
            smsEnviadas: document.querySelector('.card.shadow.h-100.py-2.border-left-warning').querySelector('.h5.mb-0.font-weight-bold.text-gray-800').innerText,
        };
    });

    const mensagensRestantes = 738 - (pageData.smsEnviadas - 2905);
    //2905 é o número de mensagens que já foram enviadas até o momento que este script foi escrito... Então as novas mensagens comecam a contar a partir daqui.
    await browser.close();

    res.send({
        "smsEnviadas": pageData.smsEnviadas,
        "mensagensRestantes": mensagensRestantes,
        // "smsEnviadas": "pageData.smsEnv"

    })
});


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});




// (async() => {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto('https://app.wesender.co.ao/auth/');

//     // await page.waitForSelector("nomedoseletor");
//     // await page.click("nomedoseletor");

//     await page.waitForSelector('#email');
//     await page.type("#email", "edgar.chiquito@geniusideas.co.ao", { delay: 100 });
//     await page.type("#password", "GI_EcSe_sms_8789", { delay: 100 });
//     await page.click("#btn-load");


//     //await page.screenshot({ path: 'example.png' });

//     // await browser.close();
// })();