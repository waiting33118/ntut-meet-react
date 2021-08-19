import Logo from './Logo';

const Header = () => {
  return (
    <header className={'p-3 h-20'}>
      <div className={'flex items-center font-mono'}>
        <Logo />
        <span className={'mx-2 font-bold text-3xl text-gray-600'}>Ntut</span>
        <span className={'font-medium text-2xl text-gray-600'}>Meet</span>
      </div>
    </header>
  );
};

export default Header;
