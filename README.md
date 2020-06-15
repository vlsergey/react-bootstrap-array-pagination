# @vlsergey/react-bootstrap-array-pagination

React Bootstrap component to build pagination for array of items.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

# One-thousand-word-picture

![](https://raw.githubusercontent.com/vlsergey/react-bootstrap-pagination/master/doc-images/size5pageDefault.png)

# Installation
```
npm i --save @vlsergey/react-bootstrap-array-pagination
```
or
```
npm i --save-dev @vlsergey/react-bootstrap-array-pagination
```

# Usage
```jsx
import ArrayPagination from '@vlsergey/react-bootstrap-array-pagination';

const items = /* array of some items */;

<ArrayPagination items={items}>
  { pageResult => <>
    {/* JSX to render limited subarray of original items */}
  </> }
<ArrayPagination>

<ArrayPagination items={items}>
  {pageResult => <>
    {pageResult.components}
    {`This is a page ${pageResult.page + 1} of size ${pageResult.size} at offset ${pageResult.offset}`}
    <ul>
      {pageResult.pageItems.map( item =>
        <li>{'This is a line for item: '}{JSON.stringify( item )}</li>
      )}
    </ul>
    {pageResult.components}
  </>}
</ArrayPagination>
```

# Props
| Property        | Default value | Description |
| --------------- |:-------------:| ----------- |
| **`items`**     | *required*    | Items to paginate.                                                                        |
| **`children`**  | *required*    | How to render single page.                                                                |
| `defaultPage`   | `0`           | Page to display by default (0-based).                                                     |
| `defaultSize`   | `10`          | Items to diplay on single page by default. _Should_ present in `sizeProps.options` array. |
| `pageProps`     | `{}`          | Properties passed to instance of [`@vlsergey/react-bootstrap-pagination`](https://github.com/vlsergey/react-bootstrap-pagination) |
| `sizeProps`     | `{}`          | Properties for page size `select` customization. So far supports only `options` property. |

## `children` function argument structure

The argument of `children` function is a structure with following properties:
| Property        | Description |
| --------------- |------------ |
| `components     | Single 100%-width line (`DIV`) with pagination and page size form controls.
| `pageItems`     | Slice of original `items` array to display on current page.
| `offset`        | Current offset for first current page item (0-based)
| `page`          | Current page index (0-based)
| `size`          | Current page size

# Examples
```jsx
<ArrayPagination
  defaultSize={5}
  items={[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ]}>
  {( { components, pageItems } ) => <>
    {components}<ul>
      {pageItems.map( item => <li key={item}>
        {'This is a line of item #'}{item}
      </li> )}
    </ul>{components}
  </>}
</ArrayPagination>
```
![](https://raw.githubusercontent.com/vlsergey/react-bootstrap-array-pagination/master/doc-images/size5pageDefault.png)

```jsx
<ArrayPagination
  defaultPage={3}
  defaultSize={3}
  items={[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ]}
  pageProps={{ showFirstLast: false, showPrevNext: false }}
  sizeProps={{ options: [ 1, 2, 3, 4, 5 ] }}>
  {( { components, pageItems } ) => <>
    {components}<ul>
      {pageItems.map( item => <li key={item}>
        {'This is a line of item #'}{item}
      </li> )}
    </ul>{components}
  </>}
</ArrayPagination>
```
![](https://raw.githubusercontent.com/vlsergey/react-bootstrap-array-pagination/master/doc-images/size3page3.png)

[npm-image]: https://img.shields.io/npm/v/@vlsergey/react-bootstrap-array-pagination.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@vlsergey/react-bootstrap-array-pagination
[travis-image]: https://travis-ci.com/vlsergey/react-bootstrap-array-pagination.svg?branch=master
[travis-url]: https://travis-ci.com/vlsergey/react-bootstrap-array-pagination
[downloads-image]: http://img.shields.io/npm/dm/@vlsergey/react-bootstrap-array-pagination.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/@vlsergey/react-bootstrap-array-pagination
