import { test, expect } from '@playwright/test';
test.setTimeout(5000000);
test('masterclub :: find category empty', async ({ page }) => {
  await page.goto('https://masterclub.store/');

  const links = await page.$$eval('.navigation__link', links => links.map(link => link.href));
  const alllinks = links.length;

  let category = 0;
  let categoryEmpty = 0;
  let categoryCheck = 0;

  console.log('Количество проверяемых категорий: ' + alllinks);
  for (let link of links) {
    if (link != '') {
      await page.goto(link);
      try {
        await expect(page.locator(".category-products__item")).not.toHaveCount(0);
        console.log('✅ Товары есть в категории: ' + link);
        category++;
      } catch (error) {
        console.log('❌ Нет товаров в категории: ' + link)
        categoryEmpty++;
      }
    }
    categoryCheck++;
    if (categoryCheck == 5) {
      break;
    }
  }

  const categoryPer = Math.round(category * 100 / categoryCheck);
  const categoryEmptyPer = Math.round(categoryEmpty * 100 / categoryCheck);

  console.log('===================================================');
  console.log('Отчет');
  console.log('===================================================');
  console.log('Проверку прошли: ' + categoryCheck + ' / ' + alllinks);

  console.log('✅ : ' + category + '('+categoryPer+'%)');
  console.log('❌ : ' + categoryEmpty + '('+categoryEmptyPer+'%)');
});