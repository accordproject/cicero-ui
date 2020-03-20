module.exports = {
    stories: ["../src/**/*.stories.[tj]s"],
    addons: [
      // '@storybook/addon-actions',
      '@storybook/addon-knobs/register',
      '@storybook/addon-notes/register',
      '@storybook/addon-a11y/register',
      // '@storybook/addon-storyshots'
    ]
  };