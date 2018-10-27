package com.claude.wmall.shopping.service;

import com.claude.wmall.shopping.domain.UserMenu;

public interface UserMenuService extends CrudService<UserMenu>{
	
	//删除权限
	public void deleteMenu(Integer id) ;
}
