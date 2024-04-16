/**
 * Generates new HTML element node with the elementProps provided.
 * If any children nodes exist, they are appended to the element.
 * @param {string} elementTagName
 * @param {{attributes: {[key:string]:string}, classList: string[], style: {[key:string]:string}, textContent:string}} elementProps
 * @param {HTMLElement[]} children
 * @returns {HTMLElement} New HtmlElement
 */
export function generateElement(elementTagName, elementProps, children) {
  const newElement = document.createElement(elementTagName);
  if (newElement.toString() === '[object HTMLUnknownElement]')
    throw new Error(`element tag name ${elementTagName} is unknown`);
  setElementProps(newElement, elementProps);
  if (children?.length > 0) {
    const fragment = document.createDocumentFragment();
    children.forEach((child) => fragment.append(child));
    newElement.append(fragment);
  }
  return newElement;
}

/**
 * Sets all the attributs, classes, style and textContent to the target html element.
 * @param {HTMLElement} htmlElement the target html element.
 * @param {} param1 prop options for the element.
 */
function setElementProps(
  htmlElement,
  { attributes, classList, style, textContent }
) {
  if (attributes) setAttributes(htmlElement, attributes);
  if (classList) setClassList(htmlElement, classList);
  if (style) setStyleProperties(htmlElement, style);
  if (textContent) setTextContent(htmlElement, textContent);
}

/**
 * Helper function to set the attributes.
 * @param {HTMLElement} htmlElement The target html element.
 * @param {{[key:string]:string}} attributes key/value object for the target element attributes.
 */
function setAttributes(htmlElement, attributes) {
  for (let [key, val] of Object.entries(attributes)) {
    if (key.startsWith('on') && typeof val === 'function')
      htmlElement[key.toLowerCase()] = val;
    else htmlElement.setAttribute(key, typeof val === 'boolean' ? '' : val);
  }
}

/**
 * Helper function to add classes names. The method is not erasing the previous classes names.
 * @param {HTMLElement} htmlElement The target html element.
 * @param {string[]} classList
 */
function setClassList(htmlElement, classList) {
  try {
    htmlElement.classList.add(...classList);
  } catch (err) {
    console.error(err);
  }
}

/**
 * Helper function to set the target html element style.
 * @param {HTMLElement} htmlElement
 * @param {{[key:string]:string}} styleProperties
 */
function setStyleProperties(htmlElement, styleProperties) {
  for (let [key, val] of Object.entries(styleProperties)) {
    htmlElement.style[key] = val;
  }
}

/**
 * Helper function to set html element textContent
 * @param {HTMLElement} htmlElement
 * @param {string} textContent
 */
function setTextContent(htmlElement, textContent) {
  htmlElement.textContent = textContent;
}

const ElementsGenerator = {
  article: undefined,
  section: undefined,
  div: undefined,
  p: undefined,
  span: undefined,
  a: undefined,
  h1: undefined,
  h2: undefined,
  img: undefined,
  hr: undefined,
};

Object.keys(ElementsGenerator).forEach((elementTagName) => {
  ElementsGenerator[elementTagName] = (elementProps, ...children) => {
    return generateElement(elementTagName, elementProps, children);
  };
});

export default ElementsGenerator;
