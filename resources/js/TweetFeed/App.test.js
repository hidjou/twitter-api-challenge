const puppeteer = require('puppeteer')

// Create puppeteer instance and go to app
async function launchBrowser(options) {
    // const app = 'http://twitterapi.test/'
    const app = 'http://localhost:8000'
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage()

    await page.goto(app)

    return { browser, page }
}

// UI tests
test('Validating Handle input field', async () => {
    const { browser, page } = await launchBrowser()

    // Type empty string
    await page.click('input#handle')
    await page.type('input#handle', ' ')

    // Submit form by pressing enter
    await page.keyboard.press('Enter')

    // Get input field css classes
    let handleInputClasses = await page.$eval(
        'input#handle',
        // (Using Object.values() as the classList returned by puppeteer is an object and not an array)
        (input) => Object.values(input.classList)
    )

    // Check for invalid input
    expect(handleInputClasses).toContain('is-invalid')

    // Close browser
    await browser.close()
})

// Test suggestion button
test('Click suggestion button', async () => {
    const { browser, page } = await launchBrowser({})

    // Click the first suggestion button
    const suggestionBtn = await page.$('button.btn-suggestion')
    await suggestionBtn.click()

    // Get input field css classes
    let handleInputValue = await page.$eval(
        'input#handle',
        (input) => input.value
    )

    expect(handleInputValue).toEqual('big_ben_clock')

    // Close browser
    await browser.close()
})

// FIXME: waitForNaviation keeps timing out
// test('Fetching user tweets', async () => {
//     const { browser, page } = await launchBrowser({
//         headless: false,
//         args: ['--window-size=1280,800'],
//     })

//     // Type empty string
//     await page.click('input#handle')
//     await page.type('input#handle', 'big_ben_clock')

//     // await page.keyboard.press('Enter')
//     await page.click('button#handleFormSubmitBtn')
//     await page.waitForNavigation({ waitUntil: 'networkidle0' }),

//     console.log('waited')
//     // await page.waitFor(5000)

//     expect(2).toEqual(2)

//     // Close browser
//     await browser.close()
// }, 10000)
