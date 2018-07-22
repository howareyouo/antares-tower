import { Form, Input, InputNumber, Modal, Switch, Tabs } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import http from '../common/http'
import t from '../../i18n'

const TextArea = Input.TextArea
const FormItem = Form.Item
const TabPane = Tabs.TabPane

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14}
}

class JobEdit extends React.Component {

  state = {
    submitting: false,
    visible: true,
    config: {
      params: '',
      shardCount: 1,
      shardParams: '',
      misfire: true,
      maxShardPullCount: 3
    }
  }

  componentDidMount () {
    this.loadConfig()
  }

  onOk = () => {
    const self = this

    // validate form
    self.props.form.validateFields((err, values) => {
      if (err) {
        return
      }

      const job = self.props.job

      // set app id
      values.appId = job.appId
      // set job id
      if (job.id) {
        values.jobId = job.id
      }

      // start submiting
      self.setState({submitting: true})
      // submit validated pass
      http.post('/api/jobs', values).then(function (jsonData) {

        // stop submiting when post finished
        self.setState({
          submitting: false,
          visible: false
        })

        // callback parent
        self.callback = self.props.onSubmitted

      }, function (err) {
        // stop submiting when post finished
        self.callback = self.props.onFailed
        self.setState({submitting: false})
      })

    })
  }

  onCancel = () => {
    this.callback = this.props.onCanceled
    this.setState({visible: false})
  }

  afterClose = () => {
    // parent callback
    this.callback && this.callback()
  }

  checkClassInput = (rule, value, callback) => {
    if (/([a-z][a-z_0-9]*\.)*[A-Z_]($[A-Z_]|[\w_])*/.test(value)) {
      callback()
    } else {
      callback(t('field.format.error', t('name.tip')))
    }
  }

  loadConfig = () => {

    if (!this.props.job.id) {
      return
    }
    const self = this
    const jobId = this.props.job.id

    http.get('/api/jobs/' + jobId + '/config').then(function (cfg) {
      self.setState({
        config: cfg
      })
    })
  }

  render = () => {

    const {visible, config, submitting} = this.state
    const {job, form} = this.props

    // job class tip
    const classInputTip = t('input') + t('job.class') + ' ' + t('job.class.exapmle')

    // job cron tip
    const cronInputTip = t('input') + t('job.cron')

    // job desc
    const descInputTip = t('input') + t('job.desc')

    // job params
    const paramsInputTip = t('input') + t('job.params')

    // job shard count
    const shardCountInputTip = t('input') + t('job.shard.count')

    // job shard params
    const shardParamsInputTip = t('input') + t('job.shard.params') + ', ' + t('job.shard.params.exapmle')

    // job max shard pull count
    const maxShardPullCountInputTip = t('input') + t('job.max.shard.pull.count')

    // job misfire
    const misfireChecked = config.misfire

    // job timeout
    const timeoutInputTip = t('input') + t('job.timeout')

    // job states
    const statusChecked = (job.status !== undefined && job.status === 1)

    return (
      <Modal
        title={t('job.edit')}
        wrapClassName="vertical-center-modal"
        confirmLoading={submitting}
        afterClose={this.afterClose}
        cancelText={t('cancel')}
        onCancel={this.onCancel}
        visible={visible}
        okText={t('submit')}
        onOk={this.onOk}
        width={680}>

        <Form autoComplete="off">
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab={t('job.basic.info')} key="1">
              <FormItem {...formItemLayout} label={t('job.class')} hasFeedback>
                {form.getFieldDecorator('clazz', {
                  initialValue: job.clazz,
                  rules: [
                    {required: true, validator: this.checkClassInput, message: classInputTip}
                  ]
                })(
                  <Input disabled={!!job.id} placeholder={classInputTip}/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={t('job.cron')}
                // extra="Seconds Minutes Hours DayofMonth Month DayofWeek Year"
                hasFeedback>
                {form.getFieldDecorator('cron', {
                  initialValue: job.cron,
                  rules: [
                    {required: true, whitespace: true, message: cronInputTip}
                  ]
                })(
                  <Input placeholder={cronInputTip}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={t('job.desc')}>
                {form.getFieldDecorator('desc', {
                  initialValue: job.desc || '',
                  rules: [
                    {message: descInputTip}
                  ]
                })(
                  <TextArea placeholder={descInputTip} rows={4}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={t('enable.or.not')}>
                {form.getFieldDecorator('status', {
                  initialValue: statusChecked,
                  rules: [
                    {required: true}
                  ]
                })(
                  <Switch defaultChecked={statusChecked} checkedChildren={t('on')} unCheckedChildren={t('off')}/>
                )}
              </FormItem>

            </TabPane>
            <TabPane tab={t('job.config.info')} key="2">
              <FormItem {...formItemLayout} label={t('job.params')}>
                {form.getFieldDecorator('param', {
                  initialValue: config.param,
                  rules: [
                    {message: paramsInputTip}
                  ]
                })(
                  <Input placeholder={paramsInputTip}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={t('job.shard.count')}>
                {form.getFieldDecorator('shardCount', {
                  initialValue: config.shardCount,
                  rules: [
                    {required: true, message: shardCountInputTip}
                  ]
                })(
                  <InputNumber min={1}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={t('job.shard.params')}>
                {form.getFieldDecorator('shardParams', {
                  initialValue: config.shardParams,
                  rules: [
                    {message: shardParamsInputTip}
                  ]
                })(
                  <Input placeholder={shardParamsInputTip}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={t('job.max.shard.pull.count')}>
                {form.getFieldDecorator('maxShardPullCount', {
                  initialValue: config.maxShardPullCount,
                  rules: [
                    {required: true, message: maxShardPullCountInputTip}
                  ]
                })(
                  <InputNumber min={1}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={t('job.timeout')}>
                {form.getFieldDecorator('timeout', {
                  initialValue: config.timeout || 0,
                  rules: [
                    {required: true, message: timeoutInputTip}
                  ]
                })(
                  <InputNumber min={0}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label={t('job.misfire')}>
                {form.getFieldDecorator('misfire', {
                  initialValue: misfireChecked,
                  rules: [
                    {required: true}
                  ]
                })(
                  <Switch defaultChecked={misfireChecked}
                          checkedChildren={t('on')}
                          unCheckedChildren={t('off')}/>
                )}
              </FormItem>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    )
  }
}

// create edit form
JobEdit = Form.create()(JobEdit)

JobEdit.propTypes = {
  job: PropTypes.object.isRequired
}

export default JobEdit
