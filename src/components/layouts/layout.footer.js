import React, { Component } from 'react'
import { Layout } from 'antd'

const {Footer: LayoutFooter} = Layout

export default class BottomFooter extends Component {
  render () {
    return (
      <LayoutFooter style={{textAlign: 'center'}}>
        Copyright &nbsp;&copy;<a href="mailto:haolin.h0@gmail.com">haolin</a>,
        Powered by <a href="http://ant.design" target="_blank" rel="noopener noreferrer">Ant Design</a>.
      </LayoutFooter>
    )
  }
}

