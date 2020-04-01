import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import VirtualList from 'react-tiny-virtual-list';

// import { LazyLoadImage } from 'react-lazy-load-image-component';

import * as scrapperActionCreator from '../../scrapperActionCreator';
import LoadingIndicator from '../../../../components/atoms/LoadingIndicator';
import Message from '../../../../components/atoms/Message';
import translate from '../../../../locale';
import Row from '../../templates/Row';

import '../../Scrapper.scss';

const ScrapperListPage = ({
  scrapperState: { loading, savedLinks, errors },
  scrapperActions
}) => {
  useEffect(() => {
    scrapperActions.fetchSavedLinks();
  }, [scrapperActions]);

  const head = (
    <Helmet key="scrapper-page">
      <title>{translate('scrapper.listTitle')}</title>
      <meta property="og:title" content="Scrapper saved links" />
      <meta
        name="description"
        content="Get list of all hyperlinks available in a web page from a given URL"
      />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );

  const onRemoveBookmark = (index) => {
    scrapperActions.removeLink(savedLinks[index].id);
  };

  return (
    <div className="scrapper-page-container row">
      {head}
      {loading && <LoadingIndicator />}
      <div className="sub-title">{translate('scrapper.rowCountTitle', { COUNT: savedLinks.length })}</div>
      <div className="links-list-container">
        {savedLinks.length
          ? (
            <VirtualList
              height={400}
              width="100%"
              itemCount={savedLinks.length}
              itemSize={60}
              renderItem={({ index, style }) => {
                const rowProps = {
                  isSaved: true,
                  index,
                  style,
                  className: 'virtual-row',
                  ...savedLinks[index]
                };

                return <Row {...rowProps} onClick={onRemoveBookmark} />;
              }}
            />
          )
          : <Message description={translate('scrapper.noSavedLink')} />
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

ScrapperListPage.propTypes = {
  scrapperState: PropTypes.object,
  scrapperActions: PropTypes.object
};

ScrapperListPage.defaultProps = {
  scrapperState: {},
  scrapperActions: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrapperListPage);
