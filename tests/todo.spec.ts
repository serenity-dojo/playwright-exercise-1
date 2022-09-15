import { expect, test } from '@playwright/test';

const baseUrl = 'https://todomvc.com/examples/emberjs/';

test.fixme('Should open the TodoMVC page',
    async ({ page }) => {
        await page.goto(baseUrl);

        await expect(page.locator('#header h1')).toHaveText('todos')
    }
);

test.fixme('Should start with an empty list',
    async ({ page }) => {}
)

test.fixme('Should be able to add items to the list',async ({page}) => {})

test.fixme('Should update the number of items left', async ({page}) => {})

test.fixme('Should mark completed items as complete', async ({page}) => {})

test.fixme('Should be able to show only Completed items', async ({page}) => {})

test.fixme('Should be able to show only Active items', async ({page}) => {})

test.fixme('Should be able to clear completed items', async ({page}) => {})