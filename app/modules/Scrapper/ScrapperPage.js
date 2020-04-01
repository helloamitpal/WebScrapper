import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';

// import { LazyLoadImage } from 'react-lazy-load-image-component';

import * as scrapperActionCreator from './scrapperActionCreator';
import LoadingIndicator from '../../components/atoms/LoadingIndicator';
import Message from '../../components/atoms/Message';
import SearchInput from './molecules/SearchInput';
import translate from '../../locale';
import Row from './templates/Row';

import './Scrapper.scss';

const ScrapperPage = ({
  scrapperState: { links, errors, loading, savedLinks },
  scrapperActions
}) => {
  const [bookmarkList, setBookmarkList] = useState([]);

  useEffect(() => {
    scrapperActions.fetchSavedLinks();
  }, []);

  const onChangeSearch = (url) => {
    scrapperActions.fetchLinks(url);
    setBookmarkList([]);
  };

  const onBookmarkLink = (index, saved) => {
    let list;
    if (saved) {
      // removing item from saved list
      list = bookmarkList.filter((val) => (val !== index));
    } else {
      // adding item to the saved list
      list = [...bookmarkList, index];
    }
    setBookmarkList(list);
    scrapperActions.saveLink();
  };

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
    <div className="scrapper-page-container row">
      {head}
      {loading && <LoadingIndicator />}
      <SearchInput onSearch={onChangeSearch} className="mt-20" />
      {!loading && errors && <Message type="error" description={errors} />}
      <div className="links-list-container">
        {links.length ? (
          <VirtualList
            height={400}
            width="100%"
            itemCount={links.length}
            itemSize={60}
            renderItem={({ index, style }) => {
              const isSaved = bookmarkList.includes(index);
              const rowProps = {
                isSaved,
                index,
                style,
                className: `virtual-row ${isSaved ? 'selected' : ''}`,
                ...links[index]
              };

              return <Row {...rowProps} onClick={onBookmarkLink} />;
            }}
          />) : null
        }
      </div>
      <h2>{translate('scrapper.lastFewLinkTitle')}</h2>
      <div className="saved-links-container">
        {savedLinks.map(({ href, text }, index) => {
          const rowProps = {
            href,
            text,
            isSaved: true,
            index,
            className: 'virtual-row'
          };
          return <Row {...rowProps} />;
        })}
        {savedLinks.length === 0 ? <Message description={translate('scrapper.noSavedLink')} /> : null}
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
