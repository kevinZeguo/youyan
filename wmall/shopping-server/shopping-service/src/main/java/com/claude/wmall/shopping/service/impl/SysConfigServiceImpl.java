package com.claude.wmall.shopping.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.claude.wmall.shopping.domain.SysConfig;
import com.claude.wmall.shopping.service.SysConfigService;

@Service

public class SysConfigServiceImpl extends CrudServiceImpl<SysConfig> implements SysConfigService{
	public List<SysConfig> prepmoneyperiod(){
		String hql= "from SysConfig where vKeyword='prepmoneyperiod'";
			return this.dao.find(hql,new Object[0]);
	}
	
	public List<SysConfig> getSysConfigList(String keyword){
		String hql= "from SysConfig where vStatus='1' and vKeyword='"+keyword+"'";
			return this.dao.find(hql,new Object[0]);
	}
}
