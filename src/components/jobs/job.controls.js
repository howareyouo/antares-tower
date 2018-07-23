import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Badge, Button, Icon, Input, Table } from 'antd'
import BreadTitle from '../common/bread-title'
import AppSelect from '../apps/app.select'
import JobInstanceDetail from './job.instance.detail'
import { states } from '../common/constans'
import { shorten } from '../common/util'
import http from '../common/http'
import o from './job.operate'
import t from '../../i18n'

const Search = Input.Search

class JobControls extends Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      jobs: [],
      pagination: false,
      pageSize: 10,
      appId: null,
      operatingJob: null,
      monitoringJob: null,
      operate: ''
    }
  }

  loadJobs (appId, jobId = this.state.jobId, pageNo = 1) {

    const self = this
    const pageSize = this.state.pageSize

    self.setState({loading: true})
    http.get('/api/jobs/controls', {appId, jobId, pageNo, pageSize}).then(function (json) {
      self.setState({
        loading: false,
        jobs: json.data,
        appId,
        jobId,
        pagination: {
          pageSize,
          current: pageNo,
          total: json.total,
          showTotal: (total) => t('total', total)
        }
      })
    })
  }

  onAppChange (appId) {
    this.loadJobs(appId, this.state.jobId)
  }

  onPageChange = (p) => {
    const {appId, jobId} = this.state
    this.loadJobs(appId, jobId, p.current)
  }

  refresh = () => {
    const {appId, jobId, pagination} = this.state
    this.loadJobs(appId, jobId, pagination.current)
  }

  onSearch = (jobId) => {
    this.loadJobs(this.state.appId, jobId)
  }

  onMonitor (job) {
    this.setState({monitoringJob: job})
  }

  onMonitorCanceled = () => {
    this.setState({monitoringJob: null})
    this.refresh()
  }

  renderJobExtra = (job) => (
    <div>
      <code className="mr-4">{job.clazz}</code>
      <code className="mr-4">{job.cron}</code>
      {job.desc}
    </div>
  )

  render = () => {

    const {jobId, monitoringJob} = this.state
    const refresh = this.refresh

    return (
      <div>

        <BreadTitle firstCode="job.management" secondCode="job.control"/>

        <AppSelect onChange={(val) => this.onAppChange(val)}/>

        <Search
          className="ml-3"
          style={{width: 250}}
          placeholder={t('input.job')}
          defaultValue={jobId}
          enterButton={true}
          onSearch={this.onSearch}
          onChange={(e) => this.setState({jobId: e.target.value.trim()})}
        />

        <Button className="ml-3" type="primary" onClick={this.refresh}><Icon type="reload"/>{t('refresh')}</Button>

        <Table
          className="mt-3"
          columns={[
            {title: t('id'), dataIndex: 'id', key: 'id', width: '5%'},
            {
              title: t('job.class'), dataIndex: 'clazz', key: 'clazz', render (text, job) {
                return <NavLink title={text} to={'/job-instances/' + job.id}><code>{shorten(text)}</code></NavLink>
              }
            },
            {title: t('job.fire.time.prev'), dataIndex: 'prevFireTime', key: 'prevFireTime'},
            {title: t('job.fire.time'), dataIndex: 'fireTime', key: 'fireTime', width: '13%'},
            {title: t('job.fire.time.next'), dataIndex: 'nextFireTime', key: 'nextFireTime'},
            {title: t('job.scheduler'), dataIndex: 'scheduler', key: 'scheduler'},
            {title: t('status'), render: (text, job) => <Badge status={states[job.state]} text={job.stateDesc}/>},
            {
              title: t('operation'), render: (text, job) => {
                const state = job.state

                return (
                  <span>
                    {state === 2 && <a className="mr-2" onClick={() => this.onMonitor(job)}>{t('monitor')}</a>}
                    {state === 0 && <a className="mr-2" onClick={() => o('enable', job, refresh)}>{t('enable')}</a>}
                    {state === 1 && <a className="mr-2" onClick={() => o('trigger', job, refresh)}>{t('trigger')}</a>}
                    {(state === 1 || state === 2 || state === 4) &&
                    <a className="mr-2" onClick={() => o('pause', job, refresh)}>{t('pause')}</a>
                    }
                    {(state === 1 || state === 2 || state === 4 || state === 5) &&
                    <a className="mr-2" onClick={() => o('stop', job, refresh)}>{t('stop')}</a>
                    }
                    {state === 5 && <a className="mr-2" onClick={() => o('resume', job, refresh)}>{t('resume')}</a>}
                    {state === 3 && <a className="mr-2" onClick={() => o('schedule', job, refresh)}>{t('schedule')}</a>}
                    {state === 2 && <a className="mr-2" onClick={() => o('terminate', job, refresh)}>{t('terminate')}</a>}
                  </span>
                )
              }
            }
          ]}
          expandedRowRender={this.renderJobExtra}
          pagination={this.state.pagination}
          dataSource={this.state.jobs}
          loading={this.state.loading}
          onChange={this.onPageChange}
          rowKey="id"
        />

        {monitoringJob && <JobInstanceDetail
          uri={`/api/jobs/${monitoringJob.id}/monitor`}
          onCanceled={this.onMonitorCanceled}
          onFailed={this.onMonitorCanceled}/>}

      </div>
    )
  }
}

export default JobControls