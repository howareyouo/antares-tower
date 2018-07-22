import { Button, Modal, Table } from 'antd'
import React from 'react'
import http from '../common/http'
import t from '../../i18n'

export default class ServerJobs extends React.Component {

  state = {
    visible: true,
    loading: false,
    jobs: []
  }

  loadJobs () {
    this.setState({loading: true})
    http.get('/api/servers/jobs', {server: this.props.server}).then(jobs => {
      this.setState({
        loading: false,
        jobs: jobs
      })
    })
  }

  componentDidMount () {
    this.loadJobs()
  }

  onCancel = () => {
    this.callback = this.props.onCanceled
    this.setState({visible: false})
  }

  afterClose = () => {
    this.callback && this.callback()
  }

  render () {
    const {visible, jobs, loading} = this.state

    return (
      <Modal
        title={t('clusters.servers.jobs', this.props.server)}
        wrapClassName="vertical-center-modal"
        afterClose={this.afterClose}
        onCancel={this.onCancel}
        visible={visible}
        width={680}
        footer={<Button type="ghost" size="large" onClick={() => this.onCancel()}>{t('close')}</Button>}>
        <Table
          columns={[
            {title: t('id'), dataIndex: 'id', key: 'id'},
            {title: t('job.class'), dataIndex: 'clazz', key: 'clazz', render: text => <code>{text}</code>},
            {
              title: t('status'), key: 'status', render (text, record) {
                const statusDesc = record.status === 1 ? t('enable') : t('disable')
                const statusClass = record.status === 1 ? 'text-success' : 'text-danger'
                return (
                  <span className={statusClass}>{statusDesc}</span>
                )
              }
            }
          ]}
          pagination={false}
          dataSource={jobs}
          loading={loading}
          size="middle"
          rowKey="id"
        />
      </Modal>
    )
  }
}