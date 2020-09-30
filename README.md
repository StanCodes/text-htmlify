# text-htmlify

A small and simple library that transforms e-mail text message body to HTML

## Installing
`$ npm install text-htmlify`

## Using

```js
const TextHtmlify = require('text-hmtlify')
const th = new TextHtmlify()
const dom = th.process(textAsString)
```

## API

### hs.process(string, [options])

Where `string` is a valid text of type `String`.

`options`:
- customClass: `[String]` default:`th` - the class added to created HTML elements
- wrapElement: `[false|String|null]` default: `false` - if omitted or false, it won't wrap text lines in HTML elements, otherwise it will wrap with element provided as string `div`, `span` and etc.
- targetBlank: `[Boolean]` default: `true` - a flag indicating if created HTML links should have `target='_blank'` attribute

Returns an `[Object]` containing `htmlString` prop which has the produced HTML document represented as `string`.

## Example

```js
const fs = require('fs')
const TextHtmlify = require('text-htmlify')

const th = new TextHtmlify()

console.log('Reading test file...')
fs.readFile('data.html', 'utf8', (err, data) => {
    if (err) console.log('Read file error: ', err)
    const html = th.process(data, {wrapElement: 'div', customClass: 'myClass'})
    console.log('Reading done!')
    console.log('Writing HTML string to file...')

    fs.writeFile('data_processed.html', html.htmlString, (err) => {
        if (err) console.log('Write file error: ', err)
        console.log('Writing to HTML file done!')
    })
  })
```

## To do
- Add error reporting
- Increase algorithm effectiveness and speed

## License
MIT