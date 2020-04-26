import PropTypes from "prop-types";
import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectHits,
  SearchBox,
  connectStateResults,
  PoweredBy,
} from "react-instantsearch-dom";

import DrawingsList from "components/DrawingsList";

export default function Search({ lang, children }) {
  const algoliaClient = algoliasearch(
    process.env.ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_SEARCH_ONLY_API_KEY,
  );

  const searchClient = {
    search(requests) {
      if (requests[0].params.query === "") {
        return;
      }

      return algoliaClient.search(requests);
    },
  };

  // eslint-disable-next-line react/prop-types
  const Hits = ({ hits }) =>
    hits.length === 0 ? (
      lang === "en" ? (
        "No result"
      ) : (
        "Rien trouvé"
      )
    ) : (
      <DrawingsList lang={lang} drawings={hits} />
    );
  const CustomHits = connectHits(Hits);

  const Results = connectStateResults(({ searchState }) =>
    searchState && searchState.query ? <CustomHits /> : children,
  );

  return (
    <InstantSearch
      indexName={process.env.ALGOLIA_INDEX_NAME}
      searchClient={searchClient}
    >
      <div className="relative mb-4">
        <SearchBox
          translations={{
            placeholder:
              lang === "en"
                ? "search: gally, acupoftim, ..."
                : "recherche: gally, acupoftim, ...",
          }}
        />
        <div className="absolute top-0 right-0 -mt-6 opacity-75 hover:opacity-100">
          <PoweredBy />
        </div>
      </div>
      <Results />
    </InstantSearch>
  );
}

Search.propTypes = {
  children: PropTypes.node,
  lang: PropTypes.string,
};
