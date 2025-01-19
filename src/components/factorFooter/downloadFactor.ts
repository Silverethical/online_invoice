import { toPng } from "html-to-image";

export const downloadFactor = () => {
  const element = document.querySelector("body"); // The section to capture

  if (!element) return;

  const originalStyle = element.getAttribute("style"); // Backup original styles

  // Temporarily replace number inputs with text inputs
  const numberInputs = document.querySelectorAll('input[type="number"]');
  const originalTypes: any[] = [];
  numberInputs.forEach((input: any) => {
    originalTypes.push(input.type);
    input.type = "text"; // Change to text to avoid spinners
  });

  // Apply temporary styles
  element.setAttribute(
    "style",
    `
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      -moz-font-feature-settings: "ss02";
      -webkit-font-feature-settings: "ss02";
      font-feature-settings: "ss02";
    `,
  );

  toPng(element, {
    backgroundColor: "#fff",
    filter: (node) => !node.classList?.contains("exclude"), // Exclude elements with 'exclude' class
  })
    .then((dataUrl) => {
      // Restore original styles and input types
      if (originalStyle) {
        element.setAttribute("style", originalStyle);
      } else {
        element.removeAttribute("style");
      }
      numberInputs.forEach(
        (input: any, index) => (input.type = originalTypes[index]),
      ); // Revert types

      // Download the image
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "factor.png";
      link.click();
    })
    .catch((error) => {
      console.error("Error generating image:", error);

      // Restore original styles and input types in case of error
      if (originalStyle) {
        element.setAttribute("style", originalStyle);
      } else {
        element.removeAttribute("style");
      }
      numberInputs.forEach(
        (input: any, index) => (input.type = originalTypes[index]),
      ); // Revert types
    });
};
