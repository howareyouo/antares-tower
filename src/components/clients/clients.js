import React from 'react'
import { Button, Table } from 'antd'
import AppSelect from '../apps/app.select'
import BreadTitle from '../common/bread-title'
import http from '../common/http'
import t from '../../i18n'

import './clients.less'

class Clients extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      clients: [],
      appId: ''
    }
  }

  loadClients (appId) {

    const self = this
    self.setState({loading: true})

    http.get('/api/clients', {appId: appId}).then(function (clientsData) {
      self.setState({
        loading: false,
        clients: clientsData,
        appId: appId
      })
    })

  }

  onRefresh () {
    this.loadClients(this.state.appId)
  }

  render () {

    const self = this

    return (
      <div>

        <BreadTitle firstCode="clusters.management" secondCode="clusters.clients"/>

        <AppSelect onChange={(value) => this.loadClients(value)}/>
        <Button type="primary" onClick={() => this.onRefresh()} className="ml-3">
          {t('refresh')}
        </Button>

        <Table
          className="mt-3"
          columns={[
            {title: t('client.address'), dataIndex: 'addr', key: 'addr'},
            {
              title: t('operation'), key: 'operation', render (text, record) {
                return (
                  <span></span>
                )
              }
            }
          ]}
          dataSource={this.state.clients}
          loading={this.state.loading}
          pagination={false}
          rowKey="addr"
        />
      </div>
    )
  }
}

export default Clients