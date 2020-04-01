import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';
import { toast } from 'react-toastify';

import * as scrapperActionCreator from '../../scrapperActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import Message from '../../../../components/atoms/Message';
import SearchInput from '../../molecules/SearchInput';
import translate from '../../../../locale';
import Row from '../../templates/Row';
import config from '../../../../config';

import '../../Scrapper.scss';

const ScrapperHomePage = ({
  scrapperState: { links, errors, loading, topLinks },
  scrapperActions,
  history
}) => {
  const [bookmarkList, setBookmarkList] = useState([]);

  // make api call at the begining to fetch a couple of saved links
  useEffect(() => {
    scrapperActions.fetchTopSavedLinks(config.MAX_LINK_SHOW_COUNT);
  }, [scrapperActions]);

  // show toast message if any errror occurrs
  useEffect(() => {
    if (errors) {
      toast.error(errors);
    }
  }, [errors]);

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
    scrapperActions.saveLink(links[index]);
  };

  const showAllSavedLinks = () => {
    history.push(config.SCRAPPER_SAVED_LINKS_PAGE);
  };

  const head = (
    <Helmet key="scrapper-page">
      <title>{translate('common.appName')}</title>
      <meta property="og:title" content="Scrapper home page" />
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

              return <Row key={`row-${index.toString()}`} {...rowProps} onClick={onBookmarkLink} />;
            }}
          />) : null
        }
      </div>
      <h2>{translate('scrapper.lastFewLinkTitle')}</h2>
      <div className="saved-links-container">
        {topLinks.map(({ href, text, id }, index) => {
          const rowProps = {
            href,
            text,
            isSaved: true,
            index,
            className: 'virtual-row'
          };
          return <Row key={`topRow-${id}`} {...rowProps} />;
        })}
        {topLinks.length === 0
          ? <Message description={translate('scrapper.noSavedLink')} />
          : null
        }
        {topLinks.length > config.MAX_LINK_SHOW_COUNT
          ? <button type="button" onClick={showAllSavedLinks}>{translate('common.showAll')}</button>
          : null
        }
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

ScrapperHomePage.propTypes = {
  scrapperState: PropTypes.object,
  scrapperActions: PropTypes.object,
  history: PropTypes.object
};

ScrapperHomePage.defaultProps = {
  scrapperState: {},
  scrapperActions: {},
  history: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrapperHomePage);
