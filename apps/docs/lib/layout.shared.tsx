import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: 'User Docs',
        url: '/docs/user',
        active: 'nested-url',
      },
      {
        text: 'Developer Docs',
        url: '/docs/developer',
        active: 'nested-url',
      },
    ],
    // Ensure theme switch and search toggle are visible in the navbar
    themeSwitch: {
      enabled: true,
    },
    searchToggle: {
      enabled: true,
    },
  };
}
