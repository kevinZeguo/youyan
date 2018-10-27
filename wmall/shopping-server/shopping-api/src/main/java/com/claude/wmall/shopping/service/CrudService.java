package com.claude.wmall.shopping.service;


import java.util.List;
import java.util.Map;

public interface CrudService<T> {



	//根据名称，模糊查询
	public List<T> getByNameLike(String nameLike);

	//根据名称，精确查询
	@SuppressWarnings("unchecked")
	public T getByName(String name);

	//公共方法
	public long countHqlResult(final String hql);
	public void save(T t);
	public void delete(int ids);

	public void delete(T t);

	public T get(int id);
	
	//edit by xf  参数由String类型 改为 Object value，否则当value的数据库类型为int等其他类型时会出错
	public T findUnique(String propertyName,Object value);
	public T findUnique(final String hql, final Object... values) ;
	
	//edit by xf  参数由String类型 改为 Object value，否则当value的数据库类型为int等其他类型时会出错
	public List<T> findBy(String propertyName,Object value);
	
	public List<T> find(final String hql, final Object... values);

	public List<T> getAll();
	
	public int batchExecute(final String hql, final Map<String, ?> values);
	
}
