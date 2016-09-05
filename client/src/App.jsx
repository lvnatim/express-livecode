import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import Document from './Documents.jsx';
import Footer from './footer.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Document/>
        <Footer/>
      </div>
    );
  }
}
export default App;
