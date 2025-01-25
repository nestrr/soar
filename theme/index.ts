import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";
const theme = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        border: {
          DEFAULT: {
            value: {
              _light: "{colors.yellow.900}",
              _dark: "{colors.yellow.50}",
            },
          },
        },
        accent: {
          DEFAULT: {
            value: {
              _light: "{colors.yellow.100}",
              _dark: "{colors.yellow.50}",
            },
          },

          contrast: {
            value: {
              _light: "{colors.yellow.600}",
              _dark: "{colors.yellow.300}",
            },
          },
          fg: {
            value: {
              _light: "{colors.yellow.800}",
              _dark: "{colors.yellow.300}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.yellow.100}",
              _dark: "{colors.yellow.900}",
            },
          },
          muted: {
            value: {
              _light: "{colors.yellow.50}",
              _dark: "{colors.yellow.900}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.yellow.400}",
              _dark: "{colors.yellow.600}",
            },
          },
          solid: {
            value: {
              _light: "{colors.yellow.600}",
              _dark: "{colors.yellow.300}",
            },
          },
          focusRing: {
            value: {
              _light: "{colors.yellow.300}",
              _dark: "{colors.yellow.700}",
            },
          },
        },
        fg: {
          DEFAULT: {
            value: {
              _light: "{colors.black}",
              _dark: "{colors.white}",
            },
          },

          contrast: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.gray.600}",
            },
          },
          fg: {
            value: {
              _light: "{colors.gray.900}",
              _dark: "{colors.gray.50}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.gray.100}",
              _dark: "{colors.gray.900}",
            },
          },
          muted: {
            value: {
              _light: "{colors.gray.500}",
              _dark: "{colors.gray.200}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.gray.300}",
              _dark: "{colors.gray.700}",
            },
          },
          solid: {
            value: {
              _light: "{colors.gray.900}",
              _dark: "{colors.white}",
            },
          },
          focusRing: {
            value: {
              _light: "{colors.gray.800}",
              _dark: "{colors.purple.200}",
            },
          },
        },
        bg: {
          DEFAULT: {
            value: {
              _light: "{colors.purple.200}",
              _dark: "{colors.purple.900}",
            },
          },
          contrast: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.white}",
            },
          },
          fg: {
            value: {
              _light: "{colors.purple.700}",
              _dark: "{colors.purple.300}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.purple.200}",
              _dark: "{colors.purple.900}",
            },
          },
          muted: {
            value: {
              _light: "{colors.purple.200}",
              _dark: "{colors.purple.800}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.purple.300}",
              _dark: "{colors.purple.700}",
            },
          },
          solid: {
            value: {
              _light: "{colors.purple.600}",
              _dark: "{colors.purple.600}",
            },
          },
          focusRing: {
            value: {
              _light: "{colors.purple.400}",
              _dark: "{colors.purple.600}",
            },
          },
        },
      },
    },
    tokens: {
      fonts: {
        heading: {
          value: "var(--font-rubik)",
        },
        body: {
          value: "var(--font-rubik)",
        },
      },
      colors: {
        body: {
          value: "purple",
        },
      },
    },
  },
});
const config = mergeConfigs(defaultConfig, theme);
export const system = createSystem(config);
