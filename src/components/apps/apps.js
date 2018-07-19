import React, { Component } from 'react'
import { Breadcrumb, Button, Divider, Input, Table } from 'antd'
import { Ajax } from '../common/ajax'
import AppDelete from './app.delete'
import AppEdit from './app.edit'
import t from '../../i18n'

const Search = Input.Search

export default class Apps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchAppName: '',
      deletingApp: null,
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

    appName = appName || ''

    const self = this

    self.setState({loading: true})

    const pageSize = this.state.pageSize
    Ajax.get('/api/apps', {pageNo: pageNo, pageSize: pageSize, appName: appName}, function (jsonData) {
      var d = jsonData
      self.setState({
        loading: false,
        apps: d.data,
        searchAppName: appName,
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

  onRefresh () {
    this.loadApps(this.state.pagination.current, this.state.searchAppName)
  }

  onEditSubmitted () {
    this.setState({editingApp: null})
    this.loadApps(this.state.pagination.current)
  }

  onDeleteSubmitted () {
    this.setState({deletingApp: null})
    this.loadApps(this.state.pagination.current)
  }

  render () {

    const self = this
    const editingApp = this.state.editingApp
    const deletingApp = this.state.deletingApp

    return (

      <div>
        <Breadcrumb>
          <Breadcrumb.Item>{t('apps.mgr')}</Breadcrumb.Item>
          <Breadcrumb.Item>{t('apps.list')}</Breadcrumb.Item>
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
                    <a onClick={() => self.setState({deletingApp: record})}>{t('delete')}</a>
                  </span>
                )
              }
            }
          ]}
          dataSource={this.state.apps}
          loading={this.state.loading}
          pagination={this.state.pagination}
          onChange={(p) => this.loadApps(p.current)}
          rowKey="id"
        />
        {editingApp === null ? null :
          <AppEdit app={editingApp}
                   onSubmitted={() => this.onEditSubmitted()}
                   onCanceled={() => this.setState({editingApp: null})}/>}

        {deletingApp === null ? null :
          <AppDelete app={deletingApp}
                     onSubmitted={() => this.onDeleteSubmitted()}
                     onCanceled={() => this.setState({deletingApp: null})}/>}
      </div>
    )
  }
}
