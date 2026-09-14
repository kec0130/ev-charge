import type { SVGProps } from 'react';

export type IconName =
  | 'pin'
  | 'book'
  | 'chart'
  | 'search'
  | 'arrow'
  | 'chevron'
  | 'clock'
  | 'navigate'
  | 'locate'
  | 'plus'
  | 'minus'
  | 'info'
  | 'close'
  | 'map'
  | 'document'
  | 'check'
  | 'bolt'
  | 'back';
const paths: Record<IconName, React.ReactNode> = {
  pin: (
    <>
      <path d='M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z' />
      <circle cx='12' cy='10' r='2.5' />
    </>
  ),
  book: (
    <>
      <path d='M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1Z' />
    </>
  ),
  chart: (
    <>
      <path d='M5 20v-7M12 20V4M19 20V9' strokeWidth='3' />
    </>
  ),
  search: (
    <>
      <circle cx='10.5' cy='10.5' r='7' />
      <path d='m16 16 5 5' />
    </>
  ),
  arrow: <path d='M4 12h16m-6-6 6 6-6 6' />,
  chevron: <path d='m9 5 7 7-7 7' />,
  back: <path d='m15 5-7 7 7 7' />,
  clock: (
    <>
      <circle cx='12' cy='12' r='9' />
      <path d='M12 7v6l4 2' />
    </>
  ),
  navigate: <path d='m21 3-7 18-4-7-7-4 18-7Z' />,
  locate: (
    <>
      <circle cx='12' cy='12' r='7' />
      <circle cx='12' cy='12' r='2' />
      <path d='M12 1v4m0 14v4M1 12h4m14 0h4' />
    </>
  ),
  plus: <path d='M12 4v16M4 12h16' />,
  minus: <path d='M4 12h16' />,
  info: (
    <>
      <circle cx='12' cy='12' r='9' />
      <path d='M12 11v6m0-10v.1' />
    </>
  ),
  close: <path d='m6 6 12 12M6 18 18 6' />,
  map: (
    <>
      <path d='m2 6 6-3 8 3 6-3v15l-6 3-8-3-6 3V6Zm6-3v15m8-12v15' />
    </>
  ),
  document: (
    <>
      <path d='M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h8' />
    </>
  ),
  check: <path d='m5 12 4 4L19 6' />,
  bolt: <path d='m14 2-9 12h6l-1 8 9-12h-6l1-8Z' />,
};
export default function Icon({
  name,
  size = 20,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.7'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
