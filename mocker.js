// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

const appPagingData = {
  'total': 106,
  'data': [
    {
      'id': 106,
      'appName': 'app_test104',
      'appKey': '123456104',
      'appDesc': '应用测试104',
      'ctime': 1474862383108,
      'utime': 1474862383108
    },
    {
      'id': 105,
      'appName': 'app_test103',
      'appKey': '123456103',
      'appDesc': '应用测试103',
      'ctime': 1474862383107,
      'utime': 1474862383107
    },
    {
      'id': 104,
      'appName': 'app_test102',
      'appKey': '123456102',
      'appDesc': '应用测试102',
      'ctime': 1474862383107,
      'utime': 1474862383107
    },
    {
      'id': 103,
      'appName': 'app_test101',
      'appKey': '123456101',
      'appDesc': '应用测试101',
      'ctime': 1474862383106,
      'utime': 1474862383106
    },
    {
      'id': 102,
      'appName': 'app_test100',
      'appKey': '123456100',
      'appDesc': '应用测试100',
      'ctime': 1474862383104,
      'utime': 1474862383104
    },
    {
      'id': 101,
      'appName': 'app_test99',
      'appKey': '12345699',
      'appDesc': '应用测试99',
      'ctime': 1474862383104,
      'utime': 1474862383104
    },
    {
      'id': 100,
      'appName': 'app_test98',
      'appKey': '12345698',
      'appDesc': '应用测试98',
      'ctime': 1474862383103,
      'utime': 1474862383103
    },
    {
      'id': 99,
      'appName': 'app_test97',
      'appKey': '12345697',
      'appDesc': '应用测试97',
      'ctime': 1474862383102,
      'utime': 1474862383102
    },
    {
      'id': 98,
      'appName': 'app_test96',
      'appKey': '12345696',
      'appDesc': '应用测试96',
      'ctime': 1474862383101,
      'utime': 1474862383101
    },
    {
      'id': 97,
      'appName': 'app_test95',
      'appKey': '12345695',
      'appDesc': '应用测试95',
      'ctime': 1474862383100,
      'utime': 1474862383100
    }
  ]
}

const appPagingNameData = {
  'total': 1,
  'data': [
    {
      'id': 106,
      'appName': 'app_test104',
      'appKey': '123456104',
      'appDesc': '应用测试104',
      'ctime': 1474862383108,
      'utime': 1474862383108
    }
  ]
}

const jobPagingData = {
  'total': 2,
  'data': [
    {
      'id': 2,
      'appId': 1,
      'type': 1,
      'clazz': 'me.hao0.antares.client.job.DemoJob',
      'cron': '0/30 * * * * ?',
      'desc': 'Demo处理类',
      'status': 1,
      'ctime': 1483977949392,
      'utime': 1483977949392
    },
    {
      'id': 1,
      'appId': 1,
      'type': 1,
      'clazz': 'me.hao0.antares.client.job.HelloJob',
      'cron': '0 0/1 * * * ?',
      'desc': 'Hello处理类',
      'status': 0,
      'ctime': 1483977949334,
      'utime': 1483977949334
    }
  ]
}

const jobPagingNameData = {
  'total': 1,
  'data': [
    {
      'id': 2,
      'appId': 1,
      'type': 1,
      'clazz': 'me.hao0.antares.client.job.DemoJob',
      'cron': '0/30 * * * * ?',
      'desc': 'Demo处理类',
      'status': 1,
      'ctime': 1483977949392,
      'utime': 1483977949392
    }
  ]
}

const jobConfigData = {
  'id': 1,
  'jobClass': 1,
  'misfire': true,
  'params': null,
  'shardCount': 4,
  'shardParams': '0=0;1=1;2=2;3=3',
  'maxShardPullCount': 3,
  'ctime': 1483977949366,
  'utime': 1483977949366
}

