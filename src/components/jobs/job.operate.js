import { message, Modal } from 'antd'
import http from '../common/http'
import t from '../../i18n'

var icons = {
  terminate: 'exclamation-circle-o',
  del_next: 'delete',
  schedule: 'clock-circle-o',
  trigger: 'rocket',
  delete: 'delete',
  enable: 'check-circle-o',
  resume: 'forward',
  pause: 'pause',
  stop: 'poweroff'
}

const operate = function (operate, job, cb, suffix) {
  Modal.confirm({
    title: t('job.' + operate),
    content: t('job.' + operate + '.confirm', job.clazz),
    cancelText: t('cancel'),
    okText: t('confirm'),
    iconType: icons[operate],
    maskClosable: true,
    onOk: () => new Promise((resolve, reject) => {
      http.post('/api/jobs/' + job.id + '/' + operate + (suffix ? '/' + suffix : '')).then(() => {
        message.success(t('operate.success'))
        cb && cb()
        resolve()
      }, reject)
    })
  })
}

export default operate