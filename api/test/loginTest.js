"use strict";
var webdriver = require("selenium-webdriver"),
By = webdriver.By,
assert = require('assert'),
until = webdriver.until;
 

async function login(){
    try{
        var driver = new webdriver.Builder().forBrowser('chrome').build();


        await driver.get('https://cambionelson.karenstoletniy1996.now.sh');

        await driver.findElement(By.id('mat-input-0')).sendKeys('user@mail.com')
        await driver.findElement(By.id('mat-input-1')).sendKeys('1234');
        var loginButton = await driver.findElements(By.className('mat-raised-button'));
        await loginButton[0].click();

       driver.wait(until.elementLocated(By.className('mat-button-wrapper')), 10 * 1000).then(el => {
            var currentTitle = driver.getCurrentUrl().then(function(url) {
                console.log("The title is: " + url)
                assert.equal(url, "https://cambionelson.karenstoletniy1996.now.sh/publicaciones");
            });
        });


        




        //driver.quit();
    }

    catch(err){
        console.log(err);
    }

}

module.exports = login();
