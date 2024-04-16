import { getUrl } from './utils/urlBuilder';
import './styles.scss';
import json from './responseExample.json';
import * as widgetGenerator from './generators/widgetGenerator';
const recommendationsContainer = document.querySelector(
  '#recomendationContainer'
);

const reqParams = {
  publisherId: 'taboola-templates',
  appType: 'desktop',
  apiKey: 'f9040ab1b9c802857aa783c469d0e0ff7e7366e4',
  sourceId: '214321562187',
};

async function main() {
  try {
    const url = getUrl({ count: 10, sourceType: 'video', ...reqParams });
    const response = await fetch(url);
    const responseJson = await response.json();
    const recommendations = responseJson.list;
    widgetGenerator.generateRecommendations(
      recommendationsContainer,
      recommendations
    );
  } catch (e) {
    console.error(e);
  }
}

main();
