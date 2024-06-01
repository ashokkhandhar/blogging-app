import Header from './navigation/header';
import Footer from './navigation/footer.jsx';
import Posts from './posts/Posts.jsx';

function Home() {

  return (
    <div className="container">
      <Header />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