const jobControlsPagingData = {
  'total': 3,
  'data': [
    {
      'id': 3,
      'clazz': 'com.xxx.FuckJob',
      'cron': '0 0/1 * * * ?',
      'desc': '艹任务',
      'scheduler': null,
      'fireTime': null,
      'prevFireTime': null,
      'nextFireTime': null,
      'state': 0,
      'stateDesc': '停用'
    },
    {
      'id': 2,
      'clazz': 'me.hao0.antares.client.job.DemoJob',
      'cron': '0 0/1 * * * ?',
      'desc': 'demo任务xx',
      'scheduler': '127.0.0.1:22122',
      'fireTime': '2017-01-12 21:19:00',
      'prevFireTime': '2017-01-12 21:18:30',
      'nextFireTime': '2017-01-12 21:19:30',
      'state': 1,
      'stateDesc': '待执行'
    },
    {
      'id': 1,
      'clazz': 'me.hao0.antares.client.job.HelloJob',
      'cron': '0 0/1 * * * ?',
      'desc': 'hello任务',
      'scheduler': '127.0.0.1:22122',
      'fireTime': '2017-01-12 21:19:00',
      'prevFireTime': '2017-01-12 21:18:00',
      'nextFireTime': '2017-01-12 21:20:00',
      'state': 2,
      'stateDesc': '执行中'
    },
    {
      'id': 4,
      'clazz': 'me.hao0.antares.client.job.HelloJob4',
      'cron': '0 0/1 * * * ?',
      'desc': 'hello任务4',
      'scheduler': null,
      'fireTime': null,
      'prevFireTime': null,
      'nextFireTime': null,
      'state': 3,
      'stateDesc': '停止'
    },
    {
      'id': 5,
      'clazz': 'me.hao0.antares.client.job.HelloJob5',
      'cron': '0 0/1 * * * ?',
      'desc': 'hello任务5',
      'scheduler': '127.0.0.1:22122',
      'fireTime': '2017-01-12 21:19:00',
      'prevFireTime': '2017-01-12 21:18:00',
      'nextFireTime': '2017-01-12 21:20:00',
      'state': 4,
      'stateDesc': '执行失败'
    },
    {
      'id': 6,
      'clazz': 'me.hao0.antares.client.job.HelloJob6',
      'cron': '0 0/1 * * * ?',
      'desc': 'hello任务5',
      'scheduler': '127.0.0.1:22122',
      'fireTime': '2017-01-12 21:19:00',
      'prevFireTime': '2017-01-12 21:18:00',
      'nextFireTime': '2017-01-12 21:20:00',
      'state': 5,
      'stateDesc': '暂停'
    }
  ]
}

const jobControlsPagingNameData = {
  'total': 1,
  'data': [
    {
      'id': 1,
      'clazz': 'me.hao0.antares.client.job.HelloJob',
      'desc': 'hello任务',
      'scheduler': '127.0.0.1:22122',
      'fireTime': '2017-01-12 21:19:00',
      'prevFireTime': '2017-01-12 21:18:00',
      'nextFireTime': '2017-01-12 21:20:00',
      'state': 2,
      'stateDesc': ''
    }
  ]
}

const clientsData = [
  {
    'addr': '127.0.0.1:12345'
  },
  {
    'addr': '127.0.0.1:58027'
  }
]

const jobRunningInstanceData = {
  'jobClass': 1,
  'instanceId': 69,
  'status': 2,
  'statusDesc': '执行中',
  'startTime': '2017-01-12 21:19:00',
  'endTime': null,
  'totalShardCount': 4,
  'waitShardCount': 1,
  'runningShardCount': 1,
  'successShardCount': 2,
  'failedShardCount': 0,
  'finishPercent': 100
}

