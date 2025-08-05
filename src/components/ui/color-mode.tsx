"use client";

import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

  const { colorMode, setColorMode, toggleColorMode } = useColorMode();
  return { colorMode, setColorMode, toggleColorMode };
}

  return useColorModeValue(light, dark);
}

  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

  HTMLButtonElement,
  Omit<IconButtonProps, "aria-label">
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();
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
