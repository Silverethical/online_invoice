import { toPng } from "html-to-image";

export const downloadFactor = () => {
  const element = document.querySelector("body"); // The section to capture

  if (!element) return;

  const originalStyle = element.getAttribute("style"); // Backup original styles

  // Apply temporary styles to fix white space
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
    filter: (node) => {
      // Exclude elements with the 'exclude' class
      return !node.classList?.contains("exclude");
    },
  })
    .then((dataUrl) => {
      // Restore original styles
      if (originalStyle) {
        element.setAttribute("style", originalStyle);
      } else {
        element.removeAttribute("style");
      }

      // Download the image
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "factor.png";
      link.click();
    })
    .catch((error) => {
      console.error("Error generating image:", error);

      // Restore original styles in case of error
      if (originalStyle) {
        element.setAttribute("style", originalStyle);
      } else {
        element.removeAttribute("style");
      }
    });
};
