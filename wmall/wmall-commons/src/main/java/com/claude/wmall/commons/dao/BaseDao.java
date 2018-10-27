/**
 * Copyright (c) 2005-2010 springside.org.cn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * 
 * $Id: SimpleHibernateDao.java 1205 2010-09-09 15:12:17Z calvinxiu $
 */
package com.claude.wmall.commons.dao;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.claude.wmall.commons.utils.Carrier;
import com.claude.wmall.commons.utils.ReflectionUtils;
import org.apache.log4j.Logger;
import org.hibernate.criterion.Criterion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;



@Repository
@Scope("prototype")
@SuppressWarnings("unchecked")
public class BaseDao<T> {
	
	private ExecuteDao executeDao;

	protected Logger logger = Logger.getLogger(getClass());

	protected Class<T> entityClass;

	public BaseDao() {
		this.entityClass = ReflectionUtils.getSuperClassGenricType(getClass());
	}

	public long countHqlResult(final String hql) {
		return executeDao.countHqlResult(hql);
	}
	/**
	 * 保存新增或修改的对象.
	 */
	public void save(final T entity) {
		executeDao.save(entityClass, entity);
	}

	/**
	 * 删除对象.
	 * 
	 * @param ids
	 *            对象必须是session中的对象或含id属性的transient对象.
	 */
	public void delete(final T entity) {
		executeDao.delete(entityClass, entity);
	}

	/**
	 * 按id删除对象.
	 */
	public void delete(final int id) {
		executeDao.delete(entityClass, id);
	}

	/**
	 * 按id获取对象.
	 */

	public T get(final int id) {
		return (T) executeDao.get(entityClass, id);
	}

	/**
	 * 按id列表获取对象列表.
	 */
	public List<T> get(final Collection<Long> ids) {
		return executeDao.get(entityClass, ids);
	}

	/**
	 * 获取全部对象.
	 */
	public List<T> getAll() {
		return executeDao.getAll(entityClass);
	}

	/**
	 * 获取全部对象, 支持按属性行序.
	 */
	public List<T> getAll(String orderByProperty, boolean isAsc) {
		return executeDao.getAll(entityClass, orderByProperty, isAsc);
	}

	/**
	 * 按属性查找对象列表, 匹配方式为相等.
	 */
	public List<T> findBy(final String propertyName, final Object value) {
		return executeDao.findBy(entityClass, propertyName, value);
	}

	/**
	 * 按属性查找唯一对象, 匹配方式为相等.
	 */
	public T findUniqueBy(final String propertyName, final Object value) {
		return (T) executeDao.findUniqueBy(entityClass, propertyName, value);
	}
	
	public <X> List<X> findLimit(final String hql,int first,int max) {
		return executeDao.findLimit(hql, first, max);
	}

	/**
	 * 按Criteria查询对象列表.
	 * 
	 * @param criterions
	 *            数量可变的Criterion.
	 */
	public List<T> find(final Criterion... criterions) {
		return executeDao.find(entityClass, criterions);
	}

	/**
	 * 按HQL查询对象列表.
	 * 
	 * @param values
	 *            数量可变的参数,按顺序绑定.
	 */
	public <X> List<X> find(final String hql, final Object... values) {
		return executeDao.find(hql, values);
	}
	@SuppressWarnings("rawtypes") 
	public <X> List<X> findSQL(Class entityClass,final String sql) {
		return executeDao.findSQL(entityClass,sql);//4936815
	}

	/**
	 * 按HQL查询对象列表.
	 * 
	 * @param values
	 *            数量可变的参数,按顺序绑定.
	 */
	public <X> List<X> find(final String hql, final Integer limit) {
		return executeDao.find(hql, limit);
	}

	/**
	 * 按HQL查询对象列表.
	 * 
	 * @param values
	 *            命名参数,按名称绑定.
	 */
	public <X> List<X> find(final String hql, final Map<String, ?> values) {
		return executeDao.createQuery(hql, values).list();
	}

