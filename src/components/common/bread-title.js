import React, { PureComponent } from 'react'
import { Breadcrumb } from 'antd'
import t from '../../i18n'

export default class BreadTitle extends PureComponent {

  render () {
    const {firstCode, secondCode} = this.props

    return (
      <Breadcrumb>
        <Breadcrumb.Item>{t(firstCode)}</Breadcrumb.Item>
        <Breadcrumb.Item>{t(secondCode)}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}
