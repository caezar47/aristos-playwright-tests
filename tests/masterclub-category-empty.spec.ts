import { test, expect } from '@playwright/test';
test.setTimeout(3600000);
test('Masterclub Проверка на пустые категории', async ({ page }) => {
  await page.goto('https://masterclub.store/');

  // @ts-ignore
  const links = await page.$$eval('.navigation__link', links => links.map(link => link.href));
  const allLinks = links.length;

  let category = 0;
  let categoryEmpty = 0;
  let categoryCheck = 0;


  console.log(`Количество проверяемых категорий: ${allLinks}`);
  for (let link of links) {
    if (link != '') {
      await page.goto(link);
      try {
        await expect(page.locator(".category-products__item")).not.toHaveCount(0);
        console.log(`✅ Товары есть в категории: ${link}`);
        category++;
      } catch (error) {
        console.log(`❌ Нет товаров в категории: ${link}`);
        categoryEmpty++;
      }
    }
    categoryCheck++;
  }

  const categoryPer = Math.round(category * 100 / categoryCheck);
  const categoryEmptyPer = Math.round(categoryEmpty * 100 / categoryCheck);

  console.log('===================================================');
  console.log('Отчет');
  console.log('===================================================');
  console.log(`Проверку прошли: ${categoryCheck} / ${allLinks}`);

  console.log(`✅ : ${category} (${categoryPer}%)`);
  console.log(`❌ : ${categoryEmpty} (${categoryEmptyPer}%)`);
});