import { test, expect } from '@playwright/test';
test.setTimeout(3600000);
test('Masterclub Проверка статики у товаров в категории', async ({ page }) => {
  const mainPage = process.env.SITE;
  await page.goto('https://masterclub.store/');
  await expect(page.locator("#sg-stat")).not.toHaveCount(0);

    // @ts-ignore
    //const urls = await page.$$eval('.navigation__list .navigation__link', links => links.map(link => link.href));
    //let allUrls = urls.length;

    let pageStatic = 0;
    let pageStaticEmpty = 0;
    let categoryCheck = 0;
    let pageCheck = 0;

    //console.log(`Количество проверяемых страниц: ${allUrls}`);

    /*try {
      await expect(page.locator("#sg-stat")).not.toHaveCount(0);
      console.log(`✅ Статика есть на странице: ${mainPage}`);
      pageStatic++;
    } catch (error) {
      console.log(`❌ Статики нет на странице: ${mainPage}`);
      pageStaticEmpty++;
    }
    pageCheck++;*/
    //for (let url of urls) {
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
        if (pageCheck == 3) {
          break;
        }
      }
      //categoryCheck++;
      //if (categoryCheck == 2) {
        //break;
      //}
    //}

    const pageStaticPer = pageStatic * 100 / pageCheck;
    const pageStaticEmptyPer = pageStaticEmpty * 100 / pageCheck;

    console.log('===================================================');
    console.log('Отчет');
    console.log('===================================================');
    //console.log(`Проверку прошли: ${pageCheck} / ${allUrls}`);

    console.log(`✅ : ${pageStatic} (${pageStaticPer}%)`);
    console.log(`❌ : ${pageStaticEmpty} (${pageStaticEmptyPer}%)`);

});