const jobInstancesShardsPagingData = {
  'total': 4,
  'data': [
    {
      'id': 8,
      'instanceId': 3,
      'item': 3,
      'param': '3',
      'pullClient': '10.40.0.169:56549',
      'finishClient': '10.40.0.169:56549',
      'status': 2,
      'statusDesc': '执行成功',
      'pullTime': 1484409660028,
      'pullCount': 1,
      'startTime': 1484409660032,
      'endTime': 1484409661035,
      'ctime': 1484409660017
    },
    {
      'id': 7,
      'instanceId': 3,
      'item': 2,
      'param': '2',
      'pullClient': '10.40.0.169:56549',
      'finishClient': '10.40.0.169:56549',
      'status': 2,
      'statusDesc': '执行成功',
      'pullTime': 1484409664071,
      'pullCount': 1,
      'startTime': 1484409664074,
      'endTime': 1484409665079,
      'ctime': 1484409660016
    },
    {
      'id': 6,
      'instanceId': 3,
      'item': 1,
      'param': '1',
      'pullClient': '10.40.0.169:56549',
      'finishClient': '10.40.0.169:56549',
      'status': 2,
      'statusDesc': '执行成功',
      'pullTime': 1484409665096,
      'pullCount': 1,
      'startTime': 1484409665098,
      'endTime': 1484409670103,
      'ctime': 1484409660014
    },
    {
      'id': 5,
      'instanceId': 3,
      'item': 0,
      'param': '0',
      'pullClient': '10.40.0.169:56549',
      'finishClient': '10.40.0.169:56549',
      'status': 3,
      'statusDesc': '执行失败',
      'pullTime': 1484409661050,
      'pullCount': 1,
      'startTime': 1484409661053,
      'endTime': 1484409664057,
      'ctime': 1484409660013,
      'cause': 'org.apache.commons.exec.ExecuteException: Process exited with an error: 1 (Exit value: 1)\n\tat org.apache.commons.exec.DefaultExecutor.executeInternal(DefaultExecutor.java:404)\n\tat org.apache.commons.exec.DefaultExecutor.execute(DefaultExecutor.java:166)\n\tat me.hao0.antares.client.job.script.DefaultScriptExecutor.exec(DefaultScriptExecutor.java:28)\n\tat me.hao0.antares.client.job.execute.AbstractJobExecutor.executeScript(AbstractJobExecutor.java:146)\n\tat me.hao0.antares.client.job.execute.AbstractJobExecutor.doExecuteShard(AbstractJobExecutor.java:110)\n\tat me.hao0.antares.client.job.execute.AbstractJobExecutor.access$000(AbstractJobExecutor.java:30)\n\tat me.hao0.antares.client.job.execute.AbstractJobExecutor$ExecuteShardTask.run(AbstractJobExecutor.java:82)\n\tat java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:471)\n\tat java.util.concurrent.FutureTask.run(FutureTask.java:262)\n\tat java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)\n\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)\n\tat java.lang.Thread.run(Thread.java:745)'
    }
  ]
}

const jobInstancesPagingData = {
  'total': 75,
  'data': [
    {
      'id': 226,
      'jobClass': 1,
      'status': 3,
      'statusDesc': '执行成功',
      'triggerTypeDesc': 'API触发',
      'server': '127.0.0.1:22122',
      'startTime': '2017-01-15 16:44:00',
      'endTime': '2017-01-15 16:44:12',
      'costTime': '12s',
      'cause': null
    },
    {
      'id': 223,
      'jobClass': 1,
      'status': 3,
      'statusDesc': '执行成功',
      'triggerTypeDesc': 'API触发',
      'server': '127.0.0.1:22122',
      'startTime': '2017-01-15 16:43:00',
      'endTime': '2017-01-15 16:43:12',
      'costTime': '12s',
      'cause': null
    },
    {
      'id': 220,
      'jobClass': 1,
      'status': 3,
      'statusDesc': '执行成功',
      'triggerTypeDesc': 'API触发',
      'server': '127.0.0.1:22122',
      'startTime': '2017-01-15 16:42:00',
      'endTime': '2017-01-15 16:42:13',
      'costTime': '13s',
      'cause': null
    },
    {
      'id': 217,
      'jobClass': 1,
      'status': 3,
      'statusDesc': '执行成功',
      'triggerTypeDesc': '调度触发',
      'server': '127.0.0.1:22122',
      'startTime': '2017-01-15 16:41:00',
      'endTime': '2017-01-15 16:41:08',
      'costTime': '8s',
      'cause': null
    },
    {
      'id': 214,
      'jobClass': 1,
      'status': 4,
      'statusDesc': '执行失败',
      'triggerTypeDesc': 'API触发',
      'server': '127.0.0.1:22122',
      'startTime': '2017-01-15 16:40:00',
      'endTime': '2017-01-15 16:40:12',
      'costTime': '12s',
      'cause': '这是在测试错误信息时，由行扩展。'
    },
    {
      'id': 211,
      'jobClass': 1,
      'status': 3,
      'statusDesc': '执行成功',
      'triggerTypeDesc': 'API触发',
      'server': '127.0.0.1:22122',
      'startTime': '2017-01-15 16:39:00',
      'endTime': '2017-01-15 16:39:15',
      'costTime': '15s',
      'cause': null
    },
    {
      'id': 208,
      'jobClass': 1,
      'status': 3,
      'statusDesc': '执行成功',
      'triggerTypeDesc': 'API触发',
      'server': '127.0.0.1:22122',
      'startTime': '2017-01-15 16:38:00',
      'endTime': '2017-01-15 16:38:13',
      'costTime': '13s',
      'cause': null
    },
    {
      'id': 205,
      'jobClass': 1,
      'status': 3,
      'statusDesc': '执行成功',
      'triggerTypeDesc': 'API触发',
      'server': '127.0.0.1:22122',
      'startTime': '2017-01-15 16:37:00',
      'endTime': '2017-01-15 16:37:07',
      'costTime': '7s',
      'cause': null
    },
    {
      'id': 202,
      'jobClass': 1,
      'status': 3,
      'statusDesc': '执行成功',
      'triggerTypeDesc': 'API触发',
      'server': '127.0.0.1:22122',
      'startTime': '2017-01-15 16:36:00',
      'endTime': '2017-01-15 16:36:16',
      'costTime': '16s',
      'cause': null
    },
    {
      'id': 199,
      'jobClass': 1,
      'status': 3,
      'statusDesc': '执行成功',
      'triggerTypeDesc': '依赖触发',
      'server': '127.0.0.1:22122',
      'startTime': '2017-01-15 16:35:00',
      'endTime': '2017-01-15 16:35:16',
      'costTime': '16s',
      'cause': null
    }
  ]
}

