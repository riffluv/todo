import { MessageCard } from "@/components/ui/MessageCard";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render } from "@testing-library/react";

test("MessageCard renders with title and message", () => {
  const { getByText } = render(
    <ChakraProvider value={defaultSystem}>
      <MessageCard icon={<div />} title="Title" message="Hello" />
    </ChakraProvider>,
  );
  expect(getByText("Title")).toBeInTheDocument();
  expect(getByText("Hello")).toBeInTheDocument();
});
