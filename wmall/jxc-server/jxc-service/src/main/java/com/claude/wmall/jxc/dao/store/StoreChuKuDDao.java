package com.claude.wmall.jxc.dao.store;

import java.util.List;

import com.claude.wmall.jxc.domain.store.StoreChuKuD;

public interface StoreChuKuDDao {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CHUKUD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    int deleteByPrimaryKey(Long banhao);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CHUKUD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    int insert(StoreChuKuD record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CHUKUD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    int insertSelective(StoreChuKuD record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CHUKUD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    StoreChuKuD selectByPrimaryKey(Long banhao);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CHUKUD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    int updateByPrimaryKeySelective(StoreChuKuD record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table STORE_CHUKUD
     *
     * @mbggenerated Mon Aug 08 23:37:21 CST 2016
     */
    int updateByPrimaryKey(StoreChuKuD record);
    
    /**
     * 分页查询
     * @param query
     * @return
     * @throws Exception
     */
    List<StoreChuKuD> selectListByPage(StoreChuKuD query)throws Exception;
}