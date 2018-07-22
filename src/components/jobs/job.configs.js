import { Button, Divider, Dropdown, Icon, Input, Menu, Switch, Table } from 'antd'
import { NavLink } from 'react-router-dom'
import BreadTitle from '../common/bread-title'
import AppSelect from '../apps/app.select'
import JobEdit from './job.edit'
import JobOperate from './job.operate'
import JobDependence from './job.dependence'
import JobAssign from './job.assign'
import http from '../common/http'
import React from 'react'
import t from '../../i18n'

const Search = Input.Search

class JobConfigs extends React.Component {

  state = {
    dependencingJob: null,
    operatingJob: null,
    assigningJob: null,
    editingJob: null,
    searchJobClass: '',
    pagination: false,
    pageSize: 10,
    loading: false,
    appId: null,
    operate: '',
    jobs: []
  }

  loadJobs = (appId, pageNo, jobClass) => {

    jobClass = jobClass || ''

    const self = this
    self.setState({loading: true})

    const pageSize = this.state.pageSize

    http.get('/api/jobs', {appId, jobClass, pageNo, pageSize}).then(function (jsonData) {
      var d = jsonData
      self.setState({
        loading: false,
        jobs: d.data.map(j => {
          j.operating = false
          return j
        }),
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

  onRefresh = () => {
    const {appId, pagination, searchJobClass} = this.state
    this.loadJobs(appId, pagination.current, searchJobClass)
  }

  onPageChange = (p) => {
    this.loadJobs(this.state.appId, p.current)
  }

  onAdd = () => {
    this.setState({editingJob: {appId: this.state.appId}})
  }

  onEditSubmitted = () => {
    this.setState({editingJob: null})
    this.onRefresh()
  }

  onEditFailed = () => {
    this.setState({editingJob: null})
    this.onRefresh()
  }

  onDelete = (job) => {
    this.setState({operatingJob: job, operate: 'delete'})
  }

  onOperateSubmitted = () => {
    this.setState({operatingJob: null, operate: ''})
    this.onRefresh()
  }

  onOperateCanceled = () => {
    this.setState({operatingJob: null, operate: ''})
  }

  onOperateFailed = () => {
    this.setState({operatingJob: null, operate: ''})
    this.onRefresh()
  }

  onAppChange = (appId) => {
    this.loadJobs(appId, 1, this.state.searchJobClass)
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

    const self = this

    const appId = this.state.appId
    const editingJob = this.state.editingJob
    const operatingJob = this.state.operatingJob
    const dependencingJob = this.state.dependencingJob
    const assigningJob = this.state.assigningJob
    const operate = this.state.operate

    return (
      <div>
        <BreadTitle firstCode="jobs.mgr" secondCode="jobs.configs"/>

        <div>

          <AppSelect onChange={(val) => this.onAppChange(val)}/>

          <Search
            className="ml-3"
            style={{width: 250}}
            placeholder={t('input.classname')}
            enterButton={true}
            onSearch={(val) => this.loadJobs(this.state.appId, 1, val)}
            disabled={appId === null}/>

          <Button className="ml-3" type="primary" onClick={() => this.onAdd()} disabled={appId === null}>{t('add')}</Button>
          <Button className="ml-3" type="primary" onClick={() => this.onRefresh()}>{t('refresh')}</Button>
        </div>

        <Table
          className="mt-3"
          columns={[
            {title: t('id'), dataIndex: 'id', key: 'id', className: 'keep-word'},
            {
              title: t('jobs.class'), dataIndex: 'clazz', key: 'clazz', render (text, job) {
                return <NavLink to={'/job-instances?jobClass=' + job.clazz}><code>{text}</code></NavLink>
              }
            },
            {title: t('jobs.cron'), dataIndex: 'cron', key: 'cron', render: (text) => <code>{text}</code>},
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
                      <Icon type="pushpin-o"/> {t('jobs.assigns')}</Menu.Item>
                    <Menu.Item key="2" onClick={() => self.setState({dependencingJob: job})}>
                      <Icon type="share-alt"/> {t('jobs.dependence.config')}</Menu.Item>
                    <Menu.Item key="3">
                      <NavLink to={'/job-instances?jobClass=' + job.clazz}><Icon type="clock-circle-o"/> {t('jobs.instances')}</NavLink>
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="4" onClick={() => self.onDelete(job)}>
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
          onFailed={this.onEditFailed}/>}

        {operatingJob && <JobOperate
          job={operatingJob}
          operate={operate}
          onSubmitted={() => this.onOperateSubmitted()}
          onCanceled={() => this.onOperateCanceled()}
          onFailed={() => this.onOperateFailed()}/>}

        {dependencingJob && <JobDependence job={dependencingJob} onSubmitted={() => this.setState({dependencingJob: null})}/>}

        {assigningJob && <JobAssign job={assigningJob} onCanceled={() => this.setState({assigningJob: null})}/>}
      </div>
    )
  }
}

export default JobConfigs