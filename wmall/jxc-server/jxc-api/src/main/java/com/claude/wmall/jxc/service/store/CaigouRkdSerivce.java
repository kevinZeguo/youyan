package com.claude.wmall.jxc.service.store;

import com.claude.wmall.jxc.domain.store.StoreCaiGouRkd;
import com.claude.wmall.jxc.domain.store.StoreCaiGouRkdQuery;
import com.github.pagehelper.PageInfo;

/**
 * Created by mazeguo on 2016/8/9.
 */
public interface CaigouRkdSerivce {
    /**
     * 分页查询采购入库单
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<StoreCaiGouRkd> listByPage(StoreCaiGouRkdQuery query)throws Exception;

    /**保存采购入库单
     *
     * @param storeCaiGouRkd
     * @throws Exception
     */
    void save(StoreCaiGouRkd storeCaiGouRkd)throws Exception;

    /**
     * 查询采购入库单详情
     * @param danjubh
     * @return
     * @throws Exception
     */
    StoreCaiGouRkd findByDanjubh(String danjubh)throws Exception;

    /**
     * 删除单据信息
     * @param danjubh
     * @param userId
     * @throws Exception
     */
    void removeDanjubh(String danjubh,Integer userId )throws Exception;

    /**
     * 编辑单据信息
     * @param storeCaiGouRkd
     * @throws Exception
     */
    void editDanju(StoreCaiGouRkd storeCaiGouRkd)throws Exception;

}
