// Allow TypeScript to recognize vitest-axe matcher on Chai-style Assertion typings
// This fixes editor/type errors like: Property 'toHaveNoViolations' does not exist on type 'Assertion<AxeResults>'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Chai {
  interface Assertion {
    toHaveNoViolations(): void;
  }
}

export {};
