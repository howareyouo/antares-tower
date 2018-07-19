import React, { Component } from 'react'
import { Select } from 'antd'
import { Ajax } from '../common/ajax'
import t from '../../i18n'

const Option = Select.Option

export default class AppSelect extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
      apps: []
    }
  }

  componentDidMount () {
    this.loadApps()
  }

  loadApps () {
    const self = this

    // load all apps
    Ajax.get('/api/apps', {pageNo: 1, pageSize: 10000}, function (response) {
      var data = response.data
      var state = {
        apps: data
      }
      if (data.length) {
        state.value = data[0].id
        self.props.onChange(state.value)
      }
      self.setState(state)
    })
  }

  render () {

    const apps = this.state.apps

    return (
      <Select style={{width: 220}}
              value={this.state.value}
              placeholder={t('apps.select')}
              optionFilterProp="children"
              notFoundContent={t('not.found')}
              onChange={(value) => this.props.onChange(value)}
              showSearch>

        {apps.map((app, index) => (
          <Option key={app.id} value={app.id}>{app.appName}</Option>
        ))}

      </Select>
    )
  }
}

