import { test, expect } from '@playwright/test';
const{POManager}=require('../pages/POManager')
const datasetCredential= JSON.parse(JSON.stringify(require('../Utils/CredentialsData.json')))
const datasetTestCase= JSON.parse(JSON.stringify(require('../Utils/TestCaseData.json')))
test.describe('Asana Test Suite', () => {
    test.beforeEach(async ({ page }) => {
      const poManager = new POManager(page);
      const Login = poManager.Login // Get Login page object
  
      await Login.loginfun(
        datasetCredential.credentials.baseurl,
        datasetCredential.credentials.email,
        datasetCredential.credentials.password
      );
      
    });
    test.afterEach(async ({ page }, testInfo) => {
      if (testInfo.status === 'failed') {
        // Capture screenshot if the test fails
      
        const fs = require('fs');
const path = './screenshots';

if (!fs.existsSync(path)){
    fs.mkdirSync(path);
}
// Get current timestamp in the format: YYYY-MM-DD_HH-mm-ss
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
await page.screenshot({ path: `${path}/failure-screenshot-${timestamp}.png` });
      }
    });
    datasetTestCase.testCases.forEach((testCase) => {
      test(testCase.name, async ({ page }) => {
        const poManager = new POManager(page);
        const DashboardPage = poManager.DashboardPage; // Get Dashboard page object
  
        // Navigate to the project
        await DashboardPage.navigateToProject(testCase.project);
       
  
        // Verify task and tags
        await DashboardPage.verifyTaskInColumn(
          testCase.task,
          testCase.column,
          testCase.tags,
          testCase.i,
          testCase.project
        );
      });
    });
  });
  