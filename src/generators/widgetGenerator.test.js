import {
  OriginTypes,
  generateRecommendationSectionByOrigin,
  generateRecommendationItemByOrigin,
  generateRecommendations,
} from './widgetGenerator';
import { generateElement } from './elementsGenerator';
import recommendationsJson from '../responseExample.json';

const recmItemTest = {
  type: 'video',
  thumbnail: [
    {
      url: 'http://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/https%3A%2F%2Fsv.nyt.com%2Fimages%2F2012%2F08%2F30%2Fsports%2Fvideo-open2%2Fvideo-open2-videoSmall.jpg',
    },
  ],
  name: "U.S. Open: Who's Next in Women's Tennis?",
  created: 'Thu, 30 Aug 2012 18:27:38 UTC',
  branding: 'The New York Times',
  origin: 'sponsored',
};

const recmItemTestWithoutThumbnail = {
  type: 'video',
  name: "U.S. Open: Who's Next in Women's Tennis?",
  created: 'Thu, 30 Aug 2012 18:27:38 UTC',
  branding: 'The New York Times',
  origin: 'sponsored',
};

describe('WidgetGenerator Test', () => {
  it('generateRecommendationSectionByOrigin', () => {
    const el = generateRecommendationSectionByOrigin(OriginTypes.SPONSORED);
    const itemsContainer = el.querySelector('items-container');
    const expected =
      '<section id="sponsored"><h2 class="title">Promoted Links By Taboola</h2><div class="items-container"></div></section>';
    expect(el.children).toHaveLength(2);
    expect(el.id).toEqual(OriginTypes.SPONSORED);
    expect(itemsContainer).toBeDefined();
    expect(el.outerHTML).toEqual(expected);
  });

  it('generateRecommendationItemByOrigin check name brand and img set ok', () => {
    const el = generateRecommendationItemByOrigin(recmItemTest);
    const itemNameEl = el.querySelector('.item-name');
    const itemBrandEl = el.querySelector('.item-brand');
    const itemImgEl = el.querySelector('.item-img');

    expect(el.children).toHaveLength(3);
    expect(el.classList.contains('sponsored-item')).toBe(true);
    expect(itemNameEl.textContent).toEqual(recmItemTest.name);
    expect(itemBrandEl.textContent).toEqual(recmItemTest.branding);
    expect(itemImgEl.src).toEqual(recmItemTest.thumbnail[0].url);
    expect(el.outerHTML).toEqual(el.outerHTML);
  });

  it('generateRecommendationItemByOrigin check default thumbnail set', () => {
    const el = generateRecommendationItemByOrigin(recmItemTestWithoutThumbnail);
    const itemNameEl = el.querySelector('.item-name');
    const itemBrandEl = el.querySelector('.item-brand');
    const itemImgEl = el.querySelector('.item-img');

    expect(el.children).toHaveLength(3);
    expect(el.classList.contains('sponsored-item')).toBe(true);
    expect(itemNameEl.textContent).toEqual(recmItemTestWithoutThumbnail.name);
    expect(itemBrandEl.textContent).toEqual(
      recmItemTestWithoutThumbnail.branding
    );
    expect(itemImgEl.src).toEqual('http://localhost/[object%20Object]');
  });

  it('generate from not defined origin type throws an error', () => {
    const origin = 'test';
    const wrongCall = () => generateRecommendationItemByOrigin({ origin });
    expect(wrongCall).toThrowError(`Origin type ${origin} is not defined`);
  });

  it('generateRecommendations check all children exist', () => {
    const mainContainer = generateElement('div', {});
    const recommendations = recommendationsJson.list;
    generateRecommendations(mainContainer, recommendations);

    const sponsoredContainer = mainContainer.querySelector(
      `#${OriginTypes.SPONSORED}`
    );
    const itemsContainer = sponsoredContainer.querySelector('.items-container');
    expect(sponsoredContainer.children).toHaveLength(2);
    expect(itemsContainer.children).toHaveLength(recommendations.length);
  });
});
