import { HomeView } from "@/components/views/HomeView";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";

it("HomeView has no a11y violations", async () => {
  const { container } = render(
    <ChakraProvider value={defaultSystem}>
      <HomeView onNavigate={() => {}} />
    </ChakraProvider>,
  );
  const results = await axe(container);
  expect(results.violations).toEqual([]);
});
