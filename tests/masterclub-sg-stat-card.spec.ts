import { test, expect } from '@playwright/test';
test.setTimeout(3600000);
test('Masterclub Проверка статики у товаров в категории', async ({ page }) => {
  await page.goto('https://masterclub.store/');
  await expect(page.locator("#sg-stat")).not.toHaveCount(0);


  let pageStatic = 0;
  let pageStaticEmpty = 0;
  let pageCheck = 0;

  const url = process.env.CATEGORY;
  await page.goto(url+'?limit=all');
  console.log(`Категория : ${url}`);
  let urlsCard = await page.$$eval('.category-products__item-title a', links => links.map(link => link.href));

  console.log(`Товаров в категории : ${urlsCard.length}`);
  for (let urlCard of urlsCard) {
    await page.goto(urlCard);

    try {
      await expect(page.locator("#sg-stat")).not.toHaveCount(0);
      console.log(`✅ Статика есть на странице: ${urlCard}`);
      pageStatic++;
    } catch (error) {
      console.log(`❌ Статики нет на странице: ${urlCard}`);
      pageStaticEmpty++;
    }

    pageCheck++;
  }

  const pageStaticPer = pageStatic * 100 / pageCheck;
  const pageStaticEmptyPer = pageStaticEmpty * 100 / pageCheck;

  console.log('===================================================');
  console.log('Отчет');
  console.log('===================================================');

  console.log(`✅ : ${pageStatic} (${pageStaticPer}%)`);
  console.log(`❌ : ${pageStaticEmpty} (${pageStaticEmptyPer}%)`);

});