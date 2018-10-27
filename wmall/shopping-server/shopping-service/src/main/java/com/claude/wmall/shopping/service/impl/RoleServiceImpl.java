package com.claude.wmall.shopping.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.RoleTable;
import com.claude.wmall.shopping.service.RoleService;

@Service

public class RoleServiceImpl extends CrudServiceImpl<RoleTable> implements RoleService{

	public void list(Carrier<RoleTable> carrier, String roleName) {
		String hql = "from RoleTable where 1=1  ";
		if (roleName != null && !"".equals(roleName)) {
			hql += " and roleName like '" + roleName + "'";
		}
		hql += "order by roleId asc ";
		this.dao.find(carrier, hql, null);
	}
	
	
	public void save(RoleTable role){
		this.dao.save(role);
	}
	
	public RoleTable findById(String roleId){
		return this.dao.get(Integer.valueOf(roleId));
	}
	
	public void delete(String roleId){
		RoleTable role = this.dao.get(Integer.valueOf(roleId));
		if(role != null){
			this.dao.delete(role);
		}
	}
	
	public List<RoleTable> getForSelect(){
		//String hql = "from RoleTable";
		return this.dao.getAll();
	}

	

}
