# [coronamaison.net](https://coronamaison.net)

Nothing to see here, YET.

## Requirements

- overmind: brew install overmind
- yarn: https://classic.yarnpkg.com/en/docs/install/#alternatives-stable
- node: https://github.com/nvm-sh/nvm
- brew install pngquant
- brew install potrace
- convert
- pngout: brew install jonof/kenutils/pngout

## Notes

## Manual coloring pages optimization

```bash
convert -resize 2300 filename png: | pngquant 4 - | pngout - filename.png -y
```

## Re optimize every coloring page

```bash
find . -iname '*png' -exec pngout -y {} {} \;
```
