package com.claude.wmall.shopping.service;

import java.util.List;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.RoleTable;

public interface RoleService extends CrudService<RoleTable> {

	public void list(Carrier<RoleTable> carrier, String roleName);
	
	public void save(RoleTable role);
	
	public RoleTable findById(String roleId);
	
	public void delete(String roleId);
	
	public List<RoleTable> getForSelect();

}
