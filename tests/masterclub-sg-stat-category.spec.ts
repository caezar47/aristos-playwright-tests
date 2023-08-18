import { test, expect } from '@playwright/test';
test.setTimeout(3600000);
test('Masterclub :: find sg-stat category', async ({ page }) => {
  const mainPage = 'https://masterclub.store/';
  await page.goto(mainPage);

  // @ts-ignore
  const urls = await page.$$eval('.navigation__link', links => links.map(link => link.href));
  let allUrls = urls.length + 1;

  let pageStatic = 0;
  let pageStaticEmpty = 0;
  let pageCheck = 0;

  console.log(`Количество проверяемых страниц: ${allUrls}`);

  try {
    await expect(page.locator("#sg-stat")).not.toHaveCount(0);
    console.log(`✅ Статика есть на странице: ${mainPage}`);
    pageStatic++;
  } catch (error) {
    console.log(`❌ Статики нет на странице: ${mainPage}`);
    pageStaticEmpty++;
  }
  pageCheck++;

  for (let url of urls) {
    await page.goto(url);
    try {
      await expect(page.locator("#sg-stat")).not.toHaveCount(0);
      console.log(`✅ Статика есть на странице: ${url}`);
      pageStatic++;
    } catch (error) {
      console.log(`❌ Статики нет на странице: ${url}`);
      pageStaticEmpty++;
    }
    pageCheck++;
    if (pageCheck == 5) {
      break;
    }
  }

  const pageStaticPer = pageStatic * 100 / pageCheck;
  const pageStaticEmptyPer = pageStaticEmpty * 100 / pageCheck;

  console.log('===================================================');
  console.log('Отчет');
  console.log('===================================================');
  console.log(`Проверку прошли: ${pageCheck} / ${allUrls}`);

  console.log(`✅ : ${pageStatic} (${pageStaticPer}%)`);
  console.log(`❌ : ${pageStaticEmpty} (${pageStaticEmptyPer}%)`);
});