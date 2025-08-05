"use client";

import {
  useColorMode as useChakraColorMode,
  useColorModeValue as useChakraColorModeValue,
} from "@chakra-ui/next-js";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export function useColorMode() {
  const { colorMode, setColorMode, toggleColorMode } = useChakraColorMode();
  return { colorMode, setColorMode, toggleColorMode };
}

export function useColorModeValue<T>(light: T, dark: T) {
  return useChakraColorModeValue(light, dark);
}

export function ColorModeIcon() {
  const { colorMode } = useChakraColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "aria-label">
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useChakraColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      ref={ref}
      {...props}
    >
      <ColorModeIcon />
    </IconButton>
  );
});
