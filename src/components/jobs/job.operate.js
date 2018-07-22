import { message, Modal } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import http from '../common/http'
import t from '../../i18n'

class JobOperate extends React.PureComponent {

  state = {
    confirming: false,
    visible: true
  }

  onOk = () => {
    const {operate, suffix, job} = this.props
    const uri = '/api/jobs/' + job.id + '/' + operate + (suffix ? '/' + suffix : '')

    // start submiting
    this.setState({confirming: true})
    http.post(uri).then(() => {

      // stop submiting when post finished
      this.setState({
        confirming: false,
        visible: false
      })
      message.success(t('operate.success'))
      this.callback = this.props.onSubmitted
    }, () => {
      this.callback = this.props.onFailed
    })
  }

  afterClose = () => {
    // callback parent
    this.callback && this.callback()
  }

  onCancel = () => {
    this.callback = this.props.onCanceled
    this.setState({visible: false})
  }

  render () {
    const {operate} = this.props
    const {visible, confirming} = this.state

    return (
      <Modal
        title={t('jobs.' + operate)}
        wrapClassName="vertical-center-modal"
        afterClose={this.afterClose}
        cancelText={t('cancel')}
        onCancel={this.onCancel}
        okText={t('confirm')}
        onOk={this.onOk}
        visible={visible}
        confirmLoading={confirming}>
        {t('jobs.' + operate + '.confirm')}
      </Modal>
    )
  }
}

JobOperate.propTypes = {
  operate: PropTypes.string.isRequired,
  job: PropTypes.object.isRequired
}

export default JobOperate