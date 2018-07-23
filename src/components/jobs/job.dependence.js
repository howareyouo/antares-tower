import { Button, Input, Modal, Table, Icon } from 'antd'
import React, { Component } from 'react'
import JobOperate from './job.operate'
import http from '../common/http'
import {shorten} from '../common/util'
import t from '../../i18n'

class JobDependence extends Component {

  state = {
    deletingJobId: null,
    addingJobIds: null,
    operatingJob: null,
    pagination: {},
    loading: false,
    visible: true,
    pageSize: 10,
    jobs: []
  }

  loadNextJobs (pageNo) {

    const pageSize = this.state.pageSize
    const job = this.props.job
    const self = this

    self.setState({loading: true})
    http.get('/api/jobs/' + job.id + '/next', {pageNo, pageSize}).then(function (jsonData) {
      var d = jsonData
      self.setState({
        loading: false,
        jobs: d.data,
        pagination: {
          current: pageNo,
          total: d.total,
          pageSize: pageSize,
          showTotal: (total) => t('total', total)
        }
      })
    })
  }

  componentDidMount () {
    this.loadNextJobs(1)
  }

  onRefreshNextJobs = () => {
    this.loadNextJobs(this.state.pagination.current)
  }

  onCancel = () => {
    this.callback = this.props.onSubmitted
    this.setState({visible: false})
  }

  afterClose = () => {
    // callback parent
    this.callback && this.callback()
  }

  onPageChange (p) {
    this.loadNextJobs(p.current)
  }

  nextJobIdsChange = (e) => {
    this.setState({
      addingJobIds: e.target.value
    })
  }

  onAdd = () => {
    const jobId = this.props.job.id
    const addingJobIds = this.state.addingJobIds

    http.post('/api/jobs/' + jobId + '/next', {nextJobId: addingJobIds}).then(res => {
      if (res) {
        this.setState({addingJobIds: null})
        this.onRefreshNextJobs()
      }
    })
  }

  onDelete (nextJob) {
    const curJob = this.props.job

    this.setState({
      operatingJob: curJob,
      deletingJobId: nextJob.id
    })
  }

  onDeleteSubmitted = () => {
    this.setState({operatingJob: null, deletingJobId: null})
    this.onRefreshNextJobs()
  }

  onDeleteCanceled = () => {
    this.setState({operatingJob: null, deletingJobId: null})
  }

  onDeleteFailed = () => {
    this.setState({operatingJob: null, deletingJobId: null})
    this.onRefreshNextJobs()
  }

  render () {

    const self = this
    const job = this.props.job
    const title = t('job.dependence', job.clazz)

    // next job ids tip
    const {addingJobIds, operatingJob, deletingJobId, visible} = this.state

    return (
      <Modal
        title={title}
        wrapClassName="vertical-center-modal"
        afterClose={this.afterClose}
        cancelText={t('close')}
        onCancel={this.onCancel}
        visible={visible}
        width={680}
        footer={<Button size="large" onClick={this.onCancel}>{t('close')}</Button>}>

        <Input.Search
          className="mb-3"
          placeholder={t('input') + t('job.next.ids')}
          enterButton={t('add')}
          onChange={(e) => this.nextJobIdsChange(e)}
          onSearch={this.onAdd}
          value={addingJobIds}
          style={{width: 250}}
        />

        <Table
          columns={[
            {title: t('id'), dataIndex: 'id', key: 'id'},
            {title: t('app.name'), dataIndex: 'appName', key: 'appName'},
            {
              title: t('job.class'), dataIndex: 'jobClass', key: 'jobClass',
              render: text => <code>{shorten(text)}</code>
            },
            {
              title: t('operation'), key: 'operation', render (text, record) {
                return (
                  <a onClick={() => self.onDelete(record)}><Icon type="delete" /> {t('delete')}</a>
                )
              }
            }
          ]}
          pagination={this.state.pagination}
          dataSource={this.state.jobs}
          loading={this.state.loading}
          onChange={this.onPageChange}
          size="middle"
          rowKey="id"
        />

        {operatingJob === null ? null :
          <JobOperate
            job={operatingJob}
            operate="del_next"
            suffix={deletingJobId}
            onSubmitted={this.onDeleteSubmitted}
            onCanceled={this.onDeleteCanceled}
            onFailed={this.onDeleteFailed}/>
        }
      </Modal>
    )
  }
}

export default JobDependence