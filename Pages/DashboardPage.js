const { expect } = require('@playwright/test');

export class DashboardPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToProject(projectName) {
     // await this.page.locator(`//*[text()="${projectName}"]`).waitFor({ state: 'visible' });
        await this.page.locator(`//*[text()="${projectName}"]`).click();
    }

    async verifyTaskInColumn(taskName, columnName, expectedTags, i, projectName) {
        const taskLocator = this.page.locator(`text="${taskName}"`);
        const columnLocator = this.page.locator(`text="${columnName}"`);
        await taskLocator.waitFor({ state: 'visible' });
  await columnLocator.waitFor({ state: 'visible' });

        // Verify task is in the specified column
        expect(await taskLocator.isVisible()).toBeTruthy();
        expect(await columnLocator.isVisible()).toBeTruthy();

        // Get the correct tags locator based on projectName
        const tagsLocator = this.getTagsLocator(projectName, i);

        // Verify tags if a valid locator is returned
        if (tagsLocator) {
            const tags = await this.page.locator(tagsLocator).allTextContents();
            console.log('Retrieved Tags:', tags);
            console.log('Expected Tags:', expectedTags);
            expect(tags).toEqual(expectedTags);
        } else {
            console.error(`No valid locator found for project: ${projectName}`);
        }
    }

    getTagsLocator(projectName, i) {
        if (projectName === "Cross-functional project plan, Project") {
            return `//div[@class='CommentOnlyBoardBody-columnList']/div[2]/div[2]/div/div[2]/div/div[${i}]/div/div/div/div/div/div/div[6]/div/div/div/span[1]`;
        } else if (projectName === "Work Requests") {
            return `//*[@id='asana_main_page']/div[1]/div[1]/div[1]/div[2]/div[2]/div/div[1]/div[3]/div[1]/div/div/div/div[${i}]/div[2]/div/div[2]/div/div/div/div/div/div/div/div[1]/div[6]/div/div/div/span`;
        } else {
            return null; // Handle unknown project names
        }
    }
}
