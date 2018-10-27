package com.claude.wmall.shopping.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.claude.wmall.shopping.domain.User;
import com.claude.wmall.shopping.service.UserService;
@Service

public class UserServiceImpl extends CrudServiceImpl<User> implements UserService {


	//保存用户
	public void save(User user){
		this.dao.save(user);
	}

	//通过name获取user对象
	public boolean getUserByName(String name){
		boolean bool = false;
		String hql = "from User where vLoginName='"+name+"'";
		if(this.dao.find(hql, new Object[0])==null||this.dao.find(hql, new Object[0]).size()==0){
			bool=true;
		}
		//返回true可以注册
		return bool;
	}

	//通过邮箱
	public boolean getUserByEmail(String email){
		boolean bool = false;
		String hql = "from User where vEmail='"+email+"'";
		 if(this.dao.find(hql, new Object[0])==null ||this.dao.find(hql, new Object[0]).size()==0){
			 bool=true;
		 }
		//返回true可以注册
		return bool;
	}

	//通过身份证号
	public boolean getUserByIdNumber(String idNumber){
		boolean bool = false;
		String hql = "from User where vIdNumber='"+idNumber+"'";
		if( this.dao.find(hql, new Object[0])==null|| this.dao.find(hql, new Object[0]).size()==0){
			bool=true;
		}
		//返回true 可以注册
		return bool;
	}

	//通过手机号
	public boolean getUserByIdPhone(String phone){
		boolean bool = false;
		String hql = "from User where vPhone='"+phone+"'";
		System.out.println("phone==================="+phone);
		if( this.dao.find(hql, new Object[0])==null|| this.dao.find(hql, new Object[0]).size()==0){
			bool=true;
		}
		//返回true 可以注册
		return bool;
	}

	//通过登录名和密码
	public User getUserByLoginAndPass(String loginName,String loginPass){
		User user = new User() ;
		String hql = "from User where vLoginName='"+loginName+"' and vLoginPass='"+loginPass+"' ";
		if( this.dao.find(hql, new Object[0])!=null&& this.dao.find(hql, new Object[0]).size()!=0){
			return user=(User)this.dao.find(hql, new Object[0]).get(0);
		}
		else
		{
			return null;
		}
		//返回true 登录失败
	}

	//通过登录名获得用户
	public User getUsersByName(String name){
		User user =null ;
		String hql = "from User where vLoginName='"+name+"'";

		if(this.dao.find(hql, new Object[0])!=null&& this.dao.find(hql, new Object[0]).size()!=0){
			user=(User)this.dao.find(hql, new Object[0]).get(0);
		}
		return user;
	}

	//通过ID查找用户
	public User getUserByID(Integer ID){
		User user=this.dao.get(ID);
		return user;
	}

	public List<User> getUsersByType(String type){
		String hql = "from User where vType='"+type+"'";
		return this.dao.find(hql, new Object[0]);
	}


	public User getUserByPhone(String phone){
		String hql = "from User where vPhone = '"+phone+"' ";
		return this.dao.findUnique(hql, new Object[0]);
	}

    @Override
    public List<User> getListByDeptId(Integer deptId) {
        String hql = "from User where deptId = " + deptId;
        return this.dao.find(hql, new Object[0]);
    }

}
