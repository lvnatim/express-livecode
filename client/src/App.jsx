import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import Document from './Documents.jsx';
import Footer from './footer.jsx';
import { Grid } from 'react-bootstrap'
import { Row } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
          <div className="backgroundbanner">
          </div>
        <Grid>
          <Row className="show-grid">
            <Document/>
          </Row>
          <Row>
            <Footer/>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default App;
