# [coronamaison.net](https://coronamaison.net)

This README explains what this project is and how to contribute to it.

## CoronaMaison

This repository holds the website code of https://coronamaison.net. The website https://coronamaison.net is a tribute to the #CoronaMaison artist challenge started by French artists:

- [Pénélope Bagieu](https://twitter.com/PenelopeB),
- [Oscar Barda](https://twitter.com/OssKx),
- [Sandrine Deloffre](https://twitter.com/garagedeloffre)
- and [Timothy Hannem](https://twitter.com/acupoftim)

The #CoronaMaison challenge goal is to draw your favorite containment or stay-at-home place during the COVID-19 outbreak. Starting with a [template](./modele-coronamaison.jpg), you then customize and draw it as you want. Afterwards you publish it on Twitter with the hashtag #CoronaMaison and then this website (coronamaison.net) goal is to get all the drawings and display them in an organized fashion.

## Requirements

If you want to run this project locally, you need:

- [overmind](https://github.com/DarthSim/overmind): `brew install overmind` to easily launch the project
- [yarn](https://classic.yarnpkg.com/en/): https://classic.yarnpkg.com/en/docs/install/#alternatives-stable
- [Node.js](https://nodejs.org/en/): https://github.com/nvm-sh/nvm

If you want to run the data retrieval mechanisms, you will need:

- [pngquant](https://pngquant.org/): `brew install pngquant` for coloring pages optimization
- [Potrace](http://potrace.sourceforge.net/): `brew install potrace` for coloring pages generation
- `convert` for coloring pages generation
- [pngout](http://advsys.net/ken/utils.htm): brew install jonof/kenutils/pngout for coloring pages optimization
- A [Twitter OAuth 2.0 bearer token](https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0/application-only) with Search Tweets 30 days (Sandbox) free subscription and a dev environment created (named `dev`). You can get this bearer token manually in a terminal with a curl command following the guide from Twitter. We're not using any Twitter API client because they were not working for us.
- A `.env` file with:
  - the Twitter bearer token in `SECRET_TWITTER_BEARER_TOKEN`
  - `SECRET_OVH_CLOUD_USERNAME`, `SECRET_OVH_CLOUD_PASSWORD`, `SECRET_OVH_CLOUD_TENANTID` to upload drawings to https://media.coronamaison.net
  - `SECRET_ALGOLIA_ADMIN_API_KEY` To index drawings into Algolia

## How to use

This is a Next.js static application that reads data from `data/*.json` files to generate various pages. The `data/*.json` files are created by the `prepareData.js` script. `prepareData` reads from `data/drawings.json` and computes various data like popularity, JSON files per date, discard deleted tweets since data generation, optimize images, creates coloring pages etc...

The `findDrawings.js` script responsibility is to create and update a `data/drawings.json` which is a cache of the twitter data since the start of the challenge (Sun Mar 15 13:46:40 +0000 2020).

**To start the application locally:**

```bash
overmind s
```

**To update drawings:**

You do not necessarily need to update the drawings to contribute to this project. You only need to do the full drawings update if you're pushing to production. If you're trying to add features then just running `prepareData` or a custom script of yours is sufficient.

I (Vincent) generally update the drawings every day or so to find the new ones from Twitter.

Once you have everything ready, here's the process:

```bash
# 1. update the dates in `findDrawings.js`: copy `toDate` in `fromDate` and update `toDate` to match the new current time. I like to have "full days" pages so you should do the same for production updates
# 2. get new drawings
overmind run yarn findDrawings
# 3. first prepare data for new dates added (slow, optimizes images)
overmind run yarn prepareData
# 4. filter out the noise, a lot of people are using #CoronaMaison but their images are not part of the challenge. Go to the newly created dates and click on "delete" when appropriate
overmind s
# 5. regenerate data files
overmind run yarn prepareData
# 6. upload new assets to media.coronamaison.net
DATE=2020-04-19 overmind run yarn uploadMedia
# 7. update Algolia index
overmind run yarn indexDrawings
# 8. You're good to go, you can push to production or open a PR with updated drawings
```

## How to help

Use the [file TODO](./TODO) and choose a subject, open an issue or [DM me on Twitter](https://twitter.com/vvoyer) to discuss it.

**Adding more data computation**:

If you'd like to contribute, there's a good chance you will have to hook your code to the `prepareData` script. Since this script is already big, you can either do that or just create a different script that would (for example) handle: search data synchronization, pushing images to Cloudinary etc... All you have to do is read every JSON file from 2020-\*.json or the `data/drawingsById.json` file which contains all the current drawings. You should not use the file `data/drawings.json` since it's the raw, unfiltered data of all #CoronaMaison tweets.

## Manual coloring pages optimization

From time to time people will send coloring pages manually to me or on twitter. When this happens, you need to download the image locally, rename it to `twitter-${id}.jpg`, `id` being the original tweet id (not the one from the coloring page for example) and then run this command:

```bash
convert -resize 2300 filename png: | pngquant 4 - | pngout - filename.png -y
```

Once this is done you can move the coloring page to `data/manualColoringPages` and run `overmind yarn prepareData`.

## Re optimize every coloring page

In case you ever need to do this (in the public folder).

```bash
find . -iname '*png' -exec pngout -y {} {} \;
```
