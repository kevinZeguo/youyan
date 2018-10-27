package com.claude.wmall.jxc.service.store;

import com.claude.wmall.jxc.domain.store.StoreDiaoBoRkd;
import com.claude.wmall.jxc.domain.store.StoreDiaoboRkdQuery;
import com.github.pagehelper.PageInfo;

/**
 * Created by mazeguo on 2016/8/28.
 */
public interface DiaoboRkdService {
    /**
     * 查询调拨入库单列表
     * @param query
     * @return
     * @throws Exception
     */
    PageInfo<StoreDiaoBoRkd> listByPage(StoreDiaoboRkdQuery query)throws Exception;

    /**
     * 根据编号查询调拨库单
     * @param danjubh
     * @return
     * @throws Exception
     */
    StoreDiaoBoRkd findByDanjubh(String danjubh)throws Exception;

    /**
     * 编辑库单信息
     * @param diaoBoRkd
     * @throws Exception
     */
    void editDanju(StoreDiaoBoRkd diaoBoRkd)throws Exception;

    /**
     * 保存库单
     * @param diaoBoRkd
     * @throws Exception
     */
    void save(StoreDiaoBoRkd diaoBoRkd)throws Exception;

    /**
     * 删除库单
     * @param danjubh
     * @param userId
     * @throws Exception
     */
    void removeDanjubh(String danjubh, Integer userId) throws Exception;
}
