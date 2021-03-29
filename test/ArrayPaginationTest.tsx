import ArrayPagination from '../src/ArrayPagination';
import { assert } from 'chai';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

describe( 'ArrayPagination', () => {

  it( 'will display less items when page size is decrease', () => {
    const items : string[] = [];
    for ( let i = 0; i < 100; i++ ) {
      items.push( `#${i + 1}` );
    }

    const rendered = ReactTestUtils.renderIntoDocument( <ArrayPagination
      items={items}>
      {( { components, pageItems } ) => <div>
        {components}
        <div className="test-span">{pageItems.join( ',' )}</div>
      </div> }
    </ArrayPagination> ) as unknown as ArrayPagination<string>;

    const testSpan = ReactTestUtils.findRenderedDOMComponentWithClass( rendered, 'test-span' ) as HTMLSpanElement;
    assert.equal( testSpan.textContent, '#1,#2,#3,#4,#5,#6,#7,#8,#9,#10' );

    // change to 5 elements per page
    const sizeSelect = ReactTestUtils.findRenderedDOMComponentWithTag( rendered, 'select' ) as HTMLSelectElement;
    assert.equal( sizeSelect.value, '10' );
    sizeSelect.value = '5';
    ReactTestUtils.Simulate.change( sizeSelect );

    assert.equal( testSpan.textContent, '#1,#2,#3,#4,#5' );
  } );

} );
