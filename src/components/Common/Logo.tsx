export default function Logo() {
  return (
    <span className='brand' aria-label='전기차G'>
      <span aria-hidden='true'>전기차</span>
      <svg viewBox='0 0 40 40' width='34' height='34' aria-hidden='true'>
        <path
          fill='#F4B400'
          d='M34.9 8.5A18 18 0 1 0 38 20v-3H22v7h8.6a10.5 10.5 0 1 1-1.9-10.7Z'
        />
      </svg>
    </span>
  );
}
