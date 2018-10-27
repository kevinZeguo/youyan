package com.claude.wmall.shopping.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.claude.wmall.shopping.domain.SysMenu;
import com.claude.wmall.shopping.service.SysMenuService;

@Service

public class SysMenuServiceImpl extends CrudServiceImpl<SysMenu> implements SysMenuService {

	
	public void sava(SysMenu sysMenu){
		this.dao.save(sysMenu);
	}
	//查询出个人所拥有的权限
	public List<SysMenu> getSysMenuByPerUser(){
		
		List<SysMenu> sysMenu = null;
		String hql = "from SysMenu where vStauts='1' and vIsPerUserDefault='"+1+"'";
		return sysMenu =this.dao.find(hql, new Object[0]);
		
	}
	
	
	//查询出企业管理员所有的权限
	public List<SysMenu> getSysMenuComAdmin(){
		
		List<SysMenu> sysMenu = null;
		String hql = "from SysMenu where vStauts='1' and vIsComAdminDefault='"+1+"'";
		return sysMenu =this.dao.find(hql, new Object[0]);
		
	}
	
	
	//查询出超级管理员所有的权限
	public List<SysMenu> getSysMenuAdmin(){
		
		List<SysMenu> sysMenu = null;
		String hql = "from SysMenu where vStauts='1' and vIsAdminDefault='"+1+"'";
		
		return sysMenu =this.dao.find(hql, new Object[0]);
		
	}
	
	//查询出企业用户所有的权限
	public List<SysMenu> getSysMenuComUser(){
		
		List<SysMenu> sysMenu = null;
		String hql = "from SysMenu where vStauts='1' and vIsComUserDefault='"+1+"'";
		return sysMenu =this.dao.find(hql, new Object[0]);
		
	}
	
	
	public List<SysMenu> getListByParams(String parentcode,String code,int layer , int isParent) {
		String hql="from SysMenu where vStauts='1' ";

		if(parentcode != null && !"".equals(parentcode)){
			hql = hql + " and vParentName ="+parentcode;
		}
		if(code != null && !"".equals(code)){
			hql = hql + " and vMenuID ="+code;
		}
		if(layer != -1){
			hql = hql + " and vLevel ="+layer;
		}
		if (isParent != -1) {
			boolean b = true;
			if (isParent == 0) {
				b = false;
			}
			hql = hql + " and vIsParent =" + b;
		}
		
		return this.dao.find(hql,new Object[0]);
	}
	
	//查询出个人所拥有的权限
	public List<SysMenu> getUserMenuList(Integer vUserID){
		
		String hql="select sm from  SysMenu sm WHERE 1=1 ";
	
	    hql = hql + " and sm.vMenuID in (select um.vMenuID from UserMenu um where um.vUserID=:userid)";
		
		hql = hql + " order by vOrder asc";
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userid",vUserID);
		return this.dao.find(hql,map);
	}
} 
