import React, { Component } from 'react'
import { Breadcrumb, Button, Divider, Input, Modal, Table } from 'antd'
import AppEdit from './app.edit'
import http from '../common/http'
import t from '../../i18n'

const Search = Input.Search

export default class Apps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchAppName: '',
      editingApp: null,
      pagination: false,
      pageSize: 10000, // load all apps
      loading: true,
      apps: []
    }
  }

  componentDidMount () {
    this.loadApps(1)
  }

  loadApps (pageNo, appName) {

    const pageSize = this.state.pageSize
    appName = appName || ''

    this.setState({loading: true})
    http.get('/api/apps', {pageNo, pageSize, appName}).then(jsonData => {
      var d = jsonData
      this.setState({
        searchAppName: appName,
        loading: false,
        apps: d.data,
        pagination: {
          current: pageNo,
          total: d.total,
          pageSize: pageSize,
          showTotal: (total) => t('total', total)
        }
      })
    })
  }

  onAdd () {
    this.setState({
      editingApp: {
        appName: '',
        appKey: '',
        appDesc: ''
      }
    })
  }

  onRefresh = () => {
    this.loadApps(this.state.pagination.current, this.state.searchAppName)
  }

  onSubmitted = () => {
    this.setState({editingApp: null})
    this.loadApps(this.state.pagination.current)
  }

  deleteConfirm = (app) => {
    const self = this
    Modal.confirm({
      title: t('app.delete'),
      content: t('app.delete.confirm', app.appName),
      okText: t('confirm'),
      cancelText: t('cancel'),
      maskClosable: true,
      onOk () {
        return new Promise((resolve, reject) => {
          http.post('/api/apps/del', {appName: app.appName}).then(res => {
            self.loadApps(self.state.pagination.current)
            resolve()
          }, reject)
        })
      }
    })
  }

  render () {

    const self = this
    const {editingApp, apps, loading, pagination} = this.state

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>{t('app.management')}</Breadcrumb.Item>
          <Breadcrumb.Item>{t('app.list')}</Breadcrumb.Item>
        </Breadcrumb>

        <Search
          style={{width: 260}}
          onSearch={value => this.loadApps(1, value.trim())}
          placeholder={t('input.fullname')}
          enterButton/>
        <Button className="ml-3" type="primary" onClick={() => this.onAdd()}>{t('add')}</Button>
        <Button className="ml-3" type="primary" onClick={() => this.onRefresh()}>{t('refresh')}</Button>

        <Table
          className="mt-3"
          columns={[
            {title: t('id'), dataIndex: 'id', key: 'id', width: '10%'},
            {title: t('name'), dataIndex: 'appName', key: 'appName', width: '20%'},
            {title: t('desc'), dataIndex: 'appDesc', key: 'appDesc', width: '30%'},
            {
              title: t('operation'), key: 'operation',
              render (text, record) {
                return (
                  <span>
                    <a onClick={() => self.setState({editingApp: record})}>{t('update')}</a>
                    <Divider type="vertical"/>
                    <a onClick={() => self.deleteConfirm(record)}>{t('delete')}</a>
                  </span>
                )
              }
            }
          ]}
          pagination={pagination}
          dataSource={apps}
          onChange={(p) => this.loadApps(p.current)}
          loading={loading}
          rowKey="id"/>

        {editingApp &&
        <AppEdit
          app={editingApp}
          onSubmitted={this.onSubmitted}
          onCanceled={() => this.setState({editingApp: null})}
        />}
      </div>
    )
  }
}
