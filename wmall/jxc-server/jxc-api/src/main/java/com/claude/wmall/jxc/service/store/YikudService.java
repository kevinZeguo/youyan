package com.claude.wmall.jxc.service.store;

import com.claude.wmall.jxc.domain.store.StoreYiKuD;
import com.github.pagehelper.PageInfo;

public interface YikudService {
     
	 /**
     * 分页查询移库单
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<StoreYiKuD> listByPage(StoreYiKuD query)throws Exception;
    
    /**保存出库单
    *
    * @param storeCaiGouRkd
    * @throws Exception
    */
   void save(StoreYiKuD storeYiKuD)throws Exception;
   
   /**删除出库单
   *
   * @param storeCaiGouRkd
   * @throws Exception
   */
   int del(String[] ids)throws Exception;
}
