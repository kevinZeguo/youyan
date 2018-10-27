package com.claude.wmall.shopping.service.impl;


import com.claude.wmall.commons.dao.BaseDao;
import com.claude.wmall.commons.utils.ReflectionUtils;
import com.claude.wmall.shopping.service.CrudService;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Transactional(propagation = Propagation.REQUIRED)
public class CrudServiceImpl<T>  implements CrudService<T>{

	protected Class<T> entityClass;

	protected BaseDao<T> dao;

	//子类初始化时获取泛型类型，用户DAO辨别当前操作对象和表
	public CrudServiceImpl() {
		entityClass = ReflectionUtils.getSuperClassGenricType(getClass());
	}

	//根据名称，模糊查询
	public List<T> getByNameLike(String nameLike) {
		return dao.getByNameLike(nameLike);
	}

	//根据名称，精确查询
	@SuppressWarnings("unchecked")
	public T getByName(String name) {
		return (T) dao.getByName(name);
	}

	//公共方法
	public long countHqlResult(final String hql) {
		return dao.countHqlResult(hql);
	}
	
	public void save(T t) {
		dao.save(t);
	}

	public void delete(int ids) {
		dao.delete(ids);
	}
	
	public void delete(T t) {
		dao.delete(t);
	}

	public T get(int id) {
		return dao.get(id);
	}
	
	//edit by xf  参数由String类型 改为 Object value，否则当value的数据库类型为int等其他类型时会出错
	public T findUnique(String propertyName,Object value){
		return dao.findUniqueBy(propertyName, value);
	}
	
	public T findUnique(final String hql, final Object... values) {
		return dao.findUnique(hql, values);
	}
	
	//edit by xf  参数由String类型 改为 Object value，否则当value的数据库类型为int等其他类型时会出错
	public List<T> findBy(String propertyName,Object value){
		return dao.findBy(propertyName, value);
	}
	
	public List<T> find(final String hql, final Object... values) {
		return dao.find(hql, values);
	}

	public List<T> getAll() {
		return dao.getAll();
	}
	
	public int batchExecute(final String hql, final Map<String, ?> values) {
		return dao.batchExecute(hql, values);
	}

	//因为要在spring注入后初始化baseDAO的entityClass属性，所以只能用set注入，如果用
	//属性注入，因为注入是在调用构造函数之后，所以无法使用构造函数实现set entityClass
	//因为BaseDAO的@Scope("prototype")配置，而DeptService类似这样的service类是单例
	//模式，所以保证了所有的service具体类都只在服务器启动时初始化一次，并且各自都是注入一个
	//新的只属于自己的baseDAO，其类型就是自己的泛型类型，不会引起线程问题
	@Resource(name = "baseDao")
	public void setDao(BaseDao<T> dao) {
		this.dao = dao;
		dao.setEntityClass(entityClass);
	}
}
