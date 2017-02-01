import $ from 'jquery';
import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import fileDownload from 'react-file-download';

// actions
import { DocumentActions, EditorActions } from '../../actions';

// components
import Header from '../../components/Header';

// stores
import { DocumentStore, EditorStore, SpinnerStore, UserStore } from '../../stores';

class EditorLayout extends Component {
  constructor(props) {
    super(props);

    // listener tokens
    this._documentStoreListenerToken = null;
    this._editorStoreListenerToken = null;
    this._spinnerStoreListenerToken = null;
    this._userStoreListenerToken = null;

    // state
    this.state = {
      user: UserStore.getUser(),
      userDocs: DocumentStore.getUserDocs(),
      currentDoc: EditorStore.getCurrentDoc(),
      input: EditorStore.getInput(),
      output: EditorStore.getOutput(),
      spinner: SpinnerStore.getSpinner()
    };

    // change timeout
    this._changeTimeout = null;

    // bind `this`
    this.changeHandler = this.changeHandler.bind(this);
    this.createNewDoc = this.createNewDoc.bind(this);
    this.editDoc = this.editDoc.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
    this.downloadDoc = this.downloadDoc.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
  } // end-constructor

  componentWillMount() {
    this._documentStoreListenerToken = DocumentStore.addListener(() => {
      this.setState({
        userDocs: DocumentStore.getUserDocs()
      });
    });
    this._editorStoreListenerToken = EditorStore.addListener(() => {
      this.setState({
        input: EditorStore.getInput(),
        output: EditorStore.getOutput(),
        currentDoc: EditorStore.getCurrentDoc()
      });
    });
    this._spinnerStoreListenerToken = SpinnerStore.addListener(() => {
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

  componentDidMount() {
    if (!this.state.user) {
      browserHistory.push('/auth/login');
    }
  } // end-componentDidMount

  componentWillUnmount() {
    this._documentStoreListenerToken.remove();
    this._editorStoreListenerToken.remove();
    this._spinnerStoreListenerToken.remove();
    this._userStoreListenerToken.remove();
  } // end-componentWillUnmount

  changeHandler(nVals) {
    EditorActions.changeDoc(nVals);
    this.saveDoc();
  } // end-changeHandler

  createNewDoc() {
    let user = this.state.user;
    EditorActions.newDocReq(user, (newDocId) => {
      DocumentActions.loadUserDocsReq(user, () => {
        EditorActions.editDoc(newDocId);
        DocumentActions.loadPublicDocsReq(user);
      });
    });
  } // end-createNewDoc

  editDoc(id) {
    EditorActions.editDoc(id);
  } // editDoc

  saveDoc() {
    let user = this.state.user;
    let { id, title, text, isPrivate } = this.state.currentDoc;
    clearTimeout(this._changeTimeout);
    this._changeTimeout = setTimeout(() => {
      EditorActions.saveDoc(user, { id, title, text, isPrivate }, () => {
        DocumentActions.loadPublicDocsReq(user);
      });
    }, 1000);
  } // end-saveDoc

  togglePrivate() {
    let isPrivate = !this.state.currentDoc.isPrivate;
    this.changeHandler({ isPrivate });
  } // togglePrivate

  downloadDoc() {
    fileDownload(this.state.currentDoc.text, `${this.state.currentDoc.title}.md`);
  } // end-downloadDoc

  deleteDoc(id) {
    let user = this.state.user;
    EditorActions.deleteDoc(user, id, () => {
      DocumentActions.loadUserDocsReq(user);
    });
  } // deleteDoc

  render() {
    // jquery
    const toggleOptionBtns = ($btn, opts) => {
      var $icon = $btn.find('.fa');
      var $text = $btn.find('.text');

      if ($icon.hasClass(opts.firstClass)) {
        $icon.removeClass(opts.firstClass).addClass(opts.secondClass);
        $text.html(opts.secondText);
      } else {
        $icon.removeClass(opts.secondClass).addClass(opts.firstClass);
        $text.html(opts.firstText);
      }
    }; // end-toggleOptionBtns

    const toggleNav = () => {
      toggleOptionBtns($('#toggle-nav'), {
        firstClass: 'fa-window-maximize',
        firstText: 'Hide Nav',
        secondClass: 'fa-columns',
        secondText: 'Show Nav'
      });

      $('.documents-nav').toggle();
      if ($('.preview').is(':visible')) {
        if ($('.editor').hasClass('col-md-5')) {
          $('.editor, .preview').removeClass('col-md-5').addClass('col-md-6');
        } else {
          $('.editor, .preview').removeClass('col-md-6').addClass('col-md-5');
        }
      } else {
        $('.editor').toggleClass('col-md-10').toggleClass('col-md-12');
      }
    }; // end-toggleNav

    const togglePreview = () => {
      toggleOptionBtns($('#toggle-preview'), {
        firstClass: 'fa-window-close-o',
        firstText: 'Hide Preview',
        secondClass: 'fa-window-restore',
        secondText: 'Show Preview'
      });

      if ($('.documents-nav').is(':visible')) {
        if ($('.editor').hasClass('col-md-5')) {
          $('.editor').removeClass('col-md-5').addClass('col-md-10');
          $('.preview').toggle();
        } else {
          $('.editor').removeClass('col-md-6').addClass('col-md-5');
          $('.preview').toggle();
        }
      } else {
        $('.editor').toggleClass('col-md-6');
        $('.preview').toggle();
      }
    }; // togglePreview

    // children props
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      let props = {
        user: this.state.user,
        userDocs: this.state.userDocs,
        currentDoc: this.state.currentDoc,
        changeHandler: this.changeHandler,
        createNewDoc: this.createNewDoc,
        editDoc: this.editDoc,
        togglePrivate: this.togglePrivate,
        downloadDoc: this.downloadDoc,
        deleteDoc: this.deleteDoc,
        inputButtonsClickHandlers: {
          toggleNav,
          togglePreview
        },
        input: this.state.input,
        output: this.state.output
      };
      return React.cloneElement(child, props);
    });

    return (
      <div>
        <Header
          user={this.state.user}
          spinner={this.state.spinner} />
        {childrenWithProps}
      </div>
    );
  } // end-render
} // end-EditorLayout

export default EditorLayout;