const serverJobsData = [
  {
    'id': 1,
    'appId': 1,
    'type': 1,
    'clazz': 'me.hao0.antares.client.job.HelloJob',
    'cron': '0 0/1 * * * ?',
    'status': 1,
    'desc': 'hello任务',
    'ctime': 1484409333246,
    'utime': 1484563457091
  },
  {
    'id': 2,
    'appId': 1,
    'type': 1,
    'clazz': 'me.hao0.antares.client.job.DemoJob',
    'cron': '0/30 * * * * ?',
    'status': 1,
    'desc': 'demo任务',
    'ctime': 1484409333313,
    'utime': 1484409333313
  },
  {
    'id': 3,
    'appId': 1,
    'type': 1,
    'clazz': 'me.hao0.antares.client.job.DemoJob',
    'cron': '0/30 * * * * ?',
    'status': 1,
    'desc': 'demo任务',
    'ctime': 1484409333313,
    'utime': 1484409333313
  },
  {
    'id': 4,
    'appId': 1,
    'type': 1,
    'clazz': 'me.hao0.antares.client.job.DemoJob',
    'cron': '0/30 * * * * ?',
    'status': 1,
    'desc': 'demo任务',
    'ctime': 1484409333313,
    'utime': 1484409333313
  },
  {
    'id': 5,
    'appId': 1,
    'type': 1,
    'clazz': 'me.hao0.antares.client.job.DemoJob',
    'cron': '0/30 * * * * ?',
    'status': 1,
    'desc': 'demo任务',
    'ctime': 1484409333313,
    'utime': 1484409333313
  },
  {
    'id': 6,
    'appId': 1,
    'type': 1,
    'clazz': 'me.hao0.antares.client.job.DemoJob',
    'cron': '0/30 * * * * ?',
    'status': 1,
    'desc': 'demo任务',
    'ctime': 1484409333313,
    'utime': 1484409333313
  },
  {
    'id': 7,
    'appId': 1,
    'type': 1,
    'clazz': 'me.hao0.antares.client.job.DemoJob',
    'cron': '0/30 * * * * ?',
    'status': 1,
    'desc': 'demo任务',
    'ctime': 1484409333313,
    'utime': 1484409333313
  },
  {
    'id': 8,
    'appId': 1,
    'type': 1,
    'clazz': 'me.hao0.antares.client.job.DemoJob',
    'cron': '0/30 * * * * ?',
    'status': 1,
    'desc': 'demo任务',
    'ctime': 1484409333313,
    'utime': 1484409333313
  },
  {
    'id': 9,
    'appId': 1,
    'type': 1,
    'clazz': 'me.hao0.antares.client.job.DemoJob',
    'cron': '0/30 * * * * ?',
    'status': 1,
    'desc': 'demo任务',
    'ctime': 1484409333313,
    'utime': 1484409333313
  }
]

