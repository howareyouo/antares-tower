import React from 'react'
import { Button, Icon, Table, Tooltip } from 'antd'
import http from '../common/http'
import BreadTitle from '../common/bread-title'
import ServerJobs from './server.jobs'
import t from '../../i18n'

import './servers.less'

class Servers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      servers: [],
      jobsServer: null
    }
  }

  componentDidMount () {
    this.loadServers()
  }

  loadServers () {

    const self = this
    self.setState({loading: true})

    http.get('/api/servers').then(function (jsonData) {
      self.setState({
        loading: false,
        servers: jsonData
      })
    })

  }

  onShutdown (server) {
    this.setState({shutdowningServer: server})
  }

  onShutdownSubmitted () {
    this.setState({shutdowningServer: null})
    this.loadServers()
  }

  onShutdownCanceled () {
    this.setState({shutdowningServer: null})
  }

  onListServerJobs (serverInfo) {
    this.setState({
      jobsServer: serverInfo.server
    })
  }

  onListServerJobsCanceled () {
    this.setState({
      jobsServer: null
    })
  }

  onRefresh () {
    this.loadServers()
  }

  render () {

    const self = this
    const jobsServer = this.state.jobsServer

    return (
      <div>

        <BreadTitle firstCode="clusters.mgr" secondCode="clusters.servers"/>

        <Button className="mb-3" type="primary" onClick={() => this.onRefresh()}>
          {t('refresh')}
        </Button>

        <Table
          columns={[
            {
              title: '', key: 'leader', width: '3%',
              render (text, record) {
                return (
                  <Tooltip title={record.leader === true ? 'Leader' : 'Follower'}>
                    <Icon type={record.leader === true ? 'star' : 'star-o'}/>
                  </Tooltip>
                )
              }
            },
            {title: t('host'), dataIndex: 'server', key: 'server', width: '20%'},
            {
              title: t('jobs.count'), key: 'jobCount', width: '20%',
              render (text, record) {
                var jobCount = record.jobCount === null ? 'N/A' : record.jobCount
                return (
                  <span>
                    {jobCount}
                  </span>
                )
              }
            },
            {
              title: t('operation'), key: 'operation',
              render (text, record) {
                return (
                  <span>
                    <a href="#" onClick={() => self.onListServerJobs(record)}>{t('servers.jobs.list')}</a>
                  </span>
                )
              }
            }
          ]}
          dataSource={this.state.servers}
          loading={this.state.loading}
          pagination={false}
          rowKey="server"
        />

        {jobsServer === null ? null :
          <ServerJobs
            server={jobsServer}
            onCanceled={() => this.onListServerJobsCanceled()}/>
        }
      </div>
    )
  }
}

export default Servers