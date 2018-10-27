package com.claude.wmall.jxc.service.store.impl;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.claude.wmall.commons.utils.DocuNumber;
import com.claude.wmall.jxc.dao.store.StoreChuRuKlsDao;
import com.claude.wmall.jxc.dao.store.StoreKudanDao;
import com.claude.wmall.jxc.dao.store.StoreZhuangCheCkdDao;
import com.claude.wmall.jxc.domain.store.StoreChuRuKls;
import com.claude.wmall.jxc.domain.store.StoreKudan;
import com.claude.wmall.jxc.domain.store.StoreYiKuD;
import com.claude.wmall.jxc.domain.store.StoreZhuangCheCkd;
import com.claude.wmall.jxc.service.store.ZhuangCheCkdService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;


/**
 * @author shangchoumeng
 *
 */
@Service
public class ZhuangCheCKSerivceImpl   implements ZhuangCheCkdService {
    @Autowired
    private StoreZhuangCheCkdDao storeZhuangCheCkdDao;
    
    @Autowired
    private StoreKudanDao storeKudanDao;
    
    @Autowired
    private StoreChuRuKlsDao storeChuRuKlsDao;

    @Override
    public PageInfo<StoreZhuangCheCkd> listByPage(StoreZhuangCheCkd query) throws Exception {
    	PageHelper.startPage(query.getPage(),query.getRows());
        return new PageInfo<StoreZhuangCheCkd>(storeZhuangCheCkdDao.selectListByPage(query));
    }

	@Override
	public void save(StoreZhuangCheCkd storeZhuangCheCkd) throws Exception {

		 //保存库单
       StoreKudan kuDan = new StoreKudan();
       kuDan.setKudanlx("-1");//出库
       kuDan.setRukulx(storeZhuangCheCkd.getKudanlx());//库单类型
       kuDan.setShenhebj("0");
       kuDan.setDanjubh(storeZhuangCheCkd.getDanjubh());
       kuDan.setDanjurq(StringUtils.isNotEmpty(storeZhuangCheCkd.getDanjurq()) ? storeZhuangCheCkd.getDanjurq().replace("-", "") : "");
       kuDan.setBeizhu(storeZhuangCheCkd.getBeizhu());
       storeKudanDao.insert(kuDan);

       
       
       storeZhuangCheCkd.setBianhao(DocuNumber.getMchBillNo());
       //保存出库单
       storeZhuangCheCkdDao.insert(storeZhuangCheCkd);

       //保存流水明细
       List<StoreChuRuKls> ruKlsList = storeZhuangCheCkd.getChuruklsList();
       for (StoreChuRuKls kls : ruKlsList) {
           kls.setLiushuih((int) DocuNumber.getMchBillNo());
           kls.setDanjubh(kuDan.getDanjubh());
           storeChuRuKlsDao.insert(kls);
       }
		
	
		
	}

	@Override
	public int del(String[] ids) throws Exception {
		for (int i = 0; i < ids.length; i++) {
			try {
				
				StoreZhuangCheCkd kd = storeZhuangCheCkdDao.selectByPrimaryKey(Long.valueOf(ids[i]));
				storeZhuangCheCkdDao.deleteByPrimaryKey(Long.valueOf(ids[i]));
				storeKudanDao.deleteByPrimaryKey(kd.getDanjubh());
				storeChuRuKlsDao.deleteByKey(kd.getDanjubh());
				
			} catch (Exception e) {
				e.printStackTrace();
			    return 0;
			}
		}
		return 1;
	}
}
