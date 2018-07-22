import { Form, Input, Modal } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import http from '../common/http'
import t from '../../i18n'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14}
}

class AppEdit extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      submitting: false,
      visible: true
    }
  }

  onCancel = () => {
    this.callback = this.props.onCanceled
    this.setState({visible: false})
  }

  onOk = () => {
    // validate form
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      // start submiting
      this.setState({submitting: true})
      // submit validated pass
      http.post('/api/apps', values).then(() => {

        // stop submiting when post finished
        this.setState({
          submitting: false,
          visible: false
        })

        // callback parent
        this.callback = this.props.onSubmitted
      }, () => this.setState({submitting: false}))
    })
  }

  afterClose = () => {
    // parent callback
    this.callback && this.callback()
  }

  checkNameInput = (rule, value, callback) => {
    if (/^[A-Za-z0-9_]+$/.test(value)) {
      callback()
    } else {
      callback(t('field.format.error', t('name.tip')))
    }
  }

  render () {

    const {submitting, visible} = this.state

    const {app, form} = this.props

    // app name tip
    const nameInputTip = t('input') + ' ' + t('apps.name') + ' ' + t('name.tip')

    // app key tip
    const keyInputTip = t('input') + ' ' + t('apps.key')

    // app desc tip
    const descInputTip = t('input') + ' ' + t('apps.desc')

    return (
      <Modal
        title={t('apps.edit')}
        confirmLoading={submitting}
        wrapClassName="vertical-center-modal"
        afterClose={this.afterClose}
        cancelText={t('cancel')}
        onCancel={this.onCancel}
        visible={visible}
        okText={t('submit')}
        onOk={this.onOk}>
        <Form autoComplete="off">

          <FormItem label={t('apps.name')} {...formItemLayout} hasFeedback>
            {form.getFieldDecorator('appName', {
              initialValue: app.appName,
              rules: [
                {required: true, validator: this.checkNameInput}
              ]
            })(
              <Input disabled={!!app.id} placeholder={nameInputTip}/>
            )}
          </FormItem>

          <FormItem label={t('apps.key')} {...formItemLayout} hasFeedback>
            {form.getFieldDecorator('appKey', {
              initialValue: app.appKey,
              rules: [
                {required: true, whitespace: true, message: keyInputTip}
              ]
            })(
              <Input placeholder={keyInputTip}/>
            )}
          </FormItem>

          <FormItem label={t('apps.desc')} {...formItemLayout}>
            {form.getFieldDecorator('appDesc', {
              initialValue: app.appDesc,
              rules: [
                {message: descInputTip}
              ]
            })(
              <Input placeholder={descInputTip}/>
            )}
          </FormItem>

        </Form>
      </Modal>
    )
  }
}

// create edit form
AppEdit = Form.create()(AppEdit)

AppEdit.propTypes = {
  app: PropTypes.object.isRequired
}

export default AppEdit
