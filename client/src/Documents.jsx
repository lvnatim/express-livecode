import React, {Component} from 'react';
import LiveDocument from './LiveDocuments.jsx'
import { Row } from 'react-bootstrap'

class Document extends Component {
  render() {
    return (
      <Row>
        <LiveDocument/>
      </Row>
    );
  }
}
export default Document;