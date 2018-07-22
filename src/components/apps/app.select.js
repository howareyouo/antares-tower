import React, { Component } from 'react'
import { Select } from 'antd'
import http from '../common/http'
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

  onChange = (value) => {
    this.props.onChange(value)
    this.setState({value})
  }

  loadApps () {
    const self = this

    // load all apps
    http.get('/api/apps', {pageNo: 1, pageSize: 10000}).then(response => {
      var apps = response.data
      var state = {apps}
      if (apps.length) {
        state.value = apps[0].id
        self.props.onChange(state.value)
      }
      self.setState(state)
    })
  }

  render () {

    const {apps, value} = this.state

    return (
      <Select style={{width: 220}}
              value={value}
              placeholder={t('app.select')}
              optionFilterProp="children"
              notFoundContent={t('not.found')}
              onChange={this.onChange}
              showSearch>

        {apps.map((app, index) => (
          <Option key={app.id} value={app.id}>{app.appName}</Option>
        ))}

      </Select>
    )
  }
}

