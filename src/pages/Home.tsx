import Header from '../components/Home/Header/Header';
import Content from '../components/Home/Content/Content';

const Home = () => {
  return (
    <section className={'h-screen flex flex-col'}>
      <Header />
      <Content />
    </section>
  );
};

export default Home;
