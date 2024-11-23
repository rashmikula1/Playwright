const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('./DashboardPage')
const { Login } = require('./Login');


class POManager{

    constructor (page)
    {

      this.page=page
      this.Login = new Login(this.page)
      this.DashboardPage = new DashboardPage(this.page);

    }
    getloginpage()
    {
        return this.Login;
    }
    getDashboardPage() {
     // return this.DashboardPage;
    }

}
module.exports={POManager};