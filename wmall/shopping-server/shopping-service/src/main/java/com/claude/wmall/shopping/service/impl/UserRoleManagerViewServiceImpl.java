package com.claude.wmall.shopping.service.impl;

import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.UserRoleManagerView;
import com.claude.wmall.shopping.service.UserRoleManagerViewService;


@Service
public class UserRoleManagerViewServiceImpl extends CrudServiceImpl<UserRoleManagerView> implements UserRoleManagerViewService {

	public void list(Carrier<UserRoleManagerView> carrier, String roleId,String vrealName,String vloginName,String vstate) {
		String hql = "from UserRoleManagerView where 1=1  ";
		if (roleId != null && !"".equals(roleId)) {
			hql += " and roleId = '" + roleId + "'";
		}
		if (vrealName != null && !"".equals(vrealName)) {
			hql += " and vRealName like '%" + vrealName + "%'";
		}
		if (vloginName != null && !"".equals(vloginName)) {
			hql += " and vLoginName like '%" + vloginName + "%'";
		}
		if (vstate != null && !"".equals(vstate)) {
			hql += " and vState = '" + vstate + "'";
		}
		hql += "order by id asc ";
		this.dao.find(carrier, hql, null);
	}
	
	public UserRoleManagerView findById(String id){
		return this.dao.get(Integer.valueOf(id));
	}
	
}
