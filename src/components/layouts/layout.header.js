import {Button, Icon, Layout, Menu, Tooltip} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import React, {Component} from 'react'
import t, {lang, language} from '../../i18n'

import './layout.header.less'

const {Header} = Layout
const SubMenu = Menu.SubMenu

class LayoutHeader extends Component {
  
  constructor ({location}) {
    super()
    this.state = {
      selectedKeys: [location.pathname.substr(1) || 'apps'],
      lang
    }
  }
  
  switchLang () {
    var lang = this.state.lang
    lang = lang === 'en' ? 'zh' : 'en'
    language(lang)
    // this.setState({lang})
    // no need to `full reload` current page, change will affected after next component update
    location.reload()
  }
  
  render () {
    
    return (
      <Header className="header">
        <div className="logo"/>
        <Menu defaultSelectedKeys={this.state.selectedKeys}
              style={{'fontSize': '16px', lineHeight: '64px'}}
              mode="horizontal"
              theme="dark">
          <SubMenu key="apps" title={<span><Icon type="appstore"/>{t('app.management')}</span>}>
            <Menu.Item key="apps">
              <Link to="/apps"><Icon type="bars"/>{t('app.list')}</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="jobs" title={<span><Icon type="file-text"/>{t('job.management')}</span>}>
            <Menu.Item key="job-configs">
              <Link to="/job-configs"><Icon type="bars"/>{t('job.config')}</Link>
            </Menu.Item>
            <Menu.Item key="job-controls">
              <Link to="/job-controls"><Icon type="line-chart"/>{t('job.control')}</Link>
            </Menu.Item>
            <Menu.Item key="job-instances">
              <Link to="/job-instances"><Icon type="copy"/>{t('job.history')}</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="clusters" title={<span><Icon type="windows"/>{t('clusters.management')}</span>}>
            <Menu.Item key="servers">
              <Link to="/servers"><Icon type="laptop"/>{t('clusters.servers')}</Link>
            </Menu.Item>
            <Menu.Item key="clients">
              <Link to="/clients"><Icon type="desktop"/>{t('clusters.clients')}</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        
        <div className="operates">
          <Button shape="circle" size="large" onClick={() => this.switchLang()}>
            {this.state.lang === 'en' ? 'ZH' : 'EN'}
          </Button>
          <a href="https://github.com/ihaolin/antares" target="_blank" rel="noopener noreferrer">
            <Button icon="github" shape="circle" size="large"/>
          </a>
          <Tooltip title={t('exit')}>
            <Button icon="poweroff" shape="circle" size="large"/>
          </Tooltip>
        </div>
      </Header>
    )
  }
}

export default withRouter(LayoutHeader)