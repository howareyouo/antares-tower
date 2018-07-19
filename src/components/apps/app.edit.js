import { Button, Form, Input, Modal } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { Ajax } from '../common/ajax'
import t from '../../i18n'

const FormItem = Form.Item

class AppEdit extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      submitting: false
    }
  }

  handleCancel () {
    // parent callback
    this.props.onCanceled()
  }

  handleSubmit () {

    const self = this

    // start submiting
    self.setState({submitting: true})

    // validate form
    self.props.form.validateFields((errors, values) => {
      if (!errors) {

        // submit validated pass
        Ajax.post('/api/apps', values, function (jsonData) {

          // stop submiting when post finished
          self.setState({submitting: false});

          // callback parent
          (self.props.onSubmitted && self.props.onSubmitted())
        })
      } else {
        // stop submiting when validate failed
        self.setState({submitting: false})
      }
    })
  }

  checkNameInput (rule, value, callback) {
    if (/^[A-Za-z0-9_]+$/.test(value)) {
      callback()
    } else {
      callback(t('field.format.error', t('name.tip')))
    }
  }

  render () {

    const currentApp = this.props.app

    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    }

    // app name tip
    const nameInputTip = t('input') + ' ' + t('apps.name') + ' ' + t('name.tip')
    const nameDisable = !(currentApp.id === null || currentApp.id === undefined)

    // app key tip
    const keyInputTip = t('input') + ' ' + t('apps.key')

    // app desc tip
    const descInputTip = t('input') + ' ' + t('apps.desc')

    return (
      <Modal
        title={t('apps.edit')}
        wrapClassName="vertical-center-modal"
        visible={true}
        onOk={() => this.handleSubmit()}
        onCancel={() => this.handleCancel()}
        okText={t('submit')}
        cancelText={t('cancel')}
        closable={true}
        footer={[
          <Button key="back"
                  type="ghost"
                  size="large"
                  onClick={() => this.handleCancel()}>
            {t('cancel')}
          </Button>,
          <Button key="submit"
                  type="primary"
                  size="large"
                  loading={this.state.submitting}
                  onClick={() => this.handleSubmit()}>
            {t('submit')}
          </Button>
        ]}>

        <Form autoComplete="off">

          <FormItem
            {...formItemLayout}
            label={t('apps.name')}
            hasFeedback>
            {getFieldDecorator('appName', {
              initialValue: currentApp.appName,
              rules: [
                {required: true, validator: this.checkNameInput}
              ]
            })(
              <Input disabled={nameDisable} placeholder={nameInputTip}/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={t('apps.key')}
            hasFeedback>
            {getFieldDecorator('appKey', {
              initialValue: currentApp.appKey,
              rules: [
                {required: true, whitespace: true, message: keyInputTip}
              ]
            })(
              <Input placeholder={keyInputTip}/>
            )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label={t('apps.desc')}>
            {getFieldDecorator('appDesc', {
              initialValue: currentApp.appDesc,
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
