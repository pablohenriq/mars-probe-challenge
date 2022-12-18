import Probe from "./src/probe";

/**
 * @callback domReadyCallback
 * @param {Event} event
 */

/**
 * @param {domReadyCallback} fn
 */
function domReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

/**
 * @param {string} value
 * @return {string}
 */
const removeWhiteSpaces = (value) => value.replace(/\s/g, "");

/**
 * @param {string[]} values
 * @return {string[][]}
 */
const splitProbeInformation = (values) =>
  values.reduce((accumulator, item, index) => {
    const parts = Math.floor(index / 2);

    if (!accumulator[parts]) {
      accumulator[parts] = [];
    }

    accumulator[parts].push(item);

    return accumulator;
  }, []);

domReady(() => {
  /**
   * @type {HTMLTextAreaElement}
   */
  const textarea = document.getElementById("input");

  /**
   * @type {HTMLButtonElement}
   */
  const submitButton = document.getElementById("submit");

  /**
   * @type {HTMLParagraphElement}
   */
  const paragraph = document.getElementById("output");

  submitButton.addEventListener("click", () => {
    const [plateau, ...rest] = textarea.value.split("\n");
    const probe = new Probe(removeWhiteSpaces(plateau), "00N");

    splitProbeInformation(rest).forEach((informations) => {
      const [currentState, moviments] = informations;
      probe.state = removeWhiteSpaces(currentState);
      const results = document.createTextNode(probe.move(moviments));
      const breakline = document.createElement("br");
      paragraph.appendChild(results);
      paragraph.appendChild(breakline);
    });
  });
});
