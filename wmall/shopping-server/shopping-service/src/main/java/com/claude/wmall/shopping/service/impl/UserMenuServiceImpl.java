package com.claude.wmall.shopping.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.claude.wmall.shopping.domain.UserMenu;
import com.claude.wmall.shopping.service.UserMenuService;

@Service
public class UserMenuServiceImpl extends CrudServiceImpl<UserMenu> implements UserMenuService {

	//保存权限
	public void save(UserMenu userMenu){
		this.dao.save(userMenu);
	}
	
	//删除权限
	public void deleteMenu(Integer id){
		//delete B where B.type=y
		String hql= "delete UserMenu where vUserID=:id";
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("id", id);
		this.dao.batchExecute(hql, map);
	}
}
