import Left from './Left';
import Right from './Right';

const Content = () => {
  return (
    <div className={'flex-auto'}>
      <div className={'flex h-full'}>
        <Left />
        <Right />
      </div>
    </div>
  );
};

export default Content;
