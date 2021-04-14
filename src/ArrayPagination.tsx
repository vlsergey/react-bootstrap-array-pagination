import React, { PureComponent, ReactNode } from 'react';
import Form from 'react-bootstrap/Form';
import Pagination from '@vlsergey/react-bootstrap-pagination';

export interface PaginationResult<T> {
  components : ReactNode;
  offset : number;
  page : number;
  pageItems : T[];
  size : number;
}

interface PropsType<T> {
  children : ( itemsToRender : PaginationResult<T> ) => ReactNode;
  defaultPage? : number;
  defaultSize? : number;
  items : T[];
  pageProps? : React.ComponentProps< typeof Pagination >,
  sizeProps? : {
    options : number[];
  };
}

interface StateType {
  page : number;
  size : number;
}

export default class ArrayPagination<T> extends PureComponent<PropsType<T>, StateType> {

  static defaultProps = {
    defaultPage: 0,
    defaultSize: 10,
    pageProps: {},
    sizeProps: {
      options: [ 5, 10, 25, 50, 100, 500, 1000 ],
    }
  }

  constructor( props : PropsType<T> ) {
    super( props );
    this.state = {
      page: this.props.defaultPage,
      size: this.props.defaultSize,
    };
  }

  handlePageChange = ( { target: { value } } : ( {target:{value: number}} ) ) : void => {
    this.setState( { page: Number( value ) } );
  }

  handleSizeChange = ( event : React.ChangeEvent<HTMLSelectElement> ) : void => {
    const { currentTarget: { value } } = event;
    this.setState( { size: Number( value ) } );
  }

  render() : ReactNode {
    const { children, items, pageProps, sizeProps } = this.props;
    const { page, size } = this.state;
    const offset : number = size * page;

    const pageItems : T[] = items.slice( size * page, size * ( page + 1 ) );
    const pagination = <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 2 }}>
        <Pagination
          {...pageProps}
          name="page"
          onChange={this.handlePageChange}
          totalPages={Math.ceil( 1.0 * items.length / size )}
          value={page} />
      </div>
      <div style={{ flexGrow: 1 }}>
        <Form.Control
          as="select"
          name="size"
          onChange={this.handleSizeChange}
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
