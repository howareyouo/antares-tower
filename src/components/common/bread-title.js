import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import t from '../../i18n'

export default class BreadTitle extends Component {

  render () {
    const firstTitle = t(this.props.firstCode)
    const secondTitle = t(this.props.secondCode)

    return (
      <Breadcrumb>
        <Breadcrumb.Item>{firstTitle}</Breadcrumb.Item>
        <Breadcrumb.Item>{secondTitle}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}
