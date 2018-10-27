package com.claude.wmall.jxc.service.store;

import com.claude.wmall.jxc.domain.store.StoreChuKuD;
import com.github.pagehelper.PageInfo;

public interface ChukudService  {
     
	 /**
     * 分页查询出库单
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<StoreChuKuD> listByPage(StoreChuKuD query)throws Exception;
    
    
    /**保存出库单
    *
    * @param storeCaiGouRkd
    * @throws Exception
    */
   void save(StoreChuKuD StoreChuKuD)throws Exception;
   
   /**删除出库单
   *
   * @param storeCaiGouRkd
   * @throws Exception
   */
   int del(String[] ids)throws Exception;
}
