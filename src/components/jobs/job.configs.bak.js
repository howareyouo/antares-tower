import React from 'react'
import { Button, Input, Menu, Table } from 'antd'
import t from '../../i18n'
import { Ajax } from '../common/ajax'
import BreadTitle from '../common/bread-title'
import AppSelect from '../apps/app.select'
import JobEdit from './job.edit'
import JobOperate from './job.operate'
import JobDependence from './job.dependence'
import JobAssign from './job.assign'

import './job.configs.less'

const Search = Input.Search

export default class JobConfigs extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      jobs: [],
      pagination: false,
      pageSize: 10,
      appId: null,
      searchJobClass: '',
      editingJob: null,
      operatingJob: null,
      dependencingJob: null,
      assigningJob: null,
      operate: ''
    }
  }

  loadJobs (appId, pageNo, jobClass) {

    jobClass = jobClass || ''

    const self = this
    self.setState({loading: true})

    const pageSize = this.state.pageSize

    Ajax.get('/api/jobs', {appId, jobClass, pageNo, pageSize}, function (jsonData) {
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

  onAdd () {
    this.setState({editingJob: {appId: this.state.appId}})
  }

  onRefresh () {
    const {appId, pagination, searchJobClass} = this.state
    this.loadJobs(appId, pagination.current, searchJobClass)
  }

  onUpdate (job) {
    this.setState({editingJob: job})
  }

  onEditSubmitted () {
    this.setState({editingJob: null})
    this.onRefresh()
  }

  onEditCanceled () {
    this.setState({editingJob: null})
  }

  onEditFailed () {
    this.setState({editingJob: null})
    this.onRefresh()
  }

  onDelete (job) {
    this.setState({operatingJob: job, operate: 'delete'})
  }

  onEnable (job) {
    this.setState({operatingJob: job, operate: 'enable'})
  }

  onDisable (job) {
    this.setState({operatingJob: job, operate: 'disable'})
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

  onSearch (jobClass) {
    this.loadJobs(this.state.appId, 1, jobClass)
  }

  onAppChange (appId) {
    this.loadJobs(appId, 1, this.state.searchJobClass)
  }

  onDependenceConfig (job) {
    this.setState({dependencingJob: job})
  }

  onDependenceSubmitted () {
    this.setState({dependencingJob: null})
  }

  onDependenceCanceled () {
    this.setState({dependencingJob: null})
  }

  onAssign (job) {
    this.setState({assigningJob: job})
  }

  onAssignSubmitted () {
    this.setState({assigningJob: null})
  }

  onAssignCanceled () {
    this.setState({assigningJob: null})
  }

  render () {

    const self = this

    const appId = this.state.appId
    const editingJob = this.state.editingJob
    const operatingJob = this.state.operatingJob
    const dependencingJob = this.state.dependencingJob
    const assigningJob = this.state.assigningJob
    const operate = this.state.operate

    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    )

    return (
      <div>
        <BreadTitle firstCode="jobs.mgr" secondCode="jobs.configs"/>

        <div className="oplist">

          <AppSelect onChange={(val) => this.onAppChange(val)}/>

          <Search
            className="ml-3"
            style={{width: 250}}
            placeholder={t('input.classname')}
            enterButton={true}
            onSearch={(val) => this.onSearch(val)}
            disabled={appId === null}/>

          <Button className="ml-3" type="primary" onClick={() => this.onAdd()} disabled={appId === null}>
            {t('add')}
          </Button>
          <Button className="ml-3" type="primary" onClick={() => this.onRefresh()}>
            {t('refresh')}
          </Button>
        </div>

        <Table
          className="mt-3"
          columns={[
            {title: t('id'), dataIndex: 'id', key: 'id', width: '5%', className: 'keep-word'},
            {
              title: t('jobs.class'), dataIndex: 'clazz', key: 'clazz', width: '30%',
              render: (text) => <code>{text}</code>
            },
            {
              title: t('jobs.cron'), dataIndex: 'cron', key: 'cron', width: '15%',
              render: (text) => <code>{text}</code>
            },
            {title: t('desc'), dataIndex: 'desc', key: 'desc', width: '20%'},
            {
              title: t('status'), key: 'status', width: '8%',
              render (text, record) {
                const statusDesc = record.status === 1 ? t('enable') : t('disable')
                const statusClass = record.status === 1 ? 'status-enbale' : 'status-disable'
                return (
                  <span className={statusClass}>{statusDesc}</span>
                )
              }
            },
            {
              title: t('operation'), key: 'operation',
              render (text, record) {

                let disableOrEnable = record.status === 1 ?
                  (<a onClick={() => self.onDisable(record)}>{t('disable')}</a>) :
                  (<a onClick={() => self.onEnable(record)}>{t('enable')}</a>)

                return (
                  <span>
                    <a onClick={() => self.onUpdate(record)}>{t('update')}</a>
                    <span className="ant-divider"></span>
                    {disableOrEnable}
                    <span className="ant-divider"></span>
                    <a onClick={() => self.onDependenceConfig(record)}>{t('jobs.dependence.config')}</a>
                    <span className="ant-divider"></span> 
                    <a onClick={() => self.onAssign(record)}>{t('jobs.assigns')}</a>
                    <span className="ant-divider"></span> 
                    <a onClick={() => self.onDelete(record)}>{t('delete')}</a>
                  </span>
                )
              }
            }
          ]}
          dataSource={this.state.jobs}
          loading={this.state.loading}
          pagination={this.state.pagination}
          rowKey="id"
          onChange={(p) => this.onPageChange(p)}/>

        {editingJob === null ? null :
          <JobEdit job={editingJob}
                   onSubmitted={() => this.onEditSubmitted()}
                   onCanceled={() => this.onEditCanceled()}
                   onFailed={() => this.onEditFailed()}/>}

        {operatingJob === null ? null :
          <JobOperate job={operatingJob}
                      operate={operate}
                      onSubmitted={() => this.onOperateSubmitted()}
                      onCanceled={() => this.onOperateCanceled()}
                      onFailed={() => this.onOperateFailed()}/>}

        {dependencingJob === null ? null :
          <JobDependence job={dependencingJob}
                         onSubmitted={() => this.onDependenceSubmitted()}
                         onCanceled={() => this.onDependenceCanceled()}
                         onFailed={() => this.onDependenceFailed()}/>}

        {assigningJob === null ? null :
          <JobAssign job={assigningJob}
                     onSubmitted={() => this.onAssignSubmitted()}
                     onCanceled={() => this.onAssignCanceled()}
                     onFailed={() => this.onAssignFailed()}/>}

      </div>
    )
  }
}
