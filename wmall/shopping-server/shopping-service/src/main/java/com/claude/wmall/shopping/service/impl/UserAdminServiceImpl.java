package com.claude.wmall.shopping.service.impl;

import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.User;
import com.claude.wmall.shopping.service.UserAdminService;

@Service

public class UserAdminServiceImpl extends CrudServiceImpl<User> implements UserAdminService {

	
	//返回系统管理员列表
	public void adminList(Carrier<User> carrier,String loginName,String realName,String email,String state,String area) {
		String hql="from User where 1=1 and vType='2' ";
		if(!"".equals(loginName)&&loginName!=null){
			hql = hql +" and vLoginName like '%"+loginName+"%'";
		}
		if(!"".equals(realName)&&realName!=null){
			hql = hql +" and vRealName like  '%"+realName+"%'";
		}

		if(!"".equals(email)&&email!=null){
			hql = hql +" and vEmail = '"+email+"'";
		}
		if(!"".equals(state)&&state!=null){
			hql = hql +" and vState = '"+state+"'";
		}
		if(!"".equals(area)&&area!=null){
			hql = hql +" and vArea = '"+area+"'";
		}
		this.dao.find(carrier,hql,null);
	}
	
	//返回个人用户列表
	public void adminPerUserList(Carrier<User> carrier,String loginName,String realName,String email,String state,String area){
		String hql = "from User where 1=1 and vType='3'";
		if(!"".equals(loginName)&&loginName!=null){
			hql = hql +" and vLoginName like '%"+loginName+"%'";
		}
		if(!"".equals(realName)&&realName !=null){
			hql = hql +" and vRealName like '%"+realName+"%'";
		}
		if(!"".equals(email)&&email!=null){
			hql = hql +" and vEmail = '"+email+"'";
		}
		if(!"".equals(state)&&state!=null){
			hql = hql +" and vState = '"+state+"'";
		}
		if(!"".equals(area)&&area!=null){
			hql = hql +" and vArea = '"+area+"'";
		}
		this.dao.find(carrier,hql,null);
	}
	
}
