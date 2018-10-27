package com.claude.wmall.shopping.service;

import java.util.List;

import com.claude.wmall.shopping.domain.SysMenu;

public interface SysMenuService extends CrudService<SysMenu>{

	//查询出个人所拥有的权限
	public List<SysMenu> getSysMenuByPerUser();
	
	//查询出企业管理员所有的权限
	public List<SysMenu> getSysMenuComAdmin();
	
	//查询出超级管理员所有的权限
	public List<SysMenu> getSysMenuAdmin();
	
	//查询出企业用户所有的权限
	public List<SysMenu> getSysMenuComUser();
	
	public List<SysMenu> getListByParams(String parentcode,String code,int layer , int isParent);
	
	//查询出个人所拥有的权限
	public List<SysMenu> getUserMenuList(Integer vUserID);
} 
