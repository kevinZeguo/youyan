package com.claude.wmall.jxc.service.recManage;

import com.claude.wmall.jxc.domain.recManage.Product;
import com.github.pagehelper.PageInfo;

public interface ProductService {
	
    /**
     * 分页查询采购入库单
     * @param query
     * @return
     * @throws Exception
     */
	PageInfo<Product> listByPage(Product query)throws Exception;
	
	/**
	 * 保存
	 */
	int save(Product product) throws Exception;
	
	Product findByCode(String code)throws Exception;
	
	int update(Product product) throws Exception;
	
	int updateStatusByCode(Product product) throws Exception;

}
