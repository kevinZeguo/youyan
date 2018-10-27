package com.claude.wmall.shopping.service;

import java.util.List;

import com.claude.wmall.shopping.domain.SysConfig;

public interface SysConfigService extends CrudService<SysConfig>{
	
	public List<SysConfig> prepmoneyperiod();
	
	public List<SysConfig> getSysConfigList(String keyword);
}