	/**
	 * 按HQL分页查询.
	 * 
	 * @param carrier
	 *            分页参数. 注意不支持其中的orderBy参数.
	 * @param hql
	 *            hql语句.
	 * @param values
	 *            命名参数,按名称绑定.
	 * 
	 * @return 分页查询结果, 附带结果列表及所有查询输入参数.
	 */
	@SuppressWarnings("rawtypes")
	public void find(final Carrier carrier, String hql,
			final Map<String, ?> values) {
		executeDao.find(carrier, hql, values);
	}
	
	
	public  Carrier findRe(final Carrier carrier,String hql,final Map<String, ?> values) {
		return executeDao.findre(carrier, hql, values);
		
	}
	
	
	@SuppressWarnings("rawtypes")
	public void findSQL(final Carrier carrier, String hql,
			final Map<String, ?> values) {
		executeDao.findSQL(carrier, hql, values);
	}

	/**
	 * 按HQL分页查询. xf
	 * 
	 * @param carrier
	 *            分页参数. 可以支持其中的orderBy参数.
	 * @param hql
	 *            hql语句.
	 * @param values
	 *            命名参数,按名称绑定.
	 * 
	 * @return 分页查询结果, 附带结果列表及所有查询输入参数.
	 */
	@SuppressWarnings("rawtypes")
	public void findByOrder(final Carrier carrier, String hql,
							final Object... values) {
		executeDao.find(carrier, hql, values);
	}
	
	/**
	 * 
	 * Description: 按照SQL分页查询
	 * 
	 * @param carrier
	 * @param hql
	 * @param values
	 *            return_type void
	 * @exception
	 * @throws
	 */
	public void findNativeSql(final Carrier<T> carrier, String hql,
			final Map<String, ?> values) {
		executeDao.findNativeSql(carrier, hql, values, entityClass);
	}
	
	public <X> List<X> findEntityByP(String hql){
		return executeDao.createSQLQuery(hql,null,entityClass).list();
	}

	/**
	 * 按HQL查询唯一对象.
	 * 
	 * @param values
	 *            数量可变的参数,按顺序绑定.
	 */
	public <X> X findUnique(final String hql, final Object... values) {
		return (X) executeDao.findUnique(hql, values);
	}

	/**
	 * 执行HQL进行批量修改/删除操作.
	 * 
	 * @param values
	 *            命名参数,按名称绑定.
	 * @return 更新记录数.
	 */
	public int batchExecute(final String hql, final Map<String, ?> values) {
		return executeDao.batchExecute(hql, values);
	}

	/**
	 * 取得对象的主键名.
	 */
	public String getIdName() {
		return executeDao.getIdName(entityClass);
	}

	public void flush() {
		this.executeDao.flush();
	}

	public List<T> getByNameLike(String nameLike) {
		return executeDao.getByNameLike(entityClass, nameLike);
	}

	// 根据名称，精确查询
	public <X> X getByName(String name) {
		return (X) executeDao.getByName(entityClass, name);
	}

	/**
	 * 判断对象的属性值在数据库内是否唯一.
	 * 
	 * 在修改对象的情景下,如果属性新修改的值(value)等于属性原来的值(orgValue)则不作比较.
	 */
	public boolean isPropertyUnique(final String propertyName,
			final Object newValue, final Object oldValue) {
		return executeDao.isPropertyUnique(entityClass, propertyName, newValue,
				oldValue);
	}

	public Class<T> getEntityClass() {
		return entityClass;
	}

	public void setEntityClass(Class<T> entityClass) {
		this.entityClass = entityClass;
	}

	@Autowired
	public void setExecuteDao(ExecuteDao executeDao) {
		this.executeDao = executeDao;
	}

	public long getCountHql(final String hql, final Map<String, ?> values) {
		return executeDao.countHqlResult(hql,values);
	}

}