import Header from "./../components/header/Header";
import Footer from "./../components/footer/footer";
import SearchForm from "./../components/SearchForm/search-form";
import NavigationBar from "./../components/NavigationBar/navigation-bar";
import CarList from "./../components/Cars-List/Cars-List";

const Main = () => {
  return (
    <>
      <div style={{ backgroundColor: "#e9e9e9" }}>
        <Header />
        <NavigationBar />
        <SearchForm />
        <CarList />
        <Footer />
      </div>
    </>
  );
};

export default Main;
