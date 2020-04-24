import React from "react";
import Head from "next/head";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectHits,
  connectSearchBox,
} from "react-instantsearch-dom";
import DrawingsList from "components/DrawingsList";

export default function Search() {
  const title = "CoronaMaison : à propos du projet CoronaMaison";
  const description = "Qui est derrière le project CoronaMaison";
  const socialImage = "https://coronamaison.net/modele-coronamaison.jpg";

  const searchClient = algoliasearch(
    "Q6M2U2JENU",
    "18f43c11d0b502a6a52d76b70fd0adae",
  );

  const Hits = ({ hits }) => <DrawingsList drawings={hits} />;
  const CustomHits = connectHits(Hits);

  const SearchBox = ({ currentRefinement, refine }) => (
    // return the DOM output
    <div className="ais-SearchBox">
      <form className="ais-SearchBox-form" noValidate>
        <input
          className="ais-SearchBox-input bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Chercher un pseudo twitter"
          spellCheck="false"
          maxLength="512"
          type="search"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
        <button
          className="ais-SearchBox-submit"
          type="submit"
          title="Submit the search query."
        >
          <svg
            className="ais-SearchBox-submitIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 40 40"
          >
            ...
          </svg>
        </button>
        <button
          className="ais-SearchBox-reset"
          type="reset"
          title="Clear the search query."
          hidden
        >
          <svg
            className="ais-SearchBox-resetIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="10"
            height="10"
          >
            ...
          </svg>
        </button>
        <span className="ais-SearchBox-loadingIndicator" hidden>
          <svg
            width="16"
            height="16"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#444"
            className="ais-SearchBox-loadingIcon"
          >
            ...
          </svg>
        </span>
      </form>
    </div>
  );

  const CustomSearchBox = connectSearchBox(SearchBox);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={socialImage} />

        <meta property="twitter:card" content="summary_large_image" />
      </Head>

      <InstantSearch indexName="coronamaison" searchClient={searchClient}>
        <CustomSearchBox />
        <CustomHits />
      </InstantSearch>
    </>
  );
}
