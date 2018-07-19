import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'antd'
import { Ajax } from '../common/ajax'
import t from '../../i18n'

class AppDelete extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      confirming: false
    }
  }

  handleSubmit () {

    const self = this

    const app = this.props.app

    // start submiting
    self.setState({confirming: true})

    Ajax.post('/api/apps/del', {appName: app.appName}, function (jsonData) {

      // stop submiting when post finished
      self.setState({confirming: false});

      // callback parent
      (self.props.onSubmitted && self.props.onSubmitted())
    })
  }

  handleCancel () {
    // callback parent
    this.props.onCanceled()
  }

  render () {

    var app = this.props.app

    return (
      <Modal
        title={t('apps.delete')}
        wrapClassName="vertical-center-modal"
        visible={true}
        onOk={() => this.handleSubmit()}
        onCancel={() => this.handleCancel()}
        okText={t('confirm')}
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
                  loading={this.state.confirming}
                  onClick={() => this.handleSubmit()}>
            {t('confirm')}
          </Button>
        ]}>
        <I18n code="apps.delete.confirm" args={[app.appName]}/>
      </Modal>
    )
  }
}

AppDelete.propTypes = {
  app: PropTypes.object.isRequired
}

export default AppDelete