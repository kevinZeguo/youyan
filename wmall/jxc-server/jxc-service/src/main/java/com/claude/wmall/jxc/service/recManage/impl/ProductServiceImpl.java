package com.claude.wmall.jxc.service.recManage.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claude.wmall.jxc.dao.recManage.ProductDao;
import com.claude.wmall.jxc.domain.recManage.Product;
import com.claude.wmall.jxc.service.recManage.ProductService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductDao productDao;

	@Override
	public PageInfo<Product> listByPage(Product product) throws Exception {

		PageHelper.startPage(product.getPage(), product.getRows());
		return new PageInfo<Product>(productDao.selectListByPage(product));
	}
	
	@Override
	public int save(Product product) throws Exception {
		product.setCode(UUID.randomUUID().toString());
		return productDao.insert(product);
	} 
	
	@Override
	public Product findByCode(String code) throws Exception {
		return productDao.selectByPrimaryKey(code);
	}
	
	@Override
	public int update(Product product) throws Exception {
		return productDao.updateByPrimaryKey(product);
	} 
	
	@Override
	public int updateStatusByCode(Product product) throws Exception {
		return productDao.updateStatusByCode(product);
	}
}
