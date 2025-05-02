// @see https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/Tab_Role
// @see https://www.w3.org/TR/wai-aria-1.2/#tablist

import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TabProps {
  selected?: boolean;
  onClick: () => void;
  notice?: number | string;
  width?: 's' | 'm' | 'l';
  fin?: boolean; // 通常モードは右に余白をとる。
  id?: string; // tabpanelのaria-labelledby
  'aria-controls'?: string; // tabpanelのid
  tabIndex?: number;
  className?: string;
  children: React.ReactNode;
}

export function Tab({
  selected = false,
  notice,
  width = 's',
  fin = false,
  tabIndex = 0,
  className,
  children,
  ...props
}: Readonly<TabProps>) {
  const theme = selected
    ? 'bg-app-primary text-white border-2 border-app-primary hover:bg-app-primary/90'
    : 'bg-white text-app-primary border-2 border-app-primary border-b-white';
  let widthSize = '';
  switch (width) {
    case 's':
      widthSize = 'w-40';
      break;
    case 'm':
      widthSize = 'w-64';
      break;
    case 'l':
      widthSize = 'w-72';
      break;
  }

  const base = widthSize + ' h-10 tab rounded-t-xl p-1';
  const tabClass = twMerge(theme, base, className);

  const frameClass = twMerge(fin ? '' : 'mr-2', 'relative');
  const noticeClass =
    'absolute -top-7 right-1 w-8 text-white text-center bg-app-alert rounded-full no-underline text-app-sm leading-8';

  return (
    <span role="presentation" className={frameClass}>
      <button
        role="tab"
        aria-selected={selected}
        tabIndex={tabIndex}
        {...props}
        className={tabClass}
      >
        {children}
      </button>
      {notice !== void 0 && (
        <abbr aria-hidden className={noticeClass} title={`通知${notice}件`}>
          {notice}
        </abbr>
      )}
    </span>
  );
}

export interface TabPanelProps {
  id?: string; // tabのariaControls
  'aria-labelledby'?: string; // tabのid
  'aria-expanded'?: boolean;
  className?: string;
  tabIndex?: number;
  children: React.ReactNode;
}

export function TabPanel({ children, ...props }: Readonly<TabPanelProps>) {
  return (
    <div role="tabpanel" tabIndex={0} {...props}>
      {children}
    </div>
  );
}

export interface TabListProps {
  'aria-label'?: string;
  className?: string;
  children: React.ReactNode;
}

export function TabList({ children, ...props }: Readonly<TabPanelProps>) {
  return (
    <div role="tablist" {...props}>
      {children}
    </div>
  );
}
