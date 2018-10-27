package com.claude.wmall.jxc.service.store;

import com.claude.wmall.jxc.domain.store.StoreZhuangCheCkd;
import com.github.pagehelper.PageInfo;

public interface ZhuangCheCkdService{
     
	 /**
     * 分页查询采购入库单
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<StoreZhuangCheCkd> listByPage(StoreZhuangCheCkd query)throws Exception;
    
    /**保存出库单
    *
    * @param storeCaiGouRkd
    * @throws Exception
    */
   void save(StoreZhuangCheCkd storeZhuangCheCkd)throws Exception;
   
   /**删除出库单
   *
   * @param storeCaiGouRkd
   * @throws Exception
   */
   int del(String[] ids)throws Exception;
   
   
    
}
