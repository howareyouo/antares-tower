import { Button, Form, Modal, Progress, Table, Tabs } from 'antd'
import React from 'react'
import http from '../common/http'
import t from '../../i18n'
import './job.instance.detail.less'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const itemLayout = {
  wrapperCol: {span: 15},
  labelCol: {span: 6}
}

export default class JobInstanceDetail extends React.Component {

  state = {
    loadingShards: false,
    pagination: {},
    firstLoad: false,
    pageSize: 10,
    visible: true,
    detail: {},
    shards: []
  }

  loadShards (pageNo) {

    const instanceId = this.state.detail.instanceId
    if (!instanceId) {
      return
    }

    const pageSize = this.state.pageSize
    const self = this

    self.setState({loadingShards: true})
    http.get('/api/jobs/instances/' + instanceId + '/shards', {pageNo, pageSize}).then(function (jsonData) {
      var d = jsonData
      self.setState({
        loadingShards: false,
        shards: d.data,
        pagination: {
          current: pageNo,
          total: d.total,
          pageSize: pageSize,
          showTotal: (total) => t('total', total)
        }
      })
    })
  }

  loadDetail () {

    // const jobId = this.props.job.id

    const requestUri = this.props.uri
    const firstLoad = this.state.firstLoad
    const self = this

    http.get(requestUri).then(function (instanceDetail) {

      self.setState({
        detail: instanceDetail,
        firstLoad: true
      })

      if (!firstLoad) {

        // first load the shards
        self.loadShards(1)

        if (instanceDetail.finishPercent < 100) {
          // load detail interval
          self.intervalId = setInterval(self.loadDetail, 5000)
        }
      }

      // clear interval if finished
      if (instanceDetail.finishPercent === 100) {
        // clearInterval(self.state.intervalId);
        self.stopLoadDetail()
      }

    }, self.stopLoadDetail)
  }

  stopLoadDetail = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId)
    }
  }

  componentDidMount () {
    this.loadDetail()
  }

  componentWillUnmount () {
    this.stopLoadDetail()
  }

  onRefreshShards = () => {
    const curPage = this.state.pagination.current || 1
    if (curPage) {
      this.loadShards(curPage)
    }
  }

  onCancel = () => {
    this.callback = this.props.onCanceled
    this.setState({visible: false})
  }

  afterClose = () => {
    this.callback && this.callback()
  }

  onShardsPageChange = (p) => {
    console.log(p)
    this.loadShards(p.current)
  }

  renderShardExtra = (shard) => {
    return (
      <table className="shard-extra-table">
        <tbody>
        <tr>
          <th>{t('jobs.instance.shard.pull.client')}</th>
          <td>{shard.pullClient}</td>
        </tr>
        <tr>
          <th>{t('jobs.instance.shard.finish.client')}</th>
          <td>{shard.finishClient}</td>
        </tr>
        <tr>
          <th>{t('jobs.instance.shard.pull.count')}</th>
          <td>{shard.pullCount}</td>
        </tr>
        <tr>
          <th>{t('jobs.instance.shard.pull.time')}</th>
          <td>{shard.pullTime}</td>
        </tr>
        <tr>
          <th>{t('start.time')}</th>
          <td>{shard.startTime}</td>
        </tr>
        <tr>
          <th>{t('end.time')}</th>
          <td>{shard.endTime}</td>
        </tr>
        {shard.status === 3 && (
          <tr>
            <th>{t('error.info')}</th>
            <td>{shard.cause}</td>
          </tr>
        )}
        </tbody>
      </table>
    )
  }

  render () {

    const {detail, visible, loadingShards, pagination, shards} = this.state

    return (
      <Modal
        title={t('jobs.instance.detail')}
        wrapClassName="vertical-center-modal"
        afterClose={this.afterClose}
        onCancel={this.onCancel}
        visible={visible}
        width={580}
        footer={<Button size="large" onClick={this.onCancel}>{t('close')}</Button>}>

        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab={t('jobs.instance.running.info')} key="1">
            <Form>
              <FormItem className="mb-0" {...itemLayout} label={t('jobs.instance.finish.percent')}>
                <Progress status={detail.finishPercent < 100 ? 'active' : 'normal'} percent={detail.finishPercent}/>
              </FormItem>
              <FormItem className="mb-0" {...itemLayout} label={t('status')}>{detail.statusDesc}</FormItem>
              <FormItem className="mb-0" {...itemLayout} label={t('start.time')}>{detail.startTime}</FormItem>
              <FormItem className="mb-0" {...itemLayout} label={t('end.time')}>{detail.endTime}</FormItem>
              <FormItem className="mb-0" {...itemLayout} label={t('jobs.instance.total.shard.count')}>{detail.totalShardCount}</FormItem>
              <FormItem className="mb-0" {...itemLayout} label={t('jobs.instance.wait.shard.count')}>{detail.waitShardCount}</FormItem>
              <FormItem className="mb-0" {...itemLayout} label={t('jobs.instance.running.shard.count')}>{detail.runningShardCount}</FormItem>
              <FormItem className="mb-0" {...itemLayout} label={t('jobs.instance.success.shard.count')}>{detail.successShardCount}</FormItem>
              <FormItem className="mb-0" {...itemLayout} label={t('jobs.instance.failed.shard.count')}>{detail.failedShardCount}</FormItem>
            </Form>
          </TabPane>

          <TabPane tab={t('jobs.instance.shards.info')} key="2">
            <Button type="primary" onClick={() => this.onRefreshShards()} size="small">{t('refresh')}</Button>
            <Table
              className="mt-2"
              columns={[
                {title: t('id'), dataIndex: 'id', key: 'id'},
                {title: t('jobs.instance.shard.item'), dataIndex: 'item', key: 'item'},
                {title: t('jobs.instance.shard.param'), dataIndex: 'param', key: 'param'},
                {
                  title: t('status'), dataIndex: 'statusDesc', key: 'statusDesc', render: (text, job) => (
                    <span className={'shard-' + job.status}>{text}</span>
                  )
                }
              ]}
              pagination={pagination}
              dataSource={shards}
              loading={loadingShards}
              expandedRowRender={(record) => this.renderShardExtra(record)}
              onChange={(p) => this.onShardsPageChange(p)}
              size="middle"
              rowKey="id"
            />
          </TabPane>
        </Tabs>
      </Modal>
    )
  }
}
