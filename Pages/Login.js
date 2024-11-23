exports.Login =
class Login{
    constructor(page){
        this.page=page;
      
        this.email='//form[@name="loginEmailForm"]/div/div[2]/div/input'
        this.password='//input[@type="password"]'
        this.continue='//div[text()="Continue"]'
        this.login='//div[text()="Log in"]'
        

    }
    async loginfun(baseurl,email,password)
    {
        await this.page.goto(baseurl)
        await this.page.locator(this.email).fill(email)
        await this.page.locator(this.continue).click()
        await this.page.locator(this.password).fill(password)
        await this.page.locator(this.login).click();
        
       
    }

}