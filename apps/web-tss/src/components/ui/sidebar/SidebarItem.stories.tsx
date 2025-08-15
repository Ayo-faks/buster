import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check3 } from '../icons/NucleoIconOutlined';
import { SidebarItem } from './SidebarItem';

const meta: Meta<typeof SidebarItem> = {
  title: 'UI/Sidebar/SidebarItem',
  component: SidebarItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'emphasized'],
    },
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarItem>;

export const Default: Story = {
  args: {
    label: 'Home',
    icon: <Check3 />,
    route: { to: '/app/home' },
    id: 'home',
  },
};

export const Emphasized: Story = {
  args: {
    ...Default.args,
    variant: 'emphasized',
    id: 'home-emphasized',
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
    id: 'home-active',
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    id: 'home-disabled',
  },
};

export const LongText: Story = {
  args: {
    ...Default.args,
    label:
      'This is a very long sidebar item label that should demonstrate text truncation behavior in the component',
    id: 'long-text',
  },
  decorators: [
    (Story) => (
      <div className="max-w-[200px]">
        <Story />
      </div>
    ),
  ],
};
