import VersionFooter from './VersionFooter';

export default {
  title: 'Components/VersionFooter',
  component: VersionFooter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    tagVersion: 'v1.0.0',
    commitVersion: 'a1b2c3d',
  },
};

export const Development = {
  args: {
    tagVersion: 'dev',
    commitVersion: 'unknown',
  },
};

export const WithLongCommitHash = {
  args: {
    tagVersion: 'v2.3.1',
    commitVersion: 'a1b2c3d4e5f6',
  },
};

export const Responsive = {
  args: {
    tagVersion: 'v1.0.0',
    commitVersion: 'a1b2c3d',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};