import React from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, Button, Input, Table } from 'antd'
import BreadTitle from '../common/bread-title'
import AppSelect from '../apps/app.select'
import JobOperate from './job.operate'
import JobInstanceDetail from './job.instance.detail'
import { states } from '../common/constans'
import http from '../common/http'
import {shorten} from '../common/util'
import t from '../../i18n'

const Search = Input.Search

class JobControls extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      jobs: [],
      pagination: false,
      pageSize: 10,
      appId: null,
      searchJobClass: '',
      operatingJob: null,
      monitoringJob: null,
      operate: ''
    }
  }

  loadJobs (appId, pageNo, jobClass) {

    jobClass = jobClass || ''

    const self = this
    self.setState({loading: true})

    const pageSize = this.state.pageSize

    http.get('/api/jobs/controls', {appId, jobClass, pageNo, pageSize}).then(function (jsonData) {
      var d = jsonData
      self.setState({
        loading: false,
        jobs: d.data,
        appId: appId,
        searchJobClass: jobClass,
        pagination: {
          current: pageNo,
          total: d.total,
          pageSize: pageSize,
          showTotal: (total) => t('total', total)
        }
      })
    })
  }

  onPageChange (p) {
    this.loadJobs(this.state.appId, p.current)
  }

  onRefresh () {
    const {appId, pagination, searchJobClass} = this.state
    this.loadJobs(appId, pagination.current, searchJobClass)
  }

  onEnable (job) {
    this.setState({operatingJob: job, operate: 'enable'})
  }

  onTrigger (job) {
    this.setState({operatingJob: job, operate: 'trigger'})
  }

  onPause (job) {
    this.setState({operatingJob: job, operate: 'pause'})
  }

  onResume (job) {
    this.setState({operatingJob: job, operate: 'resume'})
  }

  onSchedule (job) {
    this.setState({operatingJob: job, operate: 'schedule'})
  }

  onStopJob (job) {
    this.setState({operatingJob: job, operate: 'stop'})
  }

  onTerminateJob (job) {
    this.setState({operatingJob: job, operate: 'terminate'})
  }

  onMonitor (job) {
    this.setState({monitoringJob: job})
  }

  onOperateSubmitted () {
    this.setState({operatingJob: null, operate: ''})
    this.onRefresh()
  }

  onOperateCanceled () {
    this.setState({operatingJob: null, operate: ''})
  }

  onOperateFailed () {
    this.setState({operatingJob: null, operate: ''})
    this.onRefresh()
  }

  onMonitorCanceled () {
    this.setState({monitoringJob: null})
    this.onRefresh()
  }

  onMonitorFailed () {
    this.setState({monitoringJob: null})
    this.onRefresh()
  }

  onSearch (jobClass) {
    this.loadJobs(this.state.appId, 1, jobClass)
  }

  onAppChange (appId) {
    this.loadJobs(appId, 1, this.state.searchJobClass)
  }

  renderJobExtra = (record) => {
    return (
      <span><code className="mr-3">{record.cron}</code>{record.desc}</span>
    )
  }

  render () {

    const self = this

    const appId = this.state.appId
    const operatingJob = this.state.operatingJob
    const operate = this.state.operate
    const monitoringJob = this.state.monitoringJob

    return (
      <div>

        <BreadTitle firstCode="job.management" secondCode="job.control"/>

        <div>

          <AppSelect onChange={(val) => this.onAppChange(val)}/>

          <Search
            className="ml-3"
            style={{width: 250}}
            placeholder={t('input.classname')}
            enterButton={true}
            onSearch={() => this.onSearch()} disabled={appId === null}/>

          <Button className="ml-3" type="primary" onClick={() => this.onRefresh()}>{t('refresh')}</Button>

        </div>
        <Table
          className="mt-3"
          columns={[
            {title: t('id'), dataIndex: 'id', key: 'id', width: '5%'},
            {
              title: t('job.class'), dataIndex: 'clazz', key: 'clazz', render (text, job) {
                return <NavLink title={text} to={'/job-instances?jobClass=' + job.clazz}><code>{shorten(text)}</code></NavLink>
              }
            },
            {title: t('job.fire.time.prev'), dataIndex: 'prevFireTime', key: 'prevFireTime'},
            {title: t('job.fire.time'), dataIndex: 'fireTime', key: 'fireTime', width: '13%'},
            {title: t('job.fire.time.next'), dataIndex: 'nextFireTime', key: 'nextFireTime'},
            {title: t('job.scheduler'), dataIndex: 'scheduler', key: 'scheduler'},
            {title: t('status'), render: (text, job) => <Badge status={states[job.state]} text={job.stateDesc}/>},
            {
              title: t('operation'), render (text, record) {
                const state = record.state

                return (
                  <span>
                    {state === 2 ? <a className="mr-2" onClick={() => self.onMonitor(record)}>{t('monitor')}</a> : null}
                    {state === 0 ? <a className="mr-2" onClick={() => self.onEnable(record)}>{t('enable')}</a> : null}
                    {state === 1 ? <a className="mr-2" onClick={() => self.onTrigger(record)}>{t('trigger')}</a> : null}
                    {state === 1 || state === 2 || state === 4 ?
                      <a className="mr-2" onClick={() => self.onPause(record)}>{t('pause')}</a> : null
                    }
                    {state === 1 || state === 2 || state === 4 || state === 5 ?
                      <a className="mr-2" onClick={() => self.onStopJob(record)}>{t('stop')}</a> : null
                    }
                    {state === 5 ? <a className="mr-2" onClick={() => self.onResume(record)}>{t('resume')}</a> : null}
                    {state === 3 ? <a className="mr-2" onClick={() => self.onSchedule(record)}>{t('schedule')}</a> : null}
                    {state === 2 ? <a className="mr-2" onClick={() => self.onTerminateJob(record)}>{t('terminate')}</a> : null}
                  </span>
                )
              }
            }
          ]}
          dataSource={this.state.jobs}
          loading={this.state.loading}
          pagination={this.state.pagination}
          expandedRowRender={(record) => self.renderJobExtra(record)}
          onChange={(p) => this.onPageChange(p)}
          rowKey="id"
        />

        {operatingJob === null ? null :
          <JobOperate
            job={operatingJob}
            operate={operate}
            onSubmitted={() => this.onOperateSubmitted()}
            onCanceled={() => this.onOperateCanceled()}
            onFailed={() => this.onOperateFailed()}/>}

        {monitoringJob === null ? null :
          <JobInstanceDetail
            uri={`/api/jobs/${monitoringJob.id}/monitor`}
            onCanceled={() => this.onMonitorCanceled()}
            onFailed={() => this.onMonitorFailed()}/>}

      </div>
    )
  }
}

export default JobControls