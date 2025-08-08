import { HomeView } from "@/components/views/HomeView";
import type { PersonConfig } from "@/types/message";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";

const messages: PersonConfig[] = [
  {
    id: "saito",
    name: "斎藤さん",
    buttonLabel: "斎藤さんへ",
    themeKey: "saito",
    message: { title: "t", paragraphs: ["p"], closing: "c", signature: "s" },
  },
  {
    id: "sakuda",
    name: "作田さん",
    buttonLabel: "作田さんへ",
    themeKey: "sakuda",
    message: { title: "t", paragraphs: ["p"], closing: "c", signature: "s" },
  },
];

it("HomeView has no a11y violations", async () => {
  const { container } = render(
    <ChakraProvider value={defaultSystem}>
      <HomeView messages={messages} onNavigate={() => {}} />
    </ChakraProvider>,
  );
  const results = await axe(container);
  expect(results.violations).toEqual([]);
});
