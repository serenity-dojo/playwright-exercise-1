import { expect, test } from '@playwright/test';

const baseUrl = 'https://todomvc.com/examples/emberjs/';

test('Should open the TodoMVC page',
    async ({ page }) => {
        await page.goto(baseUrl);

        await expect(page.locator('#header h1')).toHaveText('todos')
    }
);

test('Should start with an empty list',
    async ({ page }) => {
        await page.goto(baseUrl);

        await expect(page.locator(".todo-list li")).toHaveCount(0)
    }
)

test('Should be able to add items to the list',async ({page}) => {
    await page.goto(baseUrl);

    const newTodoField = page.locator('[placeholder="What needs to be done\?"]');
    const displayTodos = page.locator(".todo-list label");
    
    await newTodoField.fill('Feed the cat');
    await newTodoField.press('Enter');

    await newTodoField.fill('Walk the dog');
    await newTodoField.press('Enter');

    await expect(displayTodos).toHaveCount(2);
    await expect(displayTodos).toHaveText(['Feed the cat', 'Walk the dog']);

})

test('Should update the number of items left', async ({page}) => {

    await page.goto(baseUrl);

    const newTodoField = page.locator('[placeholder="What needs to be done\?"]');
    const todoCount = page.locator('#todo-count');
    
    await newTodoField.fill('Feed the cat');
    await newTodoField.press('Enter');

    await expect(todoCount).toHaveText('1 item left');

    await newTodoField.fill('Walk the dog');
    await newTodoField.press('Enter');

    await expect(todoCount).toHaveText('2 items left');
})


test('Should mark completed items as complete', async ({page}) => {

    await page.goto(baseUrl);

    const newTodoField = page.locator('[placeholder="What needs to be done\?"]');
    
    await newTodoField.fill('Feed the cat');
    await newTodoField.press('Enter');
    await newTodoField.fill('Walk the dog');
    await newTodoField.press('Enter');

    const walkTheDog = page.locator('.todo-list li:has-text("Walk the dog")');
    await walkTheDog.locator('.toggle').click();

    const todoItems = page.locator('.todo-list li');
    await expect(todoItems.nth(0)).not.toHaveClass(/completed/);
    await expect(todoItems.nth(1)).toHaveClass(/completed/);

})

test('Should be able to show only Completed items', async ({page}) => {

    await page.goto(baseUrl);

    const newTodoField = page.locator('[placeholder="What needs to be done\?"]');
    
    await newTodoField.fill('Feed the cat');
    await newTodoField.press('Enter');
    await newTodoField.fill('Walk the dog');
    await newTodoField.press('Enter');

    const walkTheDog = page.locator('.todo-list li:has-text("Walk the dog")');
    await walkTheDog.locator('.toggle').click();

    await page.locator('a:has-text("Completed")').click();

    const displayedTodos = page.locator('.todo-list label');
    await expect(displayedTodos).toHaveCount(1)
    await expect(displayedTodos).toHaveText(['Walk the dog'])

})


test('Should be able to show only Active items', async ({page}) => {

    await page.goto(baseUrl);

    const newTodoField = page.locator('[placeholder="What needs to be done\?"]');
    
    await newTodoField.fill('Feed the cat');
    await newTodoField.press('Enter');
    await newTodoField.fill('Walk the dog');
    await newTodoField.press('Enter');

    const walkTheDog = page.locator('.todo-list li:has-text("Walk the dog")');
    await walkTheDog.locator('.toggle').click();

    await page.locator('a:has-text("Active")').click();

    const displayedTodos = page.locator('.todo-list label');
    await expect(displayedTodos).toHaveCount(1)
    await expect(displayedTodos).toHaveText(['Feed the cat'])

})

test('Should be able to clear completed items', async ({page}) => {

    await page.goto(baseUrl);

    const newTodoField = page.locator('[placeholder="What needs to be done\?"]');
    
    await newTodoField.fill('Feed the cat');
    await newTodoField.press('Enter');
    await newTodoField.fill('Walk the dog');
    await newTodoField.press('Enter');

    const walkTheDog = page.locator('.todo-list li:has-text("Walk the dog")');
    await walkTheDog.locator('.toggle').click();

    await page.locator('text="Clear completed"').click();

    const displayedTodos = page.locator('.todo-list label');
    await expect(displayedTodos).toHaveCount(1)
    await expect(displayedTodos).toHaveText(['Feed the cat'])

})