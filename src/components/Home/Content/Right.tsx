import SvgIllustration from './SvgIllustration';

const Right = () => {
  return (
    <div className={'h-full w-1/2 flex flex-col justify-center items-center'}>
      <div className={'w-96 object-cover shadow-xl'}>
        <SvgIllustration />
      </div>
    </div>
  );
};

export default Right;
