import { Button, Input, Table, message } from 'antd'
import BreadTitle from '../common/bread-title'
import JobInstanceDetail from './job.instance.detail'
import AppSelect from '../apps/app.select'
import React from 'react'
import { Ajax } from '../common/ajax'
import qs from 'query-string'
import t from '../../i18n'

const Search = Input.Search

class JobInstances extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      instances: [],
      pagination: false,
      pageSize: 10,
      appId: null,
      jobClass: '',
      detailInstance: null
    }
  }

  componentDidMount () {
    var jobClass = qs.parse(this.props.location.search).jobClass
    this.setState({jobClass})

  }

  loadJobInstances (appId, pageNo, jobClass) {
    const pageSize = this.state.pageSize
    const self = this

    jobClass = jobClass || ''

    self.setState({loading: true})
    Ajax.get('/api/jobs/instances', {appId, jobClass, pageNo, pageSize}, function (jsonData) {
      var d = jsonData
      self.setState({
        loading: false,
        instances: d.data,
        appId: appId,
        jobClass: jobClass,
        pagination: {
          pageSize: pageSize,
          current: pageNo,
          total: d.total,
          showTotal: total => t('total', total)
        }
      })
    }, function () {
      self.setState({loading: false})
    })
  }

  onPageChange (p) {
    this.loadJobInstances(this.state.appId, p.current, this.state.jobClass)
  }

  onAppChange (appId) {
    this.setState({appId: appId})
    if (this.state.jobClass) {
      this.onSearch(this.state.jobClass)
    }
  }

  onRefresh () {
    const {appId, pagination, jobClass} = this.state
    this.loadJobInstances(appId, pagination.current, jobClass)
  }

  onSearch (jobClass) {
    jobClass = jobClass.trim()
    if (!jobClass) return
    this.loadJobInstances(this.state.appId, 1, jobClass)
  }

  expandedRowRender (instance) {
    return instance.status === 4 ? (<p>{instance.cause}</p>) : null
  }

  render () {

    const appId = this.state.appId
    const jobClass = this.state.jobClass
    const detailInstance = this.state.detailInstance
    const disableLoad = (!appId || !jobClass)

    return (
      <div>

        <BreadTitle firstCode="jobs.mgr" secondCode="jobs.instances"/>

        <AppSelect onChange={(val) => this.onAppChange(val)}/>

        <Search className="ml-3"
                style={{width: 250}}
                defaultValue={this.state.jobClass}
                enterButton={true}
                placeholder={t('input.classname')}
                onSearch={(val) => this.onSearch(val)}
                onChange={(e) => this.setState({jobClass: e.target.value.trim()})}
                disabled={!this.state.appId}/>

        <Button className="ml-3"
                type="primary"
                onClick={() => this.onRefresh()}
                disabled={disableLoad}>
          {t('refresh')}
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
                <a onClick={() => this.setState({detailInstance: job})}>{t('jobs.instance.detail')}</a>
              )
            }
          ]}
          dataSource={this.state.instances}
          loading={this.state.loading}
          pagination={this.state.pagination}
          expandedRowRender={(record) => this.expandedRowRender(record)}
          onChange={(p) => this.onPageChange(p)}
          rowKey="id"/>

        {detailInstance === null ? null :
          <JobInstanceDetail
            uri={`/api/jobs/instances/${detailInstance.id}`}
            onCanceled={() => this.setState({detailInstance: null})}
            onFailed={() => this.setState({detailInstance: null})}/>}

      </div>
    )
  }
}

export default JobInstances