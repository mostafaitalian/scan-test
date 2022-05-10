import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import "./productitem.style.css"
import PropTypes from "prop-types"

import { ReactComponent as InCart } from "../../logos/incart.svg"
// import { ReactComponent as AddCart } from "../../logos/Vector.svg"
import { incProductQuantityNoAttr, addProductCart } from "../../redux/actions/Cart"

import ProductItemInfo from "./ProductItemInfo"

class ProductItem extends Component {
  static propTypes = {
    history: PropTypes.object,
    product: PropTypes.object,
    currentCurrency: PropTypes.object,
    cart: PropTypes.array,
    dispatch: PropTypes.func,
  }

  handleNavToPD = () => {
    this.props.history.push(
      `/products/${this.props.product.category}/${this.props.product.id}`
    )
  }
  handleClickOnAddCart = (product) => {
    let cartProductIds = []
    for (const sProduct of this.props.cart) {
      cartProductIds.push(sProduct.product.id)
    }
    if (cartProductIds.includes(product.id)) {
      this.props.dispatch(incProductQuantityNoAttr(product.id))
      this.props.history.push(`/${product.category}`)
    } else {
      this.props.dispatch(addProductCart(product, 1, {}))
      this.props.history.push(`/${product.category}`)
    }
  }
  render() {
    const { product } = this.props
    let amount, symbol
    if (
      this.props.currentCurrency !== undefined &&
      Object.keys(this.props.currentCurrency)
    ) {
      const currentItemPrice = this.props.product.prices.filter(
        (price) => price.currency.label === this.props.currentCurrency.label
      )
      const p = currentItemPrice[0]
      if (p !== undefined) {
        amount = p.amount
        symbol = p.currency.symbol
      }
    }
    return (
      <div className="product-item">
        <div className="img-container" onClick={() => this.handleNavToPD()}>
          {this.props.cart.find((pc) => pc.product.id === product.id) && (
            <div className="product-in-cart">
              <InCart height={25} width={25} />
            </div>
          )}
          {product.inStock ? (
            <img
              className="product-item-img"
              src={product.gallery[0]}
              alt="product-item"
            />
          ) : (
            <Fragment>
              <div className="out-of-stock">Out of Stock</div>
              <img
                className="product-item-img-out"
                src={product.gallery[0]}
                alt="product-item"
              />
            </Fragment>
          )}
        </div>
        {/* Product has no attributes and in stock so we can add it to cart from plp */}
        {product.inStock ? (
          product.attributes.length !== 0 ? (
            <ProductItemInfo
              product={product}
              symbol={symbol}
              amount={amount}
              dNone={false}
            />
          ) : (
            <Fragment>
              <ProductItemInfo
                product={product}
                symbol={symbol}
                amount={amount}
                dNone={true}
                handleClickOnAddCart={this.handleClickOnAddCart}
              />
            </Fragment>
          )
        ) : (
          <ProductItemInfo
            product={product}
            symbol={symbol}
            amount={amount}
            dNone={false}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentCurrency: state.currentCurrency,
    cart: state.cart,
  }
}
export default connect(mapStateToProps)(withRouter(ProductItem))
