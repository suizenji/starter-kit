import type { Meta, StoryObj } from '@storybook/react';

import { Tab, TabList, TabPanel } from '.';

const meta = {
  title: 'components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    selected: true,
    children: '選択中',
    onClick: () => {},
  },
};

export const Unselected: Story = {
  args: {
    selected: false,
    children: '未選択',
    onClick: () => {},
  },
};

export const Notice: Story = {
  args: {
    children: '通知',
    notice: 3,
    onClick: () => {},
  },
};

import { useState } from 'react';

function SampleList() {
  const [selected, setSelected] = useState(1);
  const [notice, setNotice] = useState<number | undefined>(3);

  return (
    <div className="border h-20">
      <TabList aria-label="Sample Tabs">
        <Tab
          id="tab1"
          aria-controls="c1"
          selected={selected === 1}
          onClick={() => setSelected(1)}
        >
          選択中
        </Tab>
        <Tab
          id="tab2"
          aria-controls="c2"
          selected={selected === 2}
          onClick={() => setSelected(2)}
        >
          未選択
        </Tab>
        <Tab
          id="tab3"
          aria-controls="c3"
          selected={selected === 3}
          onClick={() => {
            setSelected(3);
            setNotice(void 0);
          }}
          notice={notice}
          fin
        >
          通知
        </Tab>
      </TabList>
      {selected === 1 && (
        <TabPanel id="c1" aria-labelledby="tab1">
          選択中のコンテンツ
        </TabPanel>
      )}
      {selected === 2 && (
        <TabPanel id="c2" aria-labelledby="tab2">
          未選択のコンテンツ
        </TabPanel>
      )}
      {selected === 3 && (
        <TabPanel id="c3" aria-labelledby="tab3">
          通知のコンテンツ
        </TabPanel>
      )}
    </div>
  );
}

export const List = {
  render: () => <SampleList />,
};
