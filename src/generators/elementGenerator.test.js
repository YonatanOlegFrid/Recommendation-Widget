import ElementsGenerator, { generateElement } from './elementsGenerator';

describe('GenerateElement Test', () => {
  it('generateElement generates all basic elements', () => {
    for (let [elementTagName, generator] of Object.entries(ElementsGenerator)) {
      const el = generator({});
      const expected = ['img', 'hr'].includes(elementTagName)
        ? `<${elementTagName}>`
        : `<${elementTagName}></${elementTagName}>`;
      expect(el.outerHTML).toEqual(expected);
    }
  });

  it('all elements setters work', () => {
    const el = ElementsGenerator.div({
      attributes: {
        id: 'test',
      },
      classList: ['test1', 'test2'],
      style: {
        color: 'red',
      },
      textContent: 'testing',
    });
    const expected =
      '<div id="test" class="test1 test2" style="color: red;">testing</div>';
    expect(el.outerHTML).toEqual(expected);
  });

  it('attribute setter works for events', () => {
    const func = () => {};
    const el = ElementsGenerator.div({
      attributes: {
        onClick: func,
      },
    });
    expect(el.onclick).toEqual(func);
  });

  it('generate wrong elemnt type throws an error', () => {
    const wrongCall = () => generateElement(elementTagName, {}, []);
    const elementTagName = 'wrongTagName';
    expect(wrongCall).toThrowError(
      `element tag name ${elementTagName} is unknown`
    );
  });

  it('generate element with children', () => {
    const el = ElementsGenerator.div(
      {},
      ElementsGenerator.h1({}),
      ElementsGenerator.p({})
    );
    const expected = '<div><h1></h1><p></p></div>';
    expect(el.outerHTML).toEqual(expected);
  });
});
