import { Button, Divider, Dropdown, Icon, Input, Menu, Switch, Table } from 'antd'
import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'
import BreadTitle from '../common/bread-title'
import JobDependence from './job.dependence'
import JobAssign from './job.assign'
import JobEdit from './job.edit'
import AppSelect from '../apps/app.select'
import http from '../common/http'
import o from './job.operate'
import t from '../../i18n'

const Search = Input.Search

class JobConfigs extends Component {

  state = {
    dependencingJob: null,
    assigningJob: null,
    editingJob: null,
    pagination: false,
    pageSize: 10,
    loading: false,
    operate: '',
    appId: null,
    jobId: null,
    jobs: []
  }

  loadJobs = (appId, jobId, pageNo = 1) => {

    const self = this
    self.setState({loading: true})

    const pageSize = this.state.pageSize

    http.get('/api/jobs', {appId, jobId, pageNo, pageSize}).then(function (jsonData) {
      var d = jsonData
      self.setState({
        loading: false,
        jobs: d.data.map(j => {
          j.operating = false
          return j
        }),
        appId,
        jobId,
        pagination: {
          current: pageNo,
          total: d.total,
          pageSize: pageSize,
          showTotal: (total) => t('total', total)
        }
      })
    })
  }

  onRefresh = () => {
    const {appId, jobId, pagination} = this.state
    this.loadJobs(appId, jobId, pagination.current)
  }

  onSearch = (jobId) => {
    const {appId, pagination} = this.state
    this.loadJobs(appId, jobId, pagination.current)
  }

  onPageChange = (p) => {
    const {appId, jobId} = this.state
    this.loadJobs(appId, jobId, p.current)
  }

  onAppChange = (appId) => {
    this.loadJobs(appId, this.state.jobId)
  }

  onAdd = () => {
    this.setState({editingJob: {appId: this.state.appId}})
  }

  onEditSubmitted = () => {
    this.setState({editingJob: null})
    this.onRefresh()
  }

  onStateChange = (checked, job) => {
    var self = this
    var jobs = self.state.jobs
    job.operating = true
    self.setState({jobs})
    http.post('/api/jobs/' + job.id + (checked ? '/enable' : '/disable')).then(function (res) {
      job.operating = false
      job.status = checked ? 1 : 0
      self.setState({jobs})
    })
  }

  render = () => {

    const {appId, editingJob, dependencingJob, assigningJob} = this.state
    const btnDisabled = appId === null
    const self = this

    return (
      <div>
        <BreadTitle firstCode="job.management" secondCode="job.config"/>

        <AppSelect onChange={this.onAppChange}/>

        <Search
          className="ml-3"
          style={{width: 250}}
          placeholder={t('input.job')}
          enterButton={true}
          onSearch={this.onSearch}
          disabled={btnDisabled}/>

        <Button className="ml-3" type="primary" onClick={this.onAdd} disabled={btnDisabled}>
          <Icon type="plus"/>{t('add')}
        </Button>
        <Button className="ml-3" type="primary" onClick={this.onRefresh}>
          <Icon type="reload"/>{t('refresh')}
        </Button>

        <Table
          className="mt-3"
          columns={[
            {title: t('id'), dataIndex: 'id', key: 'id', className: 'keep-word'},
            {
              title: t('job.class'), dataIndex: 'clazz', key: 'clazz', render (text, job) {
                return <NavLink to={'/job-instances/' + job.id}><code>{text}</code></NavLink>
              }
            },
            {title: t('job.cron'), dataIndex: 'cron', key: 'cron', render: (text) => <code>{text}</code>},
            {title: t('desc'), dataIndex: 'desc', key: 'desc'},
            {
              title: t('status'), key: 'status',
              render (text, job) {
                const statusDesc = job.status === 1 ? t('enable') : t('disable')
                const statusClass = job.status === 1 ? 'text-success' : 'text-danger'
                return (
                  <span>
                    <Switch
                      checkedChildren={<Icon type="check"/>}
                      unCheckedChildren={<Icon type="cross"/>}
                      checked={job.status === 1}
                      loading={job.operating}
                      title={t('switch')}
                      onClick={(c) => self.onStateChange(c, job)}/>
                    <span className={'align-middle ' + statusClass}> {statusDesc}</span>
                  </span>
                )
              }
            },
            {
              title: t('operation'), key: 'operation',
              render (text, job) {

                var menu = (
                  <Menu>
                    <Menu.Item key="1" onClick={() => self.setState({assigningJob: job})}>
                      <Icon type="pushpin-o"/> {t('job.assigns')}</Menu.Item>
                    <Menu.Item key="2" onClick={() => self.setState({dependencingJob: job})}>
                      <Icon type="share-alt"/> {t('job.dependence.config')}</Menu.Item>
                    <Menu.Item key="3">
                      <NavLink to={'/job-instances/' + job.id}><Icon type="clock-circle-o"/> {t('job.history')}</NavLink>
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="4" onClick={() => o('delete', job, self.onRefresh)}>
                      <Icon type="delete"/> {t('delete')}</Menu.Item>
                  </Menu>
                )

                return (
                  <div>
                    <a onClick={() => self.setState({editingJob: job})}><Icon type="form"/> {t('update')}</a>
                    <Divider type="vertical"/>
                    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                      <a>{t('more')} <Icon type="down"/></a>
                    </Dropdown>
                  </div>
                )
              }
            }
          ]}
          pagination={this.state.pagination}
          dataSource={this.state.jobs}
          loading={this.state.loading}
          onChange={(p) => this.onPageChange(p)}
          rowKey="id"/>

        {editingJob && <JobEdit
          job={editingJob}
          onSubmitted={this.onEditSubmitted}
          onCanceled={() => this.setState({editingJob: null})}
          onFailed={this.onEditSubmitted}/>}

        {dependencingJob && <JobDependence job={dependencingJob} onSubmitted={() => this.setState({dependencingJob: null})}/>}

        {assigningJob && <JobAssign job={assigningJob} onCanceled={() => this.setState({assigningJob: null})}/>}
      </div>
    )
  }
}

export default JobConfigs
