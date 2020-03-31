import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import * as scrapperActionCreator from './scrapperActionCreator';
import LoadingIndicator from '../../components/atoms/LoadingIndicator';
import Message from '../../components/atoms/Message';
import Input from '../../components/atoms/Input';
import config from '../../config';
import translate from '../../locale';

const ScrapperPage = ({
  articleState: { articles, error, loading },
  articleActions,
  history,
  match,
  location: { pathname }
}) => {
  const head = () => (
    <Helmet key={`scrapper-page-${Math.random()}`}>
      <title>{translate('article.articleList')}</title>
      <meta property="og:title" content="Scrapper link list" />
      <meta
        name="description"
        content="Get list of all hyperlinks available in a web page from a given URL"
      />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  // const gotoArticleDetails = article => {
  //   history.push({
  //     pathname: config.ARTICLE_DETAILS_PAGE,
  //     state: { ...article }
  //   });
  // };
  //
  // const renderArticles = () => {
  //   return articles.map((article) => (
  //     <div className="col s12 m6 l6 xl4 card-container" key={article.title}>
  //       <div className="card large">
  //         <div className="card-image">
  //           <LazyLoadImage alt={article.title} src={article.urlToImage} />
  //         </div>
  //         <div className="card-content">
  //           <span className="card-title">{article.title}</span>
  //         </div>
  //         <div className="card-action">
  //           <span className="link" onClick={() => gotoArticleDetails(article)}>{translate('common.readMore')}</span>
  //         </div>
  //       </div>
  //     </div>
  //   ));
  // };

  // useEffect(() => {
  //   const id = (match.params && match.params.id) || '';
  //   window.scrollTo(0, 0);
  //   articleActions.fetchArticles(id);
  // }, [match.params]);

  const onChangeSearch = (searchText) => {
    console.log(searchText);
  };

  return (
    <div className="article-page-container">
      {head()}
      {loading && <LoadingIndicator />}
      {!loading && error && <Message type="error" title={translate('common.oops')} description={error} />}
      {!loading && !error ? (
        <div className="row">
          <Input onChange={onChangeSearch} />
        </div>
      ) : null}
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
  articleState: PropTypes.object,
  articleActions: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object
};

ScrapperPage.defaultProps = {
  articleState: {},
  articleActions: {},
  history: {},
  match: {},
  location: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrapperPage);
