import StoreDecorator from "../../../../storybook/StoreDecorator.svelte";
import SvgDecorator from "../../../../storybook/SvgDecorator.svelte";
import Title from './Title.svelte';

export default {
  component: Title,
  title: "Title",
  tags: ['autodocs'],
  decorators: [() => SvgDecorator, () => StoreDecorator],
}

export const Primary = {
  args: {
    title: "test2"
  }
}
