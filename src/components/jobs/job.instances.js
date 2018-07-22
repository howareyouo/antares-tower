import { Button, Icon, Input, Modal, Table } from 'antd'
import BreadTitle from '../common/bread-title'
import JobInstanceDetail from './job.instance.detail'
import AppSelect from '../apps/app.select'
import React from 'react'
import http from '../common/http'
import qs from 'querystring'
import t from '../../i18n'

const Search = Input.Search

class JobInstances extends React.Component {

  constructor (props) {
    super(props)
    var jobClass = qs.parse(props.location.search.substr(1)).jobClass
    this.state = {
      detailInstance: null,
      pagination: false,
      instances: [],
      pageSize: 10,
      jobClass,
      loading: false,
      appId: null
    }
  }

  loadJobInstances (appId, pageNo, jobClass) {
    const pageSize = this.state.pageSize
    const self = this

    self.setState({loading: true})
    http.get('/api/jobs/instances', {appId, jobClass, pageNo, pageSize}).then(function (jsonData) {
      var d = jsonData
      self.setState({
        instances: d.data,
        loading: false,
        jobClass,
        appId,
        pagination: {
          pageSize,
          current: pageNo,
          total: d.total,
          showTotal: total => t('total', total)
        }
      })
    }, function () {
      self.setState({loading: false})
    })
  }

  onAppChange = (appId) => {
    this.setState({appId: appId}, () => {
      if (this.state.jobClass) {
        this.onSearch(this.state.jobClass)
      }
    })
  }

  onRefresh = () => {
    const {appId, pagination, jobClass} = this.state
    this.loadJobInstances(appId, pagination.current, jobClass)
  }

  onSearch = (jobClass) => {
    jobClass = jobClass.trim()
    if (!jobClass) return
    this.loadJobInstances(this.state.appId, 1, jobClass)
  }

  onClean = () => {

    const {jobId, jobClass} = this.state

    Modal.confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      maskClosable: true,
      onOk () {
        return new Promise((resolve, reject) => {
          http.delete('/api/jobs/' + 5 + '/instances').then(res => {
            console.log(res)
            resolve()
          }, reject)
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        })
      }
    })
  }

  onPageChange = (p) => {
    this.loadJobInstances(this.state.appId, p.current, this.state.jobClass)
  }

  expandedRowRender = (instance) => {
    return instance.status === 4 && <p>{instance.cause}</p>
  }

  render () {

    const {appId, jobClass, detailInstance} = this.state
    const disableLoad = (!appId || !jobClass)

    return (
      <div>

        <BreadTitle firstCode="job.management" secondCode="job.history"/>

        <AppSelect onChange={this.onAppChange}/>

        <Search
          className="ml-3"
          style={{width: 250}}
          placeholder={t('input.classname')}
          defaultValue={jobClass}
          enterButton={true}
          onSearch={this.onSearch}
          onChange={(e) => this.setState({jobClass: e.target.value.trim()})}
          disabled={!appId}
        />

        <Button className="ml-3" type="primary" onClick={this.onRefresh} disabled={disableLoad}>
          <Icon type="reload" />{t('refresh')}
        </Button>

        <Button className="float-right" type="danger" onClick={this.onClean} disabled={disableLoad}>
          <Icon type="delete"/>{t('job.history.clean')}
        </Button>

        <Table
          className="mt-3"
          columns={[
            {title: t('id'), dataIndex: 'id', key: 'id'},
            {title: t('table.start.time'), dataIndex: 'startTime', key: 'startTime'},
            {title: t('table.end.time'), dataIndex: 'endTime', key: 'endTime'},
            {title: t('table.cost.time'), dataIndex: 'costTime', key: 'costTime'},
            {title: t('table.trigger.type'), dataIndex: 'triggerTypeDesc', key: 'triggerTypeDesc'},
            {
              title: t('status'), dataIndex: 'statusDesc', key: 'statusDesc', render: (text, job) => (
                <span className={'status-' + job.status}>{text}</span>
              )
            },
            {
              title: t('operation'), key: 'operation', render: (text, job) => (
                <a onClick={() => this.setState({detailInstance: job})}>{t('job.instance.detail')}</a>
              )
            }
          ]}
          pagination={this.state.pagination}
          dataSource={this.state.instances}
          loading={this.state.loading}
          expandedRowRender={this.expandedRowRender}
          onChange={this.onPageChange}
          rowKey="id"/>

        {detailInstance &&
        <JobInstanceDetail
          uri={`/api/jobs/instances/${detailInstance.id}`}
          onCanceled={() => this.setState({detailInstance: null})}
        />}

      </div>
    )
  }
}

export default JobInstances