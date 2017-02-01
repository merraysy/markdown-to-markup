import _ from 'lodash';
import React, { Component } from 'react';

// actions
import { DocumentActions } from '../../actions';

// components
import Footer from '../../components/Footer';
import Header from '../../components/Header';

// stores
import { DocumentStore, SpinnerStore, UserStore } from '../../stores';

class MainLayout extends Component {
  constructor(props) {
    super(props);

    // listener tokens
    this._documentStoreListenerToken = null;
    this._spinnerStoreListenerToken = null;
    this._userStoreListenerToken = null;

    // state
    this.state = {
      user: UserStore.getUser(),
      latestPublicDocs: DocumentStore.getLatestPublicDocs(),
      publicDocs: DocumentStore.getPublicDocs(),
      currentDocument: DocumentStore.getCurrentDocument(),
      spinner: SpinnerStore.getSpinner()
    };

    // bind `this`
    this.viewSingleDocument = this.viewSingleDocument.bind(this);
  } // end-constructor

  componentWillMount() {
    this._documentStoreListenerToken = DocumentStore.addListener(() => {
      this.setState({
        latestPublicDocs: DocumentStore.getLatestPublicDocs(),
        publicDocs: DocumentStore.getPublicDocs(),
        currentDocument: DocumentStore.getCurrentDocument()
      });
    });
    this._spinnerStoreListenerToken = UserStore.addListener(() => {
      this.setState({
        spinner: SpinnerStore.getSpinner()
      });
    });
    this._userStoreListenerToken = UserStore.addListener(() => {
      this.setState({
        user: UserStore.getUser()
      });
    });
  } // end-componentWillMount

  componentWillUnmount() {
    this._documentStoreListenerToken.remove();
    this._spinnerStoreListenerToken.remove();
    this._userStoreListenerToken.remove();
  } // end-componentWillMount

  viewSingleDocument(id) {
    DocumentActions.viewSingleDocument(id);
  } // end-viewSingleDocument

  render() {
    // children props
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      let props = {
        latestPublicDocs: this.state.latestPublicDocs,
        publicDocs: this.state.publicDocs,
        currentDocument: this.state.currentDocument,
        user: this.state.user,
        viewSingleDocument: this.viewSingleDocument,
        spinner: this.state.spinner
      };
      return React.cloneElement(child, props);
    });

    return (
      <div>
        <Header user={this.state.user} spinner={this.state.spinner} />
        {childrenWithProps}
        <Footer />
      </div>
    );
  } // end-render
} // end-MainLayout

export default MainLayout;
