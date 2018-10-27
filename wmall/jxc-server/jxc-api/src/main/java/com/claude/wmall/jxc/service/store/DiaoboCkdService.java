package com.claude.wmall.jxc.service.store;

import com.claude.wmall.jxc.domain.store.StoreDiaoBoCkd;
import com.github.pagehelper.PageInfo;

public interface DiaoboCkdService {
     
	 /**
     * 分页查询调拨购入库单
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<StoreDiaoBoCkd> listByPage(StoreDiaoBoCkd query)throws Exception;
    
    
    /**保存出库单
    *
    * @param storeCaiGouRkd
    * @throws Exception
    */
   void save(StoreDiaoBoCkd storeDiaoBoCkd)throws Exception;
   
   /**删除出库单
   *
   * @param storeCaiGouRkd
   * @throws Exception
   */
   int del(String[] ids)throws Exception;
}