const nextJobsData = {
  'total': 9,
  'data': [
    {
      'id': 4,
      'appName': 'test_app',
      'jobClass': 'me.hao0.antares.client.job.DemoJobA'
    },
    {
      'id': 5,
      'appName': 'test_app',
      'jobClass': 'me.hao0.antares.client.job.DemoJobB'
    },
    {
      'id': 6,
      'appName': 'test_app',
      'jobClass': 'me.hao0.antares.client.job.DemoJobC'
    }
  ]
}

const assignData = [
  {
    'ip': '10.40.0.108',
    'assign': true,
    'processes': [
      '10.40.0.108:24657',
      '10.40.0.108:24659'
    ]
  },
  {
    'ip': '10.40.0.109',
    'assign': false,
    'processes': [
      '10.40.0.109:11222'
    ]
  },
  {
    'ip': '10.40.0.110',
    'assign': true,
    'processes': [
      '10.40.0.110:36352',
      '10.40.0.110:48493',
      '10.40.0.110:23423'
    ]
  }
]

module.exports = {

  'GET /api/apps': function (req, res) {

    var respData = appPagingData
    if (req.query.appName && req.query.appName !== '') {
      respData = appPagingNameData
    }

    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': respData,
        'success': true
      })
    }, 500)
  },

  'POST /api/apps': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': 11111,
        'success': true
      })
    }, 500)
  },

  'POST /api/apps/del': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': true,
        'success': true
      })
    }, 500)
  },

  'GET /api/jobs': function (req, res) {

    var respData = jobPagingData
    if (req.query.jobClass !== '') {
      respData = jobPagingNameData
    }

    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': respData,
        'success': true
      })
    }, 500)
  },

  'POST /api/jobs': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': true,
        'success': true
      })
    }, 500)
  },

  'GET /api/jobs/(.*)/config': function (req, res) {

    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': jobConfigData,
        'success': true
      })
    }, 500)
  },

  'GET /api/jobs/(.*)/monitor': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': jobRunningInstanceData,
        'success': true
      })
    }, 500)
  },

  'POST /api/jobs/(.*)/(.*)': function (req, res) {

    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': true,
        'success': false
      })
    }, 500)
  },

  'GET /api/jobs/controls': function (req, res) {

    var respData = jobControlsPagingData
    if (req.query.jobClass !== '') {
      respData = jobControlsPagingNameData
    }

    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': respData,
        'success': true
      })
    }, 500)
  },

  'GET /api/jobs/instances': function (req, res) {

    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': jobInstancesPagingData,
        'success': true
      })
    }, 500)
  },

  'GET /api/jobs/instances/(.*)/shards': function (req, res) {

    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': jobInstancesShardsPagingData,
        'success': true
      })
    }, 500)
  },

  'GET /api/jobs/instances/(.*)': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': jobRunningInstanceData,
        'success': true
      })
    }, 500)
  },

  'GET /api/servers': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': [
          {
            'server': '127.0.0.1:12345',
            'leader': true,
            'jobCount': 1
          },
          {
            'server': '127.0.0.1:12346',
            'leader': false,
            'jobCount': 0
          }
        ],
        'success': true
      })
    }, 500)
  },

  'GET /api/servers/jobs': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': serverJobsData,
        'success': true
      })
    }, 500)
  },

  'GET /api/clients': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': clientsData,
        'success': true
      })
    }, 500)
  },

  'GET /api/jobs/(.*)/next': function (req, res) {

    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': nextJobsData,
        'success': true
      })
    }, 500)
  },

  'POST /api/jobs/(.*)/next': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': true,
        'success': true
      })
    }, 500)
  },

  'POST /api/jobs/(.*)/del_next/(.*)': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': true,
        'success': true
      })
    }, 500)
  },

  'GET /api/jobs/(.*)/assigns': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': assignData,
        'success': true
      })
    }, 500)
  },

  'POST /api/jobs/(.*)/assigns': function (req, res) {
    setTimeout(function () {
      res.json({
        'status': 200,
        'err': null,
        'data': true,
        'success': true
      })
    }, 500)
  }
}
