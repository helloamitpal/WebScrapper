import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

import * as scrapperActionCreator from './scrapperActionCreator';
import LoadingIndicator from '../../components/atoms/LoadingIndicator';
import Message from '../../components/atoms/Message';
import Input from '../../components/atoms/Input';
// import config from '../../config';
import translate from '../../locale';

import './Scrapper.scss';

const ScrapperPage = ({
  scrapperState: { links, errors, loading },
  scrapperActions
}) => {
  const URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&=]*)/;

  const onChangeSearch = (url) => {
    scrapperActions.fetchLinks(url);
  };

  const validateInput = (val) => (val && val.match(URL_REGEX));

  const head = (
    <Helmet key="scrapper-page">
      <title>{translate('common.appName')}</title>
      <meta property="og:title" content="Scrapper link list" />
      <meta
        name="description"
        content="Get list of all hyperlinks available in a web page from a given URL"
      />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  return (
    <div className="scrapper-page-container mt-20">
      {head}
      {loading && <LoadingIndicator />}
      {!loading && errors && (
        <Message
          type="error"
          title={translate('common.oops')}
          description={errors}
        />
      )}
      <div className="row">
        <Input
          onChange={onChangeSearch}
          validate={validateInput}
          placeholder={translate('common.URL')}
        />
        <div className="links-list-container">
          {links && links.map(({ href }) => (<div key={href}>{href}</div>))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  scrapperState: state.scrapper
});

const mapDispatchToProps = (dispatch) => ({
  scrapperActions: bindActionCreators(scrapperActionCreator, dispatch)
});

ScrapperPage.propTypes = {
  scrapperState: PropTypes.object,
  scrapperActions: PropTypes.object
};

ScrapperPage.defaultProps = {
  scrapperState: {},
  scrapperActions: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrapperPage);
