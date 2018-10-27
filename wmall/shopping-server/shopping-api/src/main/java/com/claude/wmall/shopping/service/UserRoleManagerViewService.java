package com.claude.wmall.shopping.service;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.UserRoleManagerView;

public interface UserRoleManagerViewService extends CrudService<UserRoleManagerView> {

	public void list(Carrier<UserRoleManagerView> carrier, String roleId,String vrealName,String vloginName,String vstate) ;
	
	public UserRoleManagerView findById(String id) ;
	
}
