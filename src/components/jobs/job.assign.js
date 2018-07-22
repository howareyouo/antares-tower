import { message, Modal, Table } from 'antd'
import http from '../common/http'
import React from 'react'
import t from '../../i18n'

class JobAssign extends React.Component {

  state = {
    submitting: false,
    assignIps: [],
    assigns: [],
    loading: false,
    visible: true
  }

  componentDidMount () {

    const job = this.props.job
    const self = this

    self.setState({loading: true})
    http.get('/api/jobs/' + job.id + '/assigns').then(function (assignDatas) {

      var tmpAssignIps = []
      if (assignDatas) {
        assignDatas.forEach(function (assignData) {
          if (assignData.assign) {
            tmpAssignIps.push(assignData.ip)
          }
        })
      }

      self.setState({
        assignIps: tmpAssignIps,
        assigns: assignDatas,
        loading: false
      })
    })
  }

  onCancel = () => {
    this.callback = this.props.onCanceled
    this.setState({visible: false})
  }

  onOk = () => {
    const self = this
    const {assignIps} = this.state
    const {job, onCanceled} = this.props
    var assignIpsStr = assignIps.length > 0 ? assignIps.join(',') : '-1'

    // start submiting
    self.setState({submitting: true})
    http.post('/api/jobs/' + job.id + '/assigns', {assignIps: assignIpsStr}).then(function (jsonData) {

      console.log(jsonData)
      self.callback = onCanceled
      self.setState({
        submitting: false,
        visible: false
      })
      message.success(t('operate.success'))
    }, function (err) {
      message.error(err)
      self.setState({
        submitting: false
      })
    })
  }

  afterClose = () => {
    this.callback && this.callback()
  }

  renderAssignProc = (record) => {

    if (!record.processes) {
      return null
    }

    return (
      <ul style={{marginLeft: 22}}>{
        record.processes.map(r =>
          <li>{r}</li>
        )
      }</ul>
    )
  }

  render () {

    const self = this
    const job = this.props.job
    const {assigns, visible, submitting} = this.state

    return (
      <Modal
        title={t('job.assign', job.clazz)}
        wrapClassName="vertical-center-modal"
        confirmLoading={submitting}
        afterClose={this.afterClose}
        cancelText={t('cancel')}
        onCancel={this.onCancel}
        visible={visible}
        okText={t('submit')}
        onOk={this.onOk}>

        <Table
          columns={[
            {title: t('ip'), dataIndex: 'ip', key: 'ip', width: '40%'},
            {title: t('job.assign.inst'), render: (text, record) => <span>{record.processes.length}</span>}
          ]}
          rowSelection={{
            onChange: function (selectedRowKeys, selectedRows) {
              self.setState({
                assignIps: selectedRowKeys
              })
            },
            getCheckboxProps: function (record) {
              return {
                defaultChecked: record.assign
              }
            }
          }}
          expandedRowRender={(record) => self.renderAssignProc(record)}
          dataSource={assigns}
          pagination={false}
          loading={this.state.loading}
          size="middle"
          rowKey="ip"
        />
      </Modal>
    )
  }
}

export default JobAssign