package com.claude.wmall.shopping.service;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.shopping.domain.User;

public interface UserAdminService extends CrudService<User> {

	
	//返回系统管理员列表
	public void adminList(Carrier<User> carrier,String loginName,String realName,String email,String state,String area) ;
	
	//返回个人用户列表
	public void adminPerUserList(Carrier<User> carrier,String loginName,String realName,String email,String state,String area) ;
	
}
