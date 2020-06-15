// @flow

import type { ItemType, PropsType } from './PropsType';
import React, { PureComponent } from 'react';
import Form from 'react-bootstrap/Form';
import Pagination from '@vlsergey/react-bootstrap-pagination';

type StateType = {
  page : number,
  size : number,
};

export default class ArrayPagination extends PureComponent<PropsType, StateType> {

  static defaultProps = {
    defaultPage: 0,
    defaultSize: 10,
    pageProps: {},
    sizeProps: {
      options: [ 5, 10, 25, 50, 100, 500, 1000 ],
    }
  }

  handleChange : ( { target : { name : string, value : number } } => any );

  constructor() {
    super( ...arguments );
    this.state = {
      page: this.props.defaultPage,
      size: this.props.defaultSize,
    };

    this.handleChange = ( { target: { name, value } } ) => this.setState( { [ name ]: Number( value ) } );
  }

  render() {
    const { children, items, pageProps, sizeProps } = this.props;
    const { page, size } = this.state;
    const offset : number = size * page;

    const pageItems : ItemType[] = items.slice( size * page, size * ( page + 1 ) );
    const pagination = <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 2 }}>
        <Pagination
          {...pageProps}
          name="page"
          onChange={this.handleChange}
          totalPages={Math.ceil( 1.0 * items.length / size )}
          value={page} />
      </div>
      <div style={{ flexGrow: 1 }}>
        <Form.Control
          as="select"
          name="size"
          onChange={this.handleChange}
          value={size}>
          {sizeProps.options.map( option =>
            <option key={option} value={option}>{String( option )}</option>
          )}
        </Form.Control>
      </div>
    </div>;
    return children( {
      components: pagination,
      pageItems,
      page, offset, size,
    } );
  }
}
