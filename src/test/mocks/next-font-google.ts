// Test-environment stand-in for `next/font/google`.
// Next's font loaders require the Next.js SWC compiler and cannot run under
// plain Vitest/jsdom, so we substitute lightweight functions with the same
// call shape ({ subsets, variable, display }) => { className, variable }.
type FontOptions = {
  variable?: string;
};

function createFontLoader() {
  return (options: FontOptions = {}) => ({
    className: "font-mock",
    variable: options.variable ?? "",
    style: { fontFamily: "mock" },
  });
}

export const Marcellus_SC = createFontLoader();
export const Fraunces = createFontLoader();
export const Inter = createFontLoader();
