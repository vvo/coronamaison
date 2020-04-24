import React from "react";
import PropTypes from "prop-types";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  TelegramShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  VKIcon,
  WhatsappIcon,
} from "react-share";

export default function Share({ url, title, description, lang }) {
  return (
    <div className="my-4 text-center text-sm">
      {lang === "en" ? "Share this page:" : "Partage cette page :"}
      <div className="flex justify-center items-center">
        <FacebookShareButton className="mx-1" url={url} quote={title}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <EmailShareButton className="mx-1" url={url} subject={title}>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
        <TwitterShareButton className="mx-1" url={url} title={title}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton
          className="mx-1"
          url={url}
          title={title}
          description={description}
          source={"CoronaMaison.net"}
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <RedditShareButton className="mx-1" url={url} title={title}>
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
        <TelegramShareButton className="mx-1" url={url} title={title}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <VKShareButton className="mx-1" url={url} title={title}>
          <VKIcon size={32} round={true} />
        </VKShareButton>
        <WhatsappShareButton className="mx-1" url={url} title={title}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
}

Share.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  lang: PropTypes.string,
};
