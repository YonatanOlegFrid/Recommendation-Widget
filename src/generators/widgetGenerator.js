import ElementsGenerator from './elementsGenerator';
import noSrcImg from '../assets/no-img.png';
export const OriginTypes = {
  SPONSORED: 'sponsored',
};

/**
 * Generates all the sections and recommendation items.
 * @param {HTMLElement} parentContainer
 * @param {{thumbnail:[{url:string}], name: string, url: string, branding: string}[]} recommendations
 */
export function generateRecommendations(parentContainer, recommendations) {
  const fragmentsByOrigin = {};
  recommendations.forEach((recommendation) => {
    if (!fragmentsByOrigin[recommendation.origin]) {
      fragmentsByOrigin[recommendation.origin] =
        document.createDocumentFragment();
    }
    const fragment = fragmentsByOrigin[recommendation.origin];
    const newRecommendation =
      generateRecommendationItemByOrigin(recommendation);
    fragment.append(newRecommendation);
  });

  const fragmentIterator = Object.entries(fragmentsByOrigin);
  for (const [originName, childrenNodesFragment] of fragmentIterator) {
    const originSection = generateRecommendationSectionByOrigin(originName);

    const originItemsContainer =
      originSection.querySelector('.items-container');
    originItemsContainer.append(childrenNodesFragment);
    parentContainer.append(originSection);
  }
}

/**
 * Calls the helper function to generate the recommendation items by the origin.
 * @param {{thumbnail:[{url:string}], name: string, url: string, branding: string}} recommendationProps
 * @returns New HTML element node for the origin type of the recommendation
 */
export function generateRecommendationItemByOrigin(recommendationProps) {
  const { origin } = recommendationProps;
  switch (origin) {
    case OriginTypes.SPONSORED:
      return sponsoredItem(recommendationProps);
    default:
      throw new Error(`Origin type ${origin} is not defined`);
  }
}

/**
 * Calls helper function to Generate New HTML element representing the section
 * where all the recommendations of type originName will be generated.
 * @param {string} originName The origin type.
 * @returns {HTMLElement}
 */
export function generateRecommendationSectionByOrigin(originName) {
  switch (originName) {
    case OriginTypes.SPONSORED:
      return sponsoredSection(originName);
  }
}

/**
 * Generates new element tree representing a Sponsored recommendation item.
 * @param {*} param0
 * @returns {HTMLElement}
 */
function sponsoredItem({ thumbnail, name, url, branding }) {
  const thumbnailSrc =
    thumbnail && thumbnail[0]?.url ? thumbnail[0]?.url : noSrcImg;

  return ElementsGenerator.div(
    {
      classList: ['sponsored-item'],
      attributes: {
        onClick: () => {
          window.open(url, '_blank');
        },
      },
    },
    ElementsGenerator.img({
      classList: ['item-img'],
      attributes: {
        src: thumbnailSrc,
      },
    }),
    ElementsGenerator.span({
      classList: ['item-name'],
      textContent: name,
    }),
    ElementsGenerator.span({
      classList: ['item-brand'],
      textContent: branding,
    })
  );
}

/**
 * Generate New element tree representing the section
 * where all the recommendations of type Sponsored will be generated.
 * @param {string} originName
 * @returns {HTMLElement}
 */
function sponsoredSection(originName) {
  return ElementsGenerator.section(
    {
      attributes: {
        id: originName,
      },
    },
    ElementsGenerator.h2({
      textContent: 'Promoted Links By Taboola',
      classList: ['title'],
    }),
    itemsContainer()
  );
}

/**
 * generates container for recomendation items
 * @returns {HTMLElement}
 */
function itemsContainer() {
  return ElementsGenerator.div({
    classList: ['items-container'],
  });
}
