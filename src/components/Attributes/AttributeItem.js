/* eslint-disable react/prop-types */
import React, { Component } from "react"

class AttributeItem extends Component {
  render() {
    let { item, attribute, className, style, handleSelect } = this.props
    let bgStyle = style !== null && { backgroundColor: style }
    return (
      <div
        style={bgStyle}
        ref={this.divRef}
        data-g={`${item.value}`}
        className={className}
        onClick={(e) =>
          handleSelect(e, {
            attrName: attribute.name,
            selectedItem: {
              id: item.id,
              value: item.value,
              displayValue: item.displayValue,
            },
          })
        }
        key={item.value}
      >
        {attribute.type !== "swatch" ? item.value : ""}
      </div>
    )
  }
}

export default AttributeItem
