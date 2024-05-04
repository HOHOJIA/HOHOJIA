import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        background: '#FFFFFF', // or DEFAULT
                        foreground: '#11181C', // or 50 to 900 DEFAULT
                        primary: {
                            foreground: '#000',
                            DEFAULT: '#FDE047',
                        },
                        // ... rest of the colors
                    },
                },
            },
        }),
    ],
}
export default config
