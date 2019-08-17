import { Alert, Button, Divider, Icon, Input, Modal, Table } from 'antd'
import JobInstanceDetail from './job.instance.detail'
import BreadTitle from '../common/bread-title'
import React, { Component } from 'react'
import http from '../common/http'
import t from '../../i18n'

const Search = Input.Search

class JobInstances extends Component {

  constructor (props) {
    super(props)
    var jobId = props.match.params.id || ''
    this.state = {
      pagination: false,
      instances: [],
      instance: null,
      pageSize: 10,
      loading: false,
      jobClass: '',
      preJobId: jobId,
      jobId
    }
  }

  componentDidMount () {
    this.loadJobInstances()
  }

  loadJobInstances (jobId = this.state.jobId, pageNo = 1) {

    if (!jobId) {
      return
    }

    const {pageSize} = this.state

    var requests = [
      http.get(`/api/jobs/${jobId}/instances`, {pageNo, pageSize}),
      http.get(`/api/jobs/${jobId}`)
    ]

    this.setState({loading: true})
    Promise.all(requests).then(([inss, detail]) => {
      this.setState({
        pagination: {
          total: inss.total,
          current: pageNo,
          pageSize,
          showTotal: total => t('total', total)
        },
        instances: inss.data,
        jobClass: detail ? detail.job.clazz : '',
        loading: false,
        jobId
      })
    }, () => this.setState({loading: false}))
  }

  onRefresh = () => {
    const {jobId, pagination} = this.state
    this.loadJobInstances(jobId, pagination.current)
  }

  onSearch = (jobId) => {
    jobId = jobId.trim()
    this.loadJobInstances(jobId, 1)
  }

  onClean = (insId) => {
    Modal.confirm({
      title: t('instances.clean'),
      content: t('instances.clean.confirm'),
      cancelText: t('cancel'),
      okText: t('confirm'),
      maskClosable: true,
      onOk: () => {
        const {jobId} = this.state
        return new Promise((resolve, reject) => {
          var url = insId ?
            '/api/jobs/instances/' + insId :
            '/api/jobs/' + jobId + '/instances'
          http.delete(url).then(() => {
            this.onRefresh()
            resolve()
          }, reject)
        })
      }
    })
  }

  onPageChange = (p) => {
    this.loadJobInstances(this.state.jobId, p.current)
  }

  expandedRowRender = (instance) => {
    return instance.status === 4 && <p>{instance.cause}</p>
  }

  render () {

    const {jobId, jobClass, instance} = this.state

    return (
      <div>

        <BreadTitle firstCode="job.management" secondCode="job.history"/>

        <Search
          style={{width: 250}}
          placeholder={t('input.job')}
          defaultValue={jobId}
          enterButton={true}
          onSearch={this.onSearch}
          onChange={(e) => this.setState({jobId: e.target.value.trim()})}
        />

        <Button className="ml-3" type="primary" onClick={this.onRefresh} disabled={!jobId}>
          <Icon type="reload"/>{t('refresh')}
        </Button>

        {jobClass && <Alert className="mt-3" message={
          <div>
            {t('job.loaded', jobClass)}
            <a className="float-right text-purple" onClick={() => this.onClean()}>
              <Icon type="warning"/> {t('instances.clean')}
            </a>
          </div>
        } type="info" showIcon/>}

        <Table
          className="mt-3"
          columns={[
            {title: t('id'), dataIndex: 'id', key: 'id'},
            {title: t('table.start.time'), dataIndex: 'startTime', key: 'startTime'},
            {title: t('table.end.time'), dataIndex: 'endTime', key: 'endTime'},
            {title: t('table.cost.time'), dataIndex: 'costTime', key: 'costTime'},
            {title: t('table.trigger.type'), dataIndex: 'triggerTypeDesc', key: 'triggerTypeDesc'},
            {
              title: t('status'), dataIndex: 'statusDesc', key: 'statusDesc', render: (text, ins) => (
                <span className={'status-' + ins.status}>{text}</span>
              )
            },
            {
              title: t('operation'), key: 'operation', render: (text, ins) => (
                <div>
                  <a onClick={() => this.setState({instance: ins})}><Icon type="profile"/> {t('job.instance.detail')}</a>
                  <Divider type="vertical"/>
                  <a onClick={() => this.onClean(ins.id)}><Icon type="delete"/> {t('delete')}</a>
                </div>
              )
            }
          ]}
          expandedRowRender={this.expandedRowRender}
          pagination={this.state.pagination}
          dataSource={this.state.instances}
          onChange={this.onPageChange}
          loading={this.state.loading}
          rowKey="id"/>

        {instance && <JobInstanceDetail uri={'/api/jobs/instances/' + instance.id} onCanceled={() => this.setState({instance: null})}/>}
      </div>
    )
  }
}

export default JobInstances