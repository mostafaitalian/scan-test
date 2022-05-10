import React, { Component } from "react"

import PropTypes from "prop-types"

import { ReactComponent as AddCart } from "../../logos/Vector.svg"

class ProductItemInfo extends Component {
  static propTypes = {
    product: PropTypes.object,
    dNone: PropTypes.bool.isRequired,
    symbol: PropTypes.string,
    amount: PropTypes.number,
    handleClickOnAddCart: PropTypes.func,
  }

  render() {
    const { product, dNone, symbol, amount, handleClickOnAddCart } = this.props
    return (
      <div className="product-item-info">
        <h4>
          {product.name} {product.brand}
        </h4>
        <h4>
          {symbol} {amount}
        </h4>
        {dNone && (
          <div onClick={() => handleClickOnAddCart(product)} className="product-add-cart">
            <AddCart height={25} width={25} />
          </div>
        )}
      </div>
    )
  }
}

export default ProductItemInfo